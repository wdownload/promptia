"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

 
const PromptCard = ({post, handleTagCLick, handleEdit, handleDelete}) => {

   const {data : session} = useSession();
   const pathName = usePathname()
   const router = useRouter()
   const [copied, setCopied] = useState();

   const handleCopy = () =>{
     setCopied(post.prompt);

     navigator.clipboard.writeText(post.prompt);

     setTimeout(()=> setCopied(false), 3000)
    
   }

   const handleUserProfile = async ( userProfile)=>{
      router.push(`/profile/${userProfile._id}?user=${userProfile.username}`)
   }

  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex items-center gap-3 cursor-pointer" >
           <Image src={post.creator.image} 
           alt="user_image"
           width={40}
           height={40}
           className="rounded-full object-contain"

           />

           <div className="flex flex-col" onClick={(e)=>{
            handleUserProfile(post.creator)
           }}>

            <h3 className="	font-satoshi font-semibold  text-gray-900">{post.creator.username}</h3>
            <p className="font-inter font-sm text-gray-500">{post.creator.email.replace(/^(.{2})[^@]+/, "$1****")}</p>
           </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}> 
        <Image
        src={ copied === post.prompt? "/icons/tick.svg": "/icons/copy.svg"}
        width={12}
        height={12}
        alt= "copy-icon"
        />
 
        </div>
    </div>
    <p className="text-sm text-gray-700 my-4 font-satoshi">{post.prompt}</p>
    <p  className="cursor-pointer font-sm font-inter blue_gradient"
        onClick={ (e) => handleTagCLick && handleTagCLick(post.tag)
        }
    
    >#{post.tag}</p>

    { session?.user.id === post.creator._id && pathName === "/profile" && (

      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
        <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
      </div>
    )}

    </div>
  )
}

export default PromptCard