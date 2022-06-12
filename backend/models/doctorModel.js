import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    currentlyworking: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    degreeimage: {
      type: String,
      required: false, // tempoerary did this
    },
    cnic: {
      type: String,
      required: true,
    },
    usertype: {
      type: String
    },
    profileimage: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

DoctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
