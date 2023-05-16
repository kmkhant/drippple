import { User } from "./user";

export enum LikeActionType {
	LIKE = "likedAction",
	UNLIKE = "unlikedAction",
}

export enum ShotType {
	POPULAR = "popular",
	FOLLOWING = "following",
	RECENT = "recent",
}

export enum ShotCategory {
	DISCOVER = "discover",
	ANIMATION = "animation",
	BRANDING = "branding",
	ILLUSTRATION = "illustration",
	MOBILE = "mobile",
	PRINT = "print",
	PRODUCT_DESIGN = "productDesign",
	TYPOGRAPHY = "typography",
	WEB_DESIGN = "webDesign",
}

export type Shot = {
	id: number;
	title: string;
	description: string;
	shotImage: string;
	user: User;
	// collection: Collection;
	likedUsers: User[];
	totalLikes: number;
	totalViews: number;
	saves: number;
	comments: Comment[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
};
