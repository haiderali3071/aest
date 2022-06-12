import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import  jwt from "jsonwebtoken";
import requestPromise from "request-promise";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Doctor.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      degree: user.degree,
      address: user.address,
      currentlyworking: user.currentlyworking,
      usertype: user.usertype,
      phone: user.phone,
      cnic: user.cnic,
      degreeimage: user.degreeimage,
      profileimage:user.profileimage,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerDoctor = asyncHandler(async (req, res) => {
  try{
  const {
    name,
    email,
    password,
    cnic,
    degree,
    degreeimage,
    phone,
    currentlyworking,
    address,
    usertype,
  } = req.body;

  const userExists = await Doctor.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Doctor.create({
    name,
    email,
    password,
    cnic,
    degree,
    degreeimage,
    phone,
    currentlyworking,
    address,
    usertype,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cnic: user.cnic,
      degree: user.degree,
      address: user.address,
      currentlyworking: user.currentlyworking,
      phone: user.phone,
      degreeimage: user.degreeimage,
      usertype: user.usertype,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }} catch(e) {
    console.log(e)
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getDoctorProfile = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      degree: user.degree,
      address: user.address,
      currentlyworking: user.currentlyworking,
      phone: user.phone,
      cnic: user.cnic,
      degreeimage: user.degreeimage,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     if (req.body.password) {
//       user.password = req.body.password
//     }

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getDoctors = asyncHandler(async (req, res) => {
  const users = await Doctor.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.params.id);

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
const getDoctorById = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.params.id).select("-password");

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
const updateDoctor = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAppointment = asyncHandler(async (req, res) => {
  const user = await Appointment.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  const user = await Appointment.find({})
    .populate({ path: "doctorid", select: "_id name address" })
    .populate({ path: "userid", select: "_id name address" });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAppointmentsByDoctor = asyncHandler(async (req, res) => {
  const users = await Appointment.find({ doctorid: req.params.id}).populate('userid');
  console.log(users)
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const getAppointmentsByUser = asyncHandler(async (req, res) => {
  const users = await Appointment.find({ userid: req.params.id });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const getPendingAppointmentRequests = asyncHandler(async (req, res) => {
  const users = await Appointment.find({ isaccepted: false });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});

const payload = {
  iss: 'gEM0dt1g5BX9NsJbalWmlTqkK09VgiZjAsO1', //your API KEY
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, 'f1g3rezcFYuaw10tlAMd41vVwDoHy7xmFHeU'); 

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateLink = asyncHandler(async (req, res) => {
  // generate link
  var selectionToolbar = ["desktop"]
  var appName = encodeURI('Acesstica');
  var showJitsiWatermark = false;
  var appNameText = "interfaceConfig.APP_NAME=%22" + appName + "%22&amp;";
  var participantNameText = "interfaceConfig.DEFAULT_REMOTE_DISPLAY_NAME=%22" + encodeURI('doctor') + "%22&amp;";
  var selectionToolbarText = "interfaceConfig.TOOLBAR_BUTTONS=%5B" + selectionToolbar.join("%2C") + "%5D&amp;";
  var selectionSettingsText = "interfaceConfig.SETTINGS_SECTIONS=%5B" + selectionToolbar.join("%2C") + "%5D&amp;";
  var showJitsiWatermarkText = "interfaceConfig.SHOW_JITSI_WATERMARK="+ showJitsiWatermark + "&amp;interfaceConfig.SHOW_WATERMARK_FOR_GUESTS=" + showJitsiWatermark + "&amp;" ;
  var link = "https://meet.jit.si/" + "appName" + "-" + makeid(12) + "#jitsi_meet_external_api_id=0&amp;config.getroomnode=undefined&amp;" + appNameText + participantNameText + selectionToolbarText + selectionSettingsText + showJitsiWatermarkText + "interfaceConfig.filmStripOnly=false";
  
  const data = await Appointment.updateOne({_id:req.params.appid},{link:link, isaccepted:true})
  res.status(200);
  res.json(link);
  
  }
);

const deleteAppointment = asyncHandler(async (req, res) => {
  const data = await Appointment.deleteOne({ _id:req.params.appid});
  res.status(200);
  res.json(data);

});

const markAsCompleted = asyncHandler(async (req, res) => {
  const data = await Appointment.updateOne({ _id:req.params.appid},{iscompleted:true});
  res.status(200);
  res.json(data);

});

const getCompletedAppointments = asyncHandler(async (req, res) => {
  const users = await Appointment.find({ iscompleted: false });
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(400);
    throw new Error("Appointments Not Found");
  }
});
const updateDoctorProfile = asyncHandler(async (req, res) => {
  const {
    name,
    password,
    address,
    degreeimage,
    degree,
    phone,
    currentlyworking,
    profileimage,
    cnic
  } = req.body;
  const user = await Doctor.findById(req.params.id);
  if (user) {
    user.name = name || user.name;
    user.email = user.email;
    user.password = password || user.password;
    user.address = address || user.address;
    user.degree = degree || user.degree;
    user.degreeimage = degreeimage || user.degreeimage;
    user.phone = phone || user.phone;
    user.cnic = cnic || user.cnic;
    user.currentlyworking = currentlyworking || user.currentlyworking;
    user.usertype = user.usertype;
    user.profileimage = profileimage || user.profileimage;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



export {
  authDoctor,
  registerDoctor,
  getDoctorById,
  getDoctorProfile,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getAppointment,
  getAppointments,
  getAppointmentsByDoctor,
  getAppointmentsByUser,
  getCompletedAppointments,
  getPendingAppointmentRequests,
  updateDoctorProfile,
  generateLink,
  deleteAppointment,
  markAsCompleted
};
