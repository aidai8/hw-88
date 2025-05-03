import mongoose from "mongoose";

export interface CommentFields {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    text: string;
    datetime: Date;
}

const CommentSchema = new mongoose.Schema<CommentFields>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

CommentSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Comment = mongoose.model<CommentFields>('Comment', CommentSchema);
export default Comment;