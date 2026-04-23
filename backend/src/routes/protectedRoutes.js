import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  return res.status(200).json({
    message: "Dashboard access granted.",
    user: req.user,
  });
});

export default router;
