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
            type: symptoms,
            ref: "SymptomsModel",
        },
        covid: {
            type: String,
        }
    }
)

const MedicalReport = mongoose.model("MedicalReport", MedicalReportSchema);

export default MedicalReport;