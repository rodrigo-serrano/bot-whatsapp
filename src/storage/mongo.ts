import { Mongoose, connect } from "mongoose";

export const mongoDb: Promise<Mongoose> | undefined = (process.env.MONGODB_URI)
    ? connect(process.env.MONGODB_URI)
    : undefined;