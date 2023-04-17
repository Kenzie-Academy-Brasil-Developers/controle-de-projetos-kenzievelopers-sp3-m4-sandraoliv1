import { Request, Response } from "express"
import {  Ideveloper, IdeveloperInfoRequest, IdeveloperInforesponse, IdeveloperRequest } from "../interfaces/devInterfaces"
import { client } from "../database"
import {QueryConfig, QueryResult} from "pg"
import format from "pg-format"


export  const createdeveloper=async(req:Request,res:Response):Promise<Response>=>{

    const data:IdeveloperRequest=req.body
    const email = res.locals.developers;
    const queryString:string= format(`
     INSERT INTO 
        developers(%I)
     VALUES    
        (%L)
          RETURNING *;
    `  ,    
    
    Object.keys(data),
    Object.values(data)
    )
const queryResult: QueryResult <Ideveloper>=await client.query(queryString)

return res.status(201).json(queryResult.rows[0])
}
  export const createDeveloperInfo = async( req:Request,res:Response):Promise<Response>=>{
    const data:IdeveloperInfoRequest= req.body
    data.developerId=parseInt(req.params.id)
    const queryString:string=format(
        `
        INSERT INTO
            developers_info(%I)
        VALUES
            (%L)
            RETURNING *;
        `,

        Object.keys(data),
        Object.values(data)
    )
    const queryResult:QueryResult<IdeveloperInfoRequest>=await client.query( queryString)
return res.status(201).json(queryResult.rows[0])
}

export const lisDEveloperInfos =async(req:Request,res:Response):Promise<Response>=>{
const id:number=parseInt(req.params.id)
const queryString:string=`
SELECT 
"dev".id as "developerId",
"dev".name as "developerName",
"dev".email as "developerEmail",

"dInfo".developerSince as "developerInfoDeveloperSince",
"dInfo".preferredOs  as "developerInfoPreferredOS",

FROM
   developers "dev" 
LEFT JOIN 
 developer_infos "dInfo"   ON dev.id =developer_infos."developerId"
 WHERE
 "dev".id=$1

`;
const queryConfig:QueryConfig={
    text:queryString,
    values:[1]
};
const queryResult:QueryResult<IdeveloperInforesponse>=await client.query(queryConfig)


return res.status(200).json(queryResult.rows[0]);
}



export const UpdateDevInfos = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const data: Partial<IdeveloperRequest> = req.body;
    const id: number = parseInt(req.params.id);
    const email = res.locals.developers;

    const queryString: string = format(
      `
       UPDATE
          developers
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
  
    const queryResult: QueryResult<Ideveloper> = await client.query(queryConfig);
    return res.status(200).json(queryResult.rows[0]);
  };

  export const removeDeveloperFromList = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const id: number = parseInt(request.params.id);
    const queryString: string = `
    DELETE
    FROM
   developers
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