import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/Alert";
import { createUser, getUserByUsername } from "../../service/userService";
import { useCookies } from "react-cookie";

export default function SignUpFOrm({setType}: {setType: React.Dispatch<React.SetStateAction<string>>}) {
    const [alert, setAlert] = useContext(AlertContext)
    const [cookies, setCookie] = useCookies(['user', "username"])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleCreateUser = async () => {
        setAlert("")
        if(!username || !password || !confirmPassword) return setAlert("Don't leave anything blank")
        if(password !== confirmPassword) return setAlert("The passwords dont match")
        if(username.length > 12) return setAlert("The username cannot exceed 12 characters")
        let possibleUser = await getUserByUsername({username})
        if(possibleUser?.username) return setAlert("This username is being used")
        let createdUser = await createUser({username, password})
        setCookie("user", createdUser?.id)
        setCookie("username", createdUser?.username)
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
                <h2>create account</h2>
                <span onClick={() => setType("sign-in")} className="text-blue-500 cursor-pointer hover:opacity-70 font-semibold duration-200">
                    sign in
                </span>
            </div>
            <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="username" name="username" className="px-2 rounded-[3px] border border-zinc-300 py-1" type="text" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" name="password" className="px-2 rounded-[3px] border border-zinc-300 py-1" type="password" />
            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="confirm" name="password" className="px-2 rounded-[3px] border border-zinc-300 py-1" type="password" />
            <button onClick={handleCreateUser} className="mt-1 bg-blue-500 text-white py-1 rounded-[3px] duration-500 hover:opacity-80">create</button>
        </div>
    )
}