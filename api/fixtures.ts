import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    await User.create(
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
    )

    await db.close();
};

run().catch(console.error);