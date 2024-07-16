import React from 'react'
import Background from "/my-icon.jpeg"
import Victory from "@/assets/victory.svg"
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {Input} from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'
import { useEffect } from 'react'
const Auth = ()=> {

    const navigate = useNavigate()
    const {setUserInfo} = useAppStore()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateSignup = ()=>{
        if(!email.length){
           toast.error("Email is required")
           return false; 
        }
        if(!password.length){
            toast.error("Password is required")
            return false; 
        }
        if(password!==confirmPassword){
            toast.error("Confirm Password does not match the Password");
            return false;
        }
        else{
            return true;
        }

    }

    const validateLogin = ()=>{
        if(!email.length){
        toast.error("Email is required")
        return false; 
        }
        if(!password.length){
            toast.error("Password is required")
            return false; 
        }
        return true;
    }

    const handleLogin =  async()=>{
        if(!validateLogin()){
            return;
        }
        try {
            const response = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
            if(response.data.user.id){
                // console.log(response.data.user)
                setUserInfo(response.data.user)
                if(response.data.user.profileSetup){
                    navigate('/chat');
                }
                else{
                    navigate('/profile')
                }
            }
        } catch (error) {
            const errMsg = error.response.data
            toast.error(errMsg)
        }
        
    }

    const handleSignup = async()=>{
        if(!validateSignup()){
            return;
        }
        try {
            const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
            if(response.status==201){
                navigate('/profile');
            }
        } catch (error) {
            const errMsg = error.response.data
            toast.error(errMsg)
        }
        // console.log(response.data.data)
    }

    return (
       <div className='h-[100vH] w-[100vw] flex items-center  justify-center'>
            <div className="h-[80vh] bg-white-border-2 border-white text-opacity-90 shadow-2xl w-[80vw] 
            md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
            <div className='flex flex-col gap-10 items-center justify-center'>
                <div className='flex items-center justify-center flex-col '>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-5xl font-bold md:6xl '>Welcome</h1>
                        <img src={Victory} alt="Victory Emoji" className='h-[100px]'/>
                    </div>
                    <p className="font-medium text-center">
                        Fill in the details to get started with the best chat app
                    </p>
                </div>
                <div className="flex items-center justify-center w-full">
                <Tabs className='w-3/4' defaultValue='login'>
                <TabsList className="bg-transparent rounded-none w-full">
                    <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                    <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
                    <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
                    <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                </TabsContent>
                <TabsContent className="flex flex-col gap-5" value="signup">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                </TabsContent>
                </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src={Background} alt="background login" className='h-[600px]' />
            </div>
            </div>
       </div>
    )
}

export default Auth
