"use client"

import Input from "@/components/Input/Input"
import { useCallback, useState } from "react"
import axios from 'axios'

const Auth = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [variant, setVariant] = useState("login")

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
            email, username, password
            });
        } catch (error) {
            console.log(error);    
        }
    }, [email, username, password])

    return (
        <div className="relative h-full w-full 
    bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/5eab1b22-c5ea-48b0-8ef4-862b3fa6df2c/4af43238-4df9-4946-9920-a4bd55f2e50b/IN-en-20230724-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] 
    bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-44 py-5">
                    <img className="h-12" src="/img/logo.png" alt="logo" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 py-16 px-16 self-center mt-2 lg:w2/5
                lg:max-w-md rounded-e-md w-full">
                        <h2 className="text-white text-4xl font-semibold mb-8">
                            {variant === 'login' ? 'Sign In' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                    label="Username"
                                    onChange={(e: any) => setUsername(e.target.value)}
                                    id="username"
                                    type="username"
                                    value={username} />
                            )
                            }
                            <Input
                                label="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email} />

                            <Input
                                label="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password} />
                        </div>
                        <button className="bg-red-600 py-3 text-white 
                        rounded-md w-full mt-10 hover:bg-red-700 transition" onClick={register}>
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'New at Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth