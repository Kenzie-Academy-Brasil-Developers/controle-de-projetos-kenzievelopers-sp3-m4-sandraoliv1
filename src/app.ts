import express, { Application } from "express";
import "dotenv/config";
import { UpdateDevInfos, createDeveloperInfo, createdeveloper, lisDEveloperInfos, removeDeveloperFromList } from "./logics/developersLogics";
import { ensureEmailExistsMiddleware, ensuredeveloperExistsMiddleware } from "./middlewheres/middlewares";

const app: Application = express();
app.use(express.json())

app.post("/developers",ensureEmailExistsMiddleware,createdeveloper)
app.get("/developers/:id" ,ensuredeveloperExistsMiddleware, lisDEveloperInfos )
app.patch("/developers/:id",ensuredeveloperExistsMiddleware,ensureEmailExistsMiddleware,UpdateDevInfos)
app.delete("/developers/:id",ensuredeveloperExistsMiddleware,removeDeveloperFromList)
app.post("/developers/:id/infos",ensuredeveloperExistsMiddleware,createDeveloperInfo)
app.post(" /projects",ensureEmailExistsMiddleware)
app.get("/projects/:id")
app.patch("/projects/:id")
app.delete("/projects/:id")
app.post(" /projects/:id/technologies")
app.delete("/projects/:id/technologies/:name")



export default app;
