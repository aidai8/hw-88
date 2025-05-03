import express from "express";
import Comment from "../models/Comment";
import auth from "../middleware/auth";
import {RequestWithUser} from "../middleware/auth";

const commentsRouter = express.Router();

commentsRouter.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({post: req.params.postId})
            .populate('user', 'username')
            .sort({datetime: -1});
        res.send(comments);
    } catch (e) {
        res.status(500).send(e);
    }
});

commentsRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.post || !req.body.text) {
            res.status(400).send({error: 'Post ID and text are required'});
            return;
        }

        const comment = new Comment({
            user: user._id,
            post: req.body.post,
            text: req.body.text,
        });

        await comment.save();
        res.send(comment);
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;