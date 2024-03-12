"use server"
import { z } from "zod"
import { signInSchema, signUpSchema } from "../types"
import { Argon2id } from "oslo/password"
import { generateId } from "lucia"
import { userTable } from "@/lib/db/schema"
import db from "@/lib/db"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"
import { equal } from "assert"
import { eq } from "drizzle-orm"
export const signUpFunc = async (values: z.infer<typeof signUpSchema>)=>{
    const hashedPassword = await new Argon2id().hash(values.password)
    const userId = generateId(16)
    try {
        await db.insert(userTable).values({
            id: userId,
            username: values.username,
            hashedPassword: hashedPassword
            }).returning({
                id: userTable.id,
                username: userTable.username,
            })
            const session = await lucia.createSession(userId, {expiresIn: 60 * 60 * 24 * 30})
            const sessionCookie = lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

            return{
                success:true,
                data:{userId}
            }
    } catch (error:any) {
        return{error: error?.messsage}
    }

}

export const signInFunc = async (values: z.infer<typeof signInSchema>)=>{
   const existingUser = await db.query.userTable.findFirst({where: (table)=> eq(table.username, values.username),})

   if (!existingUser) {
    return {
        error: "User not found",
    }
   }
   if (!existingUser.hashedPassword) {
    return {
        error: "User not found",
    }
   }
   const isValidPassword = await new Argon2id().verify(
    existingUser.hashedPassword,
    values.password
   )

   if (!isValidPassword){
    return{
        error: "User not found"
    }
   }

   const session = await lucia.createSession(existingUser.id, {expiresIn: 60 * 60 * 24 * 30})
   const sessionCookie = lucia.createSessionCookie(session.id)
   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

   return{
       success: "logged in",
   }
}
