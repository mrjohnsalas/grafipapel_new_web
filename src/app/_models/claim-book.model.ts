import { Country } from "./country.model";
import { State } from "./state.model";
import { DocumentType } from "./document-type.enum";
import { WellHired } from "./well-hired.enum";
import { ClaimType } from "./claim-type.enum";
import { AuditEntity } from "./audit-entity.model";

export interface ClaimBook extends AuditEntity {
    id: number;
    date: Date;

    //Consumer
    consumerDocumentType: DocumentType;
    consumerDocumentId: string;

    costumerRazonSocial?: string;
    consumerFirstName?: string;
    consumerLastName?: string;

    consumerPhone?: string;
    consumerEmail: string;
    
    //Pais Country
    consumerCountryId: string;
    consumerCountry?: Country;

    //Departamento State
    consumerStateId: string;
    consumerState?: State;

    //Provincia City
    consumerCity: string;

    //Distrito County
    consumerCounty: string;

    consumerAddress: string;

    //Parent
    parentDocumentType?: DocumentType;
    parentDocumentId?: string;
    parentFirstName?: string;
    parentLastName?: string;
    parentPhone?: string;
    parentEmail?: string;

    //Product or Service
    wellHired: WellHired;
    saleOrderId?: number;
    description: string;
    claimAmount: number;

    //Claim detail
    claimType: ClaimType;
    claimDetail: string;
    consumerRequest: string;

    //Answer
    answer?: string;
    answerDate?: Date;
    
    statusId: number;
}