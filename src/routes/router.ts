import express from "express";
import { loginUser, signUpUser } from "../controllers/user.controller";
import { createMeeting, getMeetings } from "../controllers/meeting.controller";

const router = express.Router();

router.post("/signup", signUpUser)
router.post("/login", loginUser)
router.post("/create-meeting", createMeeting)
router.get("/get-meetings/:hostId", getMeetings)

export default router;