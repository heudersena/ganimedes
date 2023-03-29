import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log("============");

    return NextResponse.next()




}


export const config = {
    matcher: ['/'],
}