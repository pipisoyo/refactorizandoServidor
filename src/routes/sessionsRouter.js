import { Router } from "express";
import passport from "passport";
import { auth } from "../config/auth.js";
import sessionController from "../controllers/sessionControler.js";
const sessionsRouter = Router();


sessionsRouter.post('/logout', sessionController.logout);
sessionsRouter.post( "/register", passport.authenticate("register", { failureRedirect: "/failregister" }),sessionController.register);
sessionsRouter.get("/failregister", sessionController.failRegister);
sessionsRouter.post('/login', passport.authenticate('login',{failureRedirect:"/faillogin"}),sessionController.login),
sessionsRouter.get("/faillogin", sessionController.failLogin);
sessionsRouter.get("/github",passport.authenticate("github", { scope: ["user:email"] }),sessionController.githubLogin);
sessionsRouter.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }),sessionController.githubCallback)
sessionsRouter.post("/restore", sessionController.restorePassword);
sessionsRouter.get('/current',auth,sessionController.getCurrentUser);

export default sessionsRouter;