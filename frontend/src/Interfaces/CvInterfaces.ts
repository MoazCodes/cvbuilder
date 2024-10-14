export interface Project {
    projectName: string;
    projectDate: string;
    projectDetails: string;
}

export interface Experience {
    jobTitle: string;
    startJobDate: string;
    endJobDate: string;
    jobDescription: string;
    company: string;
}

export interface CvModel {
    cvName:string;
    userId: number;
    firstName: string;
    lastName: string;
    job: string;
    city: string;
    country: string;
    email: string;
    objective: string;
    degree: string;
    school: string;
    schoolDepartment: string;
    schoolCity: string;
    schoolCountry: string;
    startSchoolDate: string;
    endSchoolDate: string;
    skills: string[];
    projects: Project[];
    experiences: Experience[];
    extraCurricularActivities: string[];
}
