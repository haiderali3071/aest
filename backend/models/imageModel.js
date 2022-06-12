import mongoose from "mongoose";

const ImageSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    img: {
      type: String,
    },
    labid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabModel"
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
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

export default Image;
