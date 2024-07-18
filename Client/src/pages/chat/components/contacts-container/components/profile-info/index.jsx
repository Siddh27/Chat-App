import { Avatar,AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store"
import { HOST } from "@/utils/constants"
import { Tooltip,TooltipProvider,TooltipTrigger,TooltipContent } from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import {IoPowerSharp} from "react-icons/io5"
import { LOGOUT_ROUTE } from "@/utils/constants"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
function ProfileInfo() {

    const {userInfo,setUserInfo} = useAppStore();
    const navigate = useNavigate();

    const logout = async()=>{
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
            if(response.status===200){
                toast.success('Logged out Successfully');
                navigate('/auth')
                setUserInfo(null);
            }
        } catch (error) {
            
        }
    }
    return (
        <div className='absolute bottom-0 flex items-center justify-between px-10 w-full bg-[#2a2b33] '>
            <div className='flex gap-3 items-center justify-center'>
                <div className="w-12 h-12 relative">
                <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                        {userInfo.image?(<AvatarImage src={`${HOST}/${userInfo.image}`} alt='profile' className='object-cover w-full h-full bg-black'/>)
                        :(<div className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${userInfo.color}`}>
                        {userInfo.firstName ? 
                        userInfo.firstName.split("").shift():userInfo.email.split("").shift()}</div>)}
                    </Avatar>
                </div>
                <div>
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`:""
                    }
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className='text-yellow-300 font-medium text-xl'
                            onClick={()=>navigate('/profile')}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp className='text-yellow-700 font-medium text-xl'
                            onClick={logout}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo
