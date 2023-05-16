export type User = {
	id: number;
	name: string;
	profileImage: string;
	username: string;
	email: string;
	// shots: Shot[]
	// collections: Collection[]
	// comments: Comment[]
	// likedShots: Shot[]
	provider: "email" | "google";
	followers: User[];
	following: User[];
	createdAt: Date;
	updatedAt: Date;
};
