import mongoose from "mongoose";

export interface PostFields {
    user: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    image?: string;
    datetime: Date;
}

const PostSchema = new mongoose.Schema<PostFields>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    datetime: {
        type: Date,
        default: Date.now
    }
});

PostSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Post = mongoose.model<PostFields>('Post', PostSchema);
export default Post;