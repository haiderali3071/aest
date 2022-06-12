import mongoose from "mongoose";

const SymptomsSchema = mongoose.Schema(
  {
      symptoms: [{symptom: {
          type: String
      },
    have: Boolean}],
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }
  },
  {
    timestamps: true,
  }
);

const Symptoms = mongoose.model("Symptoms", SymptomsSchema);

export default Symptoms;
