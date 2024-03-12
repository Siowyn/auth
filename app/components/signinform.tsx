"use client"
  
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
import { z } from "zod"
 import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signInSchema } from "../types"
import { signInFunc } from "../actions/authactions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function SignInForm(){

  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await signInFunc(values)
    if (!result.success) {
      toast({
        variant: "destructive",
        description: "Something went wrong (Incorrect user or pass)"
      })
    }else if (result.success){
        toast({
            variant: "default",
            description: "Signed In Succesfully!"
        })

        router.push("/")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type = "password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
