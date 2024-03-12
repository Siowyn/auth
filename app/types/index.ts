import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(2).max(32),
    password: z.string().min(8, {message:"password must be more than 8 characters"}),
  })
  
  export const signInSchema = z.object({
    username: z.string().min(2).max(32),
    password: z.string().min(8, {message:"password must be more than 8 characters"}),
  })
  
  