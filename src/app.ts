import express, { Application } from "express";
import "dotenv/config";
import { UpdateDevInfos, createDeveloperInfo, createdeveloper, listDeveloperInfos, removeDeveloperFromList } from "./logics/developersLogics";
import { ensureEmailExistsMiddleware, ensuredeveloperExistsMiddleware } from "./middlewheres/devsMiddlewares";
import { UpdateProject, addTechnologieToProject, createProject, listProjectById, removeprojectFromList } from "./logics/projectsLogics";
import { ensureProjectExistsMiddleware, ensureProjectNameExistsMiddleware, verifyProjectNameMiddleware } from "./middlewheres/projectsMiddleweres";

const app: Application = express();
app.use(express.json())

app.post("/developers",ensureEmailExistsMiddleware,createdeveloper)
app.get("/developers/:id" ,ensuredeveloperExistsMiddleware, listDeveloperInfos )
app.patch("/developers/:id",ensuredeveloperExistsMiddleware,ensureEmailExistsMiddleware,UpdateDevInfos)
app.delete("/developers/:id",ensuredeveloperExistsMiddleware,removeDeveloperFromList)
app.post("/developers/:id/infos",ensuredeveloperExistsMiddleware,createDeveloperInfo)
app.post("/projects",ensuredeveloperExistsMiddleware,ensureProjectNameExistsMiddleware,createProject)
app.get("/projects/:id",ensureProjectExistsMiddleware,listProjectById)
app.patch("/projects/:id",ensureProjectExistsMiddleware,UpdateProject)
app.delete("/projects/:id",ensureProjectExistsMiddleware,removeprojectFromList)
app.post("/projects/:id/technologies",ensureProjectExistsMiddleware,verifyProjectNameMiddleware,addTechnologieToProject)
app.delete("/projects/:id/technologies/:name",ensureProjectExistsMiddleware,removeprojectFromList)



export default app;
