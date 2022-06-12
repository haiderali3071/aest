import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Lab from "../models/labModel.js";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";
import nodemailer from 'nodemailer'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authLab = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Lab.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      usertype: user.usertype,
      licenseimage: user.licenseimage,
      cnic: user.cnic,
      token: generateToken(user._id),
      profileimage:user.profileimage,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerLab = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    cnic,
    address,
    phone,
    licenseimage,
    usertype,
  } = req.body;

  const userExists = await Lab.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Lab.create({
    name,
    email,
    password,
    address,
    licenseimage,
    phone,
    cnic,
    usertype,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      cnic: user.cnic,
      phone: user.phone,
      licenseimage: user.licenseimage,
      usertype: user.usertype,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getLabProfile = asyncHandler(async (req, res) => {
  const user = await Lab.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      cnic: user.cnic,
      phone: user.phone,
      licenseimage: user.licenseimage,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateLabProfile = asyncHandler(async (req, res) => {
  const { name, cnic, password, address, licenseimage, phone, profileimage } = req.body;
  const user = await Lab.findById(req.params.id);
  if (user) {
    user.name = name || user.name;
    user.email = user.email;
    user.password = password || user.password;
    user.address = address || user.address;
    user.licenseimage = licenseimage || user.licenseimage;
    user.phone = phone || user.phone;
    user.cnic = cnic || user.cnic;
    user.usertype = user.usertype;
    user.profileimage = profileimage || user?.profileimage;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getLabs = asyncHandler(async (req, res) => {
  const users = await Lab.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteLab = asyncHandler(async (req, res) => {
  const user = await Lab.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getLabById = asyncHandler(async (req, res) => {
  const user = await Lab.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateLab = asyncHandler(async (req, res) => {
  const user = await Lab.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLabAppointment = asyncHandler(async (req, res) => {
  const user = await Image.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLabAppointments = asyncHandler(async (req, res) => {
  const user = await Image.find({})
    .populate({ path: "labid", select: "_id name address" })
    .populate({ path: "userid", select: "_id name address" });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLabAppointmentsByLab = asyncHandler(async (req, res) => {
  const users = await Image.find({ labid: req.params.id }).populate('userid');;
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const getLabAppointmentsByUser = asyncHandler(async (req, res) => {
  const users = await Image.find({ userid: req.params.id });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const getPendingLabAppointmentRequests = asyncHandler(async (req, res) => {
  const users = await Image.find({ isaccepted: false });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const getCompletedLabAppointments = asyncHandler(async (req, res) => {
  const users = await Image.find({ iscompleted: false });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const resetPassword = asyncHandler(async (req,res)=>{
  const user = await Lab.findOne({email:req.params.id})
  if(user){
    let resetToken = generateToken(user._id)
    const link = `http:/localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "nftalphalive@gmail.com", // generated ethereal user
        pass: "dqlgepoqpxurlgmx", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "nftalphalive@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `
      <body>
      <h3>Reset Password</h3>
      <a href=${link}>Click here to reset your password</a>
      </body>
      `, // plain text body
    });
    res.json(info)
  }
  else{
    res.json(404)
    throw new Error("User Not found")
  }
})

const deleteAppointment = asyncHandler(async (req, res) => {
  const data = await Image.deleteOne({ _id:req.params.imgid});
  res.status(200);
  res.json(data);

});

const acceptApointment = asyncHandler(async (req, res) => {
  console.log(req.params.imgid)
  const data = await Image.updateOne({ _id:req.params.imgid},{isaccepted:true});
  res.status(200);
  res.json(data);
});

const markAsCompleted = asyncHandler(async (req, res) => {
  const data = await Image.updateOne({ _id:req.params.imgid},{iscompleted:true});
  res.status(200);
  res.json(data);

});

const updateImage = asyncHandler(async (req, res) => {
  const data = await Image.updateOne({ _id:req.params.imgid},{img:req.params.img});
  res.status(200);
  res.json(data);

});

export {
  authLab,
  registerLab,
  getLabById,
  getLabProfile,
  getLabs,
  updateLab,
  deleteLab,
  getLabAppointment,
  getLabAppointments,
  getLabAppointmentsByLab,
  getLabAppointmentsByUser,
  getPendingLabAppointmentRequests,
  getCompletedLabAppointments,
  updateLabProfile,
  resetPassword,
  deleteAppointment,
  markAsCompleted,
  acceptApointment,
  updateImage
};
