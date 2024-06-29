import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/Alert";
import { getUserByUsername } from "../../service/userService";
import bcrypt from 'bcryptjs-react'
import { useCookies } from "react-cookie";

export default function SignInForm({setType}: {setType: React.Dispatch<React.SetStateAction<string>>}) {
    const [alert, setAlert] = useContext(AlertContext)
    const [cookies, setCookie] = useCookies(['user', "username"])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleEnterAccount = async () => {
        if(!username || !password) return setAlert("Don't leave anything blank")
        let possibleUser = await getUserByUsername({username})
        if(!possibleUser?.username) return setAlert("This account doesn't exist")
        bcrypt.compare(password, possibleUser.password!, (err: any, result: any) => {
            if(result == true) {
                setCookie('user', possibleUser.id!)
                setCookie('username', possibleUser.username!)
            } else {
                return setAlert("Wrong password")
            }
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
                <h2>enter account</h2>
                <span onClick={() => {
                    setType("sign-up")
                }} className="text-blue-500 cursor-pointer hover:opacity-70 font-semibold duration-200">
                    sign up
                </span>
            </div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" name="username" className="px-2 rounded-[3px] border border-zinc-300 py-1" type="text" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" name="password" className="px-2 rounded-[3px] border border-zinc-300 py-1" type="password" />
            <button onClick={handleEnterAccount} className="mt-1 bg-blue-500 text-white py-1 rounded-[3px] duration-500 hover:opacity-80">enter</button>
        </div>
    )
}