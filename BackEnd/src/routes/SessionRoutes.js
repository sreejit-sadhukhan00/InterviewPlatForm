import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createSession, EndSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../controllers/SessionController.js";


const router=express.Router();

router.post("/",protectRoute,createSession)
router.get("/get",protectRoute,getActiveSessions);
router.get("/my-recent-session",protectRoute,getMyRecentSessions);
router.get("/:id",protectRoute,getSessionById);
router.get("/:id/join",protectRoute,joinSession);
router.post("/:id/end",protectRoute,EndSession);
;

export default router;
