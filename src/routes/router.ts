import express from "express";
import { loginUser, signUpUser } from "../controllers/user.controller";
import { createMeeting, getHostId, getMeetings } from "../controllers/meeting.controller";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/get-host-id", getHostId);
router.post("/create-meeting", authenticate, createMeeting);
router.get("/get-meetings/:hostId", authenticate, getMeetings);

export default router;