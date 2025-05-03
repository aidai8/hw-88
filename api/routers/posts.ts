import express from "express";
import Post from "../models/Post";
import auth from "../middleware/auth";
import {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username')
            .sort({datetime: -1});
        res.send(posts);
    } catch (e) {
        res.status(500).send(e);
    }
});

postsRouter.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('user', 'username');

        if (!post) {
            res.status(404).send({error: 'Post not found'});
            return;
        }

        res.send(post);
    } catch (e) {
        res.status(500).send(e);
    }
});

postsRouter.post('/', auth, (req, res, next) => {
    imagesUpload.single('image')(req, res, (err) => {
        if (err) return next(err);
        req.body = {
            ...req.body,
            title: req.body.title,
            description: req.body.description || undefined
        };
        next();
    });
}, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.title) {
            res.status(400).json({error: 'Title is required'});
            return;
        }

        if (!req.body.description && !req.file) {
            res.status(400).json({error: 'Description or image is required'});
            return;
        }

        const post = new Post({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? '/images/' + req.file.filename : undefined,
        });

        await post.save();
        res.status(201).json(post);
    } catch (e) {
        next(e);
    }
});

export default postsRouter;