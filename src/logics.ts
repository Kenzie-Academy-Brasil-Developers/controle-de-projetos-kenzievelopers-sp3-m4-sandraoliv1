import { Request, Response } from "express"
import { IDeveloperInfo, Ideveloper, IdeveloperInfoRequest, IdeveloperRequest } from "./interfaces"
import { client } from "./database"
import {QueryResult} from "pg"
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

// export const list