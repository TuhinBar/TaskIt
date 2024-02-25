const User = require("../models/User.model");
const Team = require("../models/Team.model");
const validator = require("validator");
const { generateToken, decodeToken } = require("../utils/jwtutils");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    console.log(userName, passWord);
    if (!userName || !passWord || passWord === "" || userName === "") {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    if (!validator.isStrongPassword(passWord)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const newUser = await User.create({ userName, passWord: hashedPassword });
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
    const token = generateToken(newUser);

    const resp = {
      userName: newUser.userName,
      uuid: newUser.uuid,
      tasks: newUser.tasks,
      _id: newUser._id,
    };
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,

      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    res.status(201).json({
      success: true,
      user: resp,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { userName, passWord } = req.body;
  if (!userName || !passWord || passWord === "" || userName === "") {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const foundUser = await User.findOne({ userName })
    .populate("tasks")
    .select("-__v -createdAt -updatedAt");
  if (!foundUser) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const passwordMatch = await bcrypt.compare(passWord, foundUser.passWord);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(foundUser);

  const resp = {
    userName: foundUser.userName,
    uuid: foundUser.uuid,
    tasks: foundUser.tasks,
    _id: foundUser._id,
  };
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({
    success: true,
    user: resp,
    message: "Login successful",
  });
};

const getUser = async (req, res) => {
  const uuid = req.user.uuid;
  const user = await User.findOne({ uuid: uuid })
    .populate("tasks")
    .select("-__v -createdAt -updatedAt -passWord");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ success: true, user });
};

const updateInvitation = async (req, res) => {
  try {
    const { teamId, accept } = req.body;
    const user = req.user;
    if (!teamId || accept === undefined) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    if (accept) {
      const team = await Team.findByIdAndUpdate(
        teamId,
        {
          $push: {
            members: {
              memberId: user._id,
              memberUserName: user.userName,
            },
          },
          $set: { "invitations.$[elem].status": "Accepted" },
        },
        { arrayFilters: [{ "elem.inviteTo": user.userName }] }
      );
      const member = await User.findByIdAndUpdate(
        user?._id,
        {
          $set: { "invitations.$[elem].status": "Accepted" },
        },
        { arrayFilters: [{ "elem.teamId": team._id }] }
      );

      if (!team) {
        return res.status(400).json({ message: "Team not found" });
      }
      res
        .status(200)
        .json({ message: "Invitation accepted successfully", success: true });
    } else {
      const team = await Team.findByIdAndUpdate(
        teamId,
        {
          $set: { "invitations.$[elem].status": "Rejected" },
        },
        { arrayFilters: [{ "elem.inviteTo": user.userName }] }
      );
      const member = await User.findByIdAndUpdate(
        user?._id,
        {
          $set: { "invitations.$[elem].status": "Rejected" },
        },
        { arrayFilters: [{ "elem.teamId": team._id }] }
      );

      if (!team) {
        return res.status(400).json({ message: "Team not found" });
      }
      console.log("Invitation updated ==> ✔");
      res
        .status(200)
        .json({ message: "Invitation rejected successfully", success: true });
    }
  } catch (error) {
    console.log("updateInvitation error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { register, login, getUser, updateInvitation };
