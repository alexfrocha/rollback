import { useState } from "react"
import SignUpForm from "./Account/SignUpForm"
import SignInForm from "./Account/SignInForm"

export default function Account() {
    const [type, setType] = useState("sign-in")
    return (
        <div className="absolute min-w-[15%] bg-white p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-zinc-300 shadow-md">
            {type == "sign-in" && <SignInForm setType={setType} /> }
            {type == "sign-up" && <SignUpForm setType={setType} /> }
        </div>
    )
}