import express from "express";
const router = express.Router();
import {
  authLab,
  getLabProfile,
  getLabs,
  registerLab,
  deleteLab,
  getLabAppointments,
  getLabAppointment,
  getLabAppointmentsByLab,
  getLabAppointmentsByUser,
  getCompletedLabAppointments,
  getPendingLabAppointmentRequests,
  updateLab,
  updateLabProfile,
  resetPassword,
  deleteAppointment,
  markAsCompleted,
  acceptApointment,
  updateImage
} from "../controllers/labController.js";
import { protectLab } from "../middleware/authMiddleware.js";

router.route("/").post(registerLab).get(protectLab, getLabs);
router.post("/login", authLab);
router
  .route("/profile/:id")
  .get(protectLab, getLabProfile)
  .delete(protectLab, deleteLab)
  .put( updateLabProfile);
router.route("/resetpassword/:id").post(resetPassword);
router.route("/appointments").get(getLabAppointments);
router.route("/appointments/:id").get(getLabAppointment);
router.route("/appointments/lab/:id").get(getLabAppointmentsByLab);
router.route("/appointments/user/:id").get(getLabAppointmentsByUser);
router.route("/appointments/completed").get(getCompletedLabAppointments);
router.route("/appointments/pending").get(getPendingLabAppointmentRequests);
router.route("/appointment/:imgid").delete(deleteAppointment).put(markAsCompleted) // delete appointment
router.route("/appointment/accept/:imgid").put(acceptApointment) // accept appointment
router.route("/appointment/image/:imgid/:img").put(updateImage) // update image url

export default router;
