import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected Successfully");
        })

        connection.on("error", (err) => {
            console.log(`Connection error ${err}`);
            process.exit();
        })

    } catch (error) {
        console.log(`Something goes wrong with connecting Database ${error}`);
    }
} 