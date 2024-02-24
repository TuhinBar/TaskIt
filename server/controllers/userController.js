const User = require("../models/User.model");
const { generateToken, decodeToken } = require("../utils/jwtutils");
const bcrypt = require("bcrypt");

const register = async (req, res) => {};

const login = async (req, res) => {};

const getUser = async (req, res) => {};

module.exports = { register, login, getUser };
