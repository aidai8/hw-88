import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const [john, jane] = await User.create(
        {
            username: "John",
            password: "123",
            token: crypto.randomUUID()
        },
        {
            username: "Jane",
            password: "123",
            token: crypto.randomUUID()
        }
    );

    const [post1, post2] = await Post.create(
        {
            user: john._id,
            title: "First post",
            description: "This is my first post",
            datetime: new Date()
        },
        {
            user: jane._id,
            title: "Second post",
            image: "fixtures/girl.jpg",
            datetime: new Date()
        }
    );

    await Comment.create(
        {
            user: john._id,
            post: post1._id,
            text: "First comment on first post",
            datetime: new Date()
        },
        {
            user: jane._id,
            post: post1._id,
            text: "Second comment on first post",
            datetime: new Date()
        },
        {
            user: john._id,
            post: post2._id,
            text: "First comment on second post",
            datetime: new Date()
        },
        {
            user: jane._id,
            post: post2._id,
            text: "Second comment on second post",
            datetime: new Date()
        }
    );

    await db.close();
};

run().catch(console.error);