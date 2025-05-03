export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface PostFields {
    user: string;
    title: string;
    description?: string;
    image?: string;
    datetime: Date;
}

export interface CommentFields {
    user: string;
    post: string;
    text: string;
    datetime: Date;
}