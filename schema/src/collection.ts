import { Shot } from "./shot";
import { User } from "./user";

export type Collection = {
	id: number;
	name: string;
	user: User;
	shots: Shot[];
	description: string;
	createdAt: Date;
	updatedAt: Date;
};
