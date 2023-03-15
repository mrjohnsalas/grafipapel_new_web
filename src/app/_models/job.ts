export interface Job {
    id: number;
    name: string;
    mission: string;
    location: string;
    company: string;
    description: string;
    typeOfSchedule: string;

    requirementsText: string;
    requirements: string[];

    tasksText: string;
    tasks: string[];

    responsibilitiesText: string;
    responsibilities: string[];

    skillsText: string;
    skills: string[];

    necessaryKnowledgeText: string;
    necessaryKnowledge: string[];

    desirableKnowledgeText: string;
    desirableKnowledge: string[];

    publicationDate: Date;
    salary: number;

    statusId: number;
}