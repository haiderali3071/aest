import mongoose from "mongoose";

const MedicalReportSchema = mongoose.Schema(
  {
      report: {
          type: String
      },
      userid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserModel"
      },
      symptoms: {
          type: [String],
          ref: "SymptomsModel",
      },
      covid: {
          type: String,
      }
  }
)

const AppointmentSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    
    doctorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorModel"
    },
    isaccepted: {
      type: Boolean,
      default: false,
    },
    iscompleted: {
      type: Boolean,
      default: false,
    },
    timeslot: {
      type: String,
      default: Date.now.toString,
    },
    link:{
      type: String
    },
    medicalReport:{MedicalReportSchema}
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
