import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { token } = reqBody;
    try {
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "There was an Error while Verifying email" }, { status: 500 });
        }

        // if all validation is done then update user verification in DB
        user.isVerified = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully", success: "ok" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
