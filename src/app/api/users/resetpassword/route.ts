import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { email } = reqBody;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "There was an Error Reseting Password" }, { status: 400 });
        }
        //e.log("user:", user);
        const res = await sendEmail({ email, emailType: "RESET", userId: user?._id });
        return NextResponse.json({ message: "User found", success: "ok", ...res }, { status: 200 });
    } catch (error: any) {
        //e.log("error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
