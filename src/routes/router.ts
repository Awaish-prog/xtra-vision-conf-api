import express from "express";
import { loginUser, signUpUser } from "../controllers/user.controller";
import { createMeeting } from "../controllers/meeting.controller";

const router = express.Router();

router.post("/signup", signUpUser)
router.post("/login", loginUser)
router.post("/create-meeting", createMeeting)

export default router;