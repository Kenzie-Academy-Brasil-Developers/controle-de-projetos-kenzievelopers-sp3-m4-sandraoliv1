export interface Iprojects{
        id:number;
        name: string;
        description: string;
        estimatedTime: Date;
        repository: string;
        startDate: Date;
        endDate?: Date|null;
        developerId: number;    
}

export type IprojectRequest=Omit<Iprojects,"id">

export interface IprojectResponse{

    projectId:number;
    projectName:string;
    projectDescription:string;
    projectEstimatedTime:Date;
    projectRepository:string;
    projectStartDate:Date;
    projectEndDate:Date;
    projectDeveloperId:number;
    technologyId ?:number|null;
    technologyName? :number|null;
}
 export type TupdatedProject=Omit<Iprojects,"id"|"endDate">
