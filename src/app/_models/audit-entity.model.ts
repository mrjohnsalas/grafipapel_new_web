export interface AuditEntity {
    createdAt?: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy: string;
    deletedAt?: Date;
    deletedBy: string;
}
