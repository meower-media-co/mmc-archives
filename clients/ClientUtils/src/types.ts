import type { CloudlinkPacket } from "@williamhorning/cloudlink";

/* client types */

export interface MeowerOpts {
	apiOpts: {
		apiBaseUrl: string;
		apiVersion: number;
		cloudlinkBaseUrl: string;
	};
	log: boolean;
}

/* pydantic models */

export interface Account extends Object {
	id: string;
	email: string;
	password_enabled: boolean;
	mfa_methods: string[];
	last_updated: number | null;
}
//Had no idea what to name the `admin` section of the model
export interface ModInfoAccount extends Account {
	delete_after: number | null;
}

export interface Application {
	id: string;
	name: string;
	description: string;
	flags: number;
	created: number;
}

export interface PrivateApplicationData extends Application {
	owner_id: string;
	maintainers: PartialUser[];
	created: number;
}

export interface Chat {
	id: string;
	name: string;
	direct: boolean;
	flags: number;
	members: PartialUser[];
	permissions: number;
	invite_code: string;
	created: number;
}

export interface Comment {
	id: string;
	post_id: string;
	parent_id: string;
	author: PartialUser;
	masquerade: {
		username: string;
		avatar: string;
	};
	public_flags: number;
	likes: number;
	content: string;
	filtered_content: string;
	time: number;
	delete_after: number | null;
}

export interface ModerationCommentData extends Comment {
	deleted_at: number | null;
}

export interface Infraction extends Object {
	id: string;
	user: PartialUser;
	action: string;
	reason: string;
	offending_content: string;
	status: string;
	created: number;
	expires: number | null;
}

export interface ModerationInfractionData extends Infraction {
	exempt_alts: [];
}

export interface Message extends Object {
	id: string;
	chat_id: string;
	author: PartialUser;
	masquerade: {
		username: string;
		avatar: string;
	};
	reply_to: string;
	flags: number;
	content: string;
	filtered_content: string;
	likes: number;
	time: number;
	delete_after: number | null;
}

export interface ModNetworkData extends Object {
	ip_address: string;
	country: string;
	asn: string;
	vpn: boolean;
	blocked: boolean;
	creation_blocked: boolean;
	users: User;
	first_used: number;
	last_used: number;
}

/*
TODO: Figure out https://github.com/meower-media-co/Meower-Server/blob/main-cl4-port/src/entities/notifications.py#L25-L67
export interface notification {}
*/

export interface Post extends Object {
	id: string;
	author: PartialUser;
	masquerade: {
		username: string;
		avatar: string;
	};
	public_flags: number;
	stats: {
		likes: number;
		meows: number;
		comments: number;
	};

	content: string;
	filtered_content: string;
	time: number;
	delete_after: number | null;
}

export interface ModPostData extends Object {
	deleted_at: number | null;
	top_stats: {
		likes: number;
		meows: number;
		comments: number;
	};
	flags: number;
}

export interface UserSession extends Object {
	id: string;
	user: PartialUser;
	device: string;
	country: string;
	last_refreshed: number | null;
	created: number | null;
}

export interface AutherisedApp extends Object {
	id: string;
	application: Application;
	scopes: string[];
	first_authorized: number;
	last_authorized: number | null;
}

export interface PartialUser extends Object {
	id: string;
	username: string;
	public_flags: number;
}

export interface User extends PartialUser {
	created: number;
	theme: {};
	icon: string;
	quote: string;
	badges: string[];
	stats: {
		followers: number;
		following: number;
		posts: number;
	};
}

export interface PrivateUser extends User {
	flags: number;
	admin: number;
	token: string;
}

export interface SubscribePacket extends CloudlinkPacket {
	cmd: "subscribe" | "unsubscribe";
	type: string;
	id: string | undefined;
}

/* impl all the packet types */

export interface PostPacket extends CloudlinkPacket {
	val: Post;
}

export interface CommentPacket extends CloudlinkPacket {
	val: Comment;
}

export interface MessagePacket extends CloudlinkPacket {
	val: Message;
}
