import express from "express";
import mongoose from "mongoose";
import User from "../Schema/UserSignup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log("password", req.body);
  let isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return res
      .status(400)
      .json({ error: "User already exists. Please use another email." });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name: name,
    email: email,
    phone: phone,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllUsers = async (req, res) => {
  let users = await User.find({});
  try {
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteUser = async (req, res) => {
  //   let users = await User.find({});
  let id = req.params.id;
  try {
    let resp = await User.findByIdAndDelete({ _id: id });
    res.json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const LoggedUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let isAlreadyExist = await User.findOne({ email });
    if (!isAlreadyExist) {
      return res
        .status(400)
        .json({ error: "User doesn't exists. Please Signup first." });
    }
    let isMatched = bcrypt.compare(password, isAlreadyExist.password);
    if (!isMatched) {
      return res.status(400).json({
        error: "Wrong credientail! please use Right email and password.",
      });
    }
    const token = jwt.sign(
      { userId: isAlreadyExist.id, username: isAlreadyExist.name },
      process.env.SECRETPRIVATEKEY,
      { expiresIn: "1h" }
    );
    res.json({
      message: "user SuccessFully Loggged In!",
      token,
      userdetails: { name: isAlreadyExist.name },
      userId: isAlreadyExist.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const isUserLoggedIn = async (req, res, next) => {
  try {
    var decoded;
    if (req.headers && req.headers.authorization) {
      var authToken = req.headers.authorization.split(" ")[1];
      decoded = jwt.verify(authToken, process.env.SECRETPRIVATEKEY);
      var userId = decoded.userId;
      let userdetails = await User.findById({
        _id: userId,
      });
      req.user = userdetails;
      next();
    }
  } catch (error) {
    return next("unauthorised user!", 400);
  }
};