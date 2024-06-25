export interface PostJSON {
	_id: PostJSON["post_id"];
	isDeleted: boolean;
	p: string;
	post_id: string;
	post_origin: string;
	t: {
		d: string;
		e: number;
		h: string;
		mi: string;
		mo: string;
		s: string;
		y: string;
	};
	type: number;
	u: string;
}

export interface PostItem extends PostJSON {
	id: PostJSON["post_id"];
}

export interface PostListJSON {
	autoget: Array<PostJSON>;
	error: boolean;
	"page#": number;
	pages: number;
}

export interface User {
	_id: User["uuid"];
	banned: boolean;
	created: number;
	error: number;
	lower_username: string;
	lvl: number;
	pfp_data: number;
	quote: string;
	uuid: string;
}

export interface CurrentUser extends User {
	username: User["uuid"];
	token: string;
}
