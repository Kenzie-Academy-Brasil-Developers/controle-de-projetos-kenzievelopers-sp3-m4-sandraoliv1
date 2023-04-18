import { Request, Response } from "express";
import { IprojectRequest, IprojectResponse, Iprojects } from "../interfaces/projectsInterfaces";
import format from "pg-format";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";

export const createProject=async(req:Request,res:Response):Promise<Response>=>{
    const data:IprojectRequest=req.body
   
     const developerId=parseInt(req.body.developerId)
    const queryString:string=format(
        `
        INSERT INTO
        projects(%I)
        VALUES
            (%L)
            RETURNING *;
        `,

        Object.keys(data),
        Object.values(data)
    )
    const queryResult:QueryResult<Iprojects>=await client.query( queryString)
  
    return res.status(201).json(queryResult.rows[0])
}
export const listProjectById =async(req:Request,res:Response):Promise<Response>=>{
    const id:number=parseInt(req.params.id)
    const queryString:string=`
    SELECT 
    pj.id as "projectId",
    pj.name as "projectName",
    pj.description as "projectDescription",
    pj."estimatedTime" as "projectEstimatedTime",
    pj.repository as "projectRepository",
    pj."startDate" as  "projectStartDate",
    pj."endDate" as "projectEndDate",
    pj."developerId" as "projectDeveloperId",
    tc.id as "technologyId", 
    tc.name as "technologyName"
    FROM 
    projects pj
    LEFT JOIN projects_technologies pt ON pj.id =pt."projectId"
    LEFT JOIN technologies tc ON pt."technologyId" = tc.id
    WHERE
    pj.id=$1;
    `
    const queryConfig:QueryConfig={
        text:queryString,
        values:[id]
    };

    const queryResult:QueryResult<IprojectResponse>=await client.query(queryConfig)
    return res.status(200).json(queryResult.rows[0]);
}

export const UpdateProject = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const data: Partial<IprojectRequest> = req.body;
    const id: number = parseInt(req.params.id);
   
    const queryString: string = format(
      `
       UPDATE
         projects
      SET 
          (%I) = ROW (%L)
      WHERE
           id = $1
       RETURNING *;
  `,
      Object.keys(data),
      Object.values(data)
    );
  
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };
  
    const queryResult: QueryResult<Iprojects> = await client.query(queryConfig);
    return res.status(200).json(queryResult.rows[0]);
  };

export const removeprojectFromList = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const id: number = parseInt(request.params.id);
    const queryString: string = `
    DELETE
    FROM
       projects
    WHERE
       id = $1
    `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };
  
    await client.query(queryConfig);
    return response.status(204).send();
  };

  export const addTechnologieToProject=async(req:Request,res:Response):Promise<Response>=>{
    const data:IprojectRequest=req.body
     const projectId=parseInt(req.params.id)

    const queryString:string=`
        
        INSERT INTO
           projects_technologies("technologyId", "projectId", "addedIn")
        VALUES
            ($1,$2,$3)
            RETURNING *;
        `
 const queryConfig:QueryConfig={
  text:queryString,
  values:[ res.locals.technologyId,projectId,new Date() ]
 }
    const queryResult:QueryResult<Iprojects>=await client.query( queryConfig)
    return res.status(201).json(queryResult.rows[0])
}