import mongoose, { Document, Model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        //unique: true
    },

    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    forgorPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    },
});

interface UserDocument extends Document {
    email: string;
    password: string;
    username?: string;
    forgorPasswordToken: string;
    forgotPasswordTokenExpiry: Date | undefined;
    verifyToken: string;
    verifyTokenExpiry: Date | undefined;
    isVerified: boolean;
    isAdmin: boolean;
}


const User: Model<UserDocument> = mongoose.models.user || mongoose.model("user", userSchema);

export default User;