import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { exchangeCodeForAccessToken, getAccountDetail } from "~/lib/aurinko"
import { db } from "~/server/db"

export const GET= async(req: NextRequest) => {
    const {userId} = await auth()

    if (!userId) {
        return NextResponse.json({message:"unauthrized"}, {status: 401})
    }

    const params = req.nextUrl.searchParams

    const status = params.get('status')
    if (status != 'success') return NextResponse.json({message: "Failed to link account"} , { status: 402})
    
    const code = params.get('code')
    if (!code) return NextResponse.json({message: "no code provided"} , { status: 400})
    
    const token = await exchangeCodeForAccessToken(code)
    if (!token) return NextResponse.json({message: "token is not found"} , { status: 400})
    
    const accountDetail = await getAccountDetail(token.accessToken)
    if (!accountDetail) return NextResponse.json({message: "account detail is not found"} , { status: 400})

    await db.account.upsert({
        where: {
            id: token.accountId.toString()
        },
        update:{
            accessToken: token.accessToken
        },
        create:{
            id: token.accountId.toString(),
            userId,
            emailAddress: accountDetail.email,
            name: accountDetail.name,
            accessToken: token.accessToken,
        }
    })

    console.log(accountDetail)


    return NextResponse.redirect(new URL('/mail', req.url))
}