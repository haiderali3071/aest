import express from "express";
const router = express.Router();
import {
  authDoctor,
  getDoctorProfile,
  getDoctors,
  registerDoctor,
  deleteDoctor,
  getAppointments,
  getAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByUser,
  getCompletedAppointments,
  getPendingAppointmentRequests,
  updateDoctor,
  updateDoctorProfile,
  generateLink,
  deleteAppointment,
  markAsCompleted
} from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerDoctor).get(getDoctors);
router.post("/login", authDoctor);
router
  .route("/profile/:id")
  .get(protect, getDoctorProfile)
  .delete(protect, deleteDoctor)
  .put( updateDoctorProfile)
router.route("/appointments").get(getAppointments)
router.route("/appointments/:id").get(getAppointment)
router.route("/appointments/doctor/:id").get(getAppointmentsByDoctor)
router.route("/appointments/user/:id").get(getAppointmentsByUser)
router.route("/appointments/completed").get(getCompletedAppointments)
router.route("/appointments/pending").get(getPendingAppointmentRequests)
router.route("/generate/:appid").get(generateLink) // generate link
router.route("/appointment/:appid").delete(deleteAppointment).put(markAsCompleted) // delete appointment






export default router;
