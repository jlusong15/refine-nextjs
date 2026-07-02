export interface BaseEntity {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}