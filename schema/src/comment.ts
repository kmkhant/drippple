import { Shot } from "./shot";
import { User } from "./user";

export type Comment = {
	id: number;
	user: User;
	shot: Shot;
	description: string;
	replies: Reply[];
	createdAt: Date;
	updatedAt: Date;
};

export type Reply = {
	id: number;
	user: User;
	comment: Comment;
	description: string;
	createdAt: Date;
	updatedAt: Date;
};
