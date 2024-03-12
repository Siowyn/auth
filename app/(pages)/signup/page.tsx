import { SignUpForm } from "@/app/components/signupform";


export default async function SignUpPage() {return (
<div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 pt-8">
  <a href="#" className="mb-8 text-2xl font-semibold text-blue-500 lg:mb-10">
    <h1>Sign Up</h1>
  </a>
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 rounded-lg py-2 px-4 bg-gradient-to-r from-pink-300 to-yellow-300">
      Create a Free Account
    </h2>
    <SignUpForm />
  </div>
</div>
)}