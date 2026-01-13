import { Router } from "express";
import { signIn } from "../services/user.service.js";

const router = new Router();

router.post("/sign-in", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ eror: "Username or Password details are missing" });
    }

    const token = await signIn(userName, password);
    console.log(token);

    if (token) {
      return res.status(200).json({ token });
    }
  } catch (err) {
    if (err == "Error: Passwords don't match") {
      return res.status(401).json("Passwords don't match");
    } else {
      return res.status(500).json(err);
    }
  }
});

export default router;
