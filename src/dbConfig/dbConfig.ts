import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            //e.log("MongoDB connected Successfully");
        })

        connection.on("error", (err) => {
            //e.log(`Connection error ${err}`);
            process.exit();
        })

    } catch (error) {
        //e.log(`Something goes wrong with connecting Database ${error}`);
    }
} 