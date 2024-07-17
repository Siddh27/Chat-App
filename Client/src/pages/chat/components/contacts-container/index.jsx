import React from 'react'
import Logo from "@/my-icon.jpeg"
function ContactsContainer() {
    return (
        <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
            <div className='pt-3 pl-3 flex w-1/2 justify-between'>
                 <div> <img src={Logo} alt="" /></div>
                <div className='inline-block poppins-light-italic my-auto text-xl'>Talkative</div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages"/>
                </div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Groups"/>
                </div>
            </div>
        </div>
    )
}

export default ContactsContainer


const Title = ({text})=>{
    return (
        <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>
            {text}
        </h6>
    )
}

