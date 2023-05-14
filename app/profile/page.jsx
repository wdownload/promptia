"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import Profile from "@components/Profile"






const MyProfile = () => {
    const {data: session} = useSession()
    const [posts, setPosts] = useState ([])
    const router = useRouter();

    useEffect(()=>{
        
        const fetchPosts = async () =>{
            
            const response = await fetch (`/api/user/${session?.user.id}/posts`)
            const data = await response.json()
            setPosts(data)
         
           
        }
       if (session?.user.id) fetchPosts();
    },[])
    
    const handleEdit = (post) =>{

        console.log(post)
        router.push(`/update-prompt?id=${post._id.toString()}`)
    
    }
    
    const handleDelete = async (post) =>  {
    
    const hasconfirmed = confirm("Are your sure you want to delete this prompt?")   
    
    if (hasconfirmed){
        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE'
            });
         const filteredPosts = posts.filter((p) => p._id !== post._id);
         
         setPosts(filteredPosts);
        } catch (error) {
            console.log(error)
        }
    }
    }

  return (
    <Profile 
      name = "My "
      desc = "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of data"
      data = {posts}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
    />
  )
}

export default MyProfile