import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import {  TupdatedProject } from "../interfaces/projectsInterfaces";
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