import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import {  Iprojects, TupdatedProject } from "../interfaces/projectsInterfaces";
import { client } from "../database";

export const ensureProjectExistsMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const paramsId: number = parseInt(request.params.id);
    const bodyId:number=request.body.projectId
    const queryString: string = `
      SELECT
           * 
      FROM
          projects
      WHERE
          id = $1    
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [bodyId || paramsId],
    };
    const queryResult: QueryResult<TupdatedProject> = await client.query(queryConfig);
    if (queryResult.rowCount === 0) {
      return response.status(404).json({  "message": "Project not found."});
    }
  
    response.locals.developers = queryResult.rows[0];
    return next();
  };

  export const ensureProjectNameExistsMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const name: string = request.body.name;
    const queryString: string = `
      SELECT
        *
      FROM
        projects
      WHERE
        name = $1;
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [name],
    };
    const queryResult: QueryResult<Iprojects> = await client.query(queryConfig);
  
    if (queryResult.rowCount > 0) {
      return response.status(409).json({ message: "Project already exists." });
    }
    response.locals.developers = queryResult.rows[0];
    return next();
  };
  
  export const verifyProjectNameMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id: number =parseInt(request.params.id);
    const queryString: string = `
      SELECT
        *
      FROM
         technologies
      WHERE
         id = $1;
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };
    const queryResult: QueryResult<Iprojects> = await client.query(queryConfig);
  
    if (queryResult.rowCount === 0) {
      return response.status(400).json( {
        "message": "Technology not supported.",
        "options": [
          "JavaScript",
          "Python",
          "React",
          "Express.js",
          "HTML",
          "CSS",
          "Django",
          "PostgreSQL",
          "MongoDB"
        ]
      } );
    }
    response.locals.technologyId = queryResult.rows[0].id;
    return next();
  };