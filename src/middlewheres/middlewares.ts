import { NextFunction, Request, Response } from "express";
import { IDeveloperInfo, Ideveloper } from "../interfaces/devInterfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

export const ensureEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;
  const queryString: string = `
    SELECT
      *
    FROM
      developers
    WHERE
      email = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };
  const queryResult: QueryResult<Ideveloper> = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return response.status(409).json({ message: "Email already exists." });
  }
  response.locals.developers = queryResult.rows[0];
  return next();
};

export const ensuredeveloperExistsMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id: number = parseInt(request.params.id);
   
    const queryString: string = `
      SELECT
           * 
      FROM
          developers
      WHERE
          id = $1    
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };
    const queryResult: QueryResult<IDeveloperInfo> = await client.query(queryConfig);
    if (queryResult.rowCount === 0) {
      return response.status(404).json({ message: "developer not found!" });
    }
  
    response.locals.developers = queryResult.rows[0];
    return next();
  };