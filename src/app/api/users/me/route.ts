import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const userID = getDataFromToken(req);
        const user = await User.findById({ _id: userID }, { __v: 0, password: 0 });
        console.log("user:", user)
        return NextResponse.json({ error: "User Found", user, success: "ok" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
