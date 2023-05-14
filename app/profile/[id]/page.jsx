"use client"


import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import Profile from "@components/Profile"






const UserProfile = ({params}) => {
    const [posts, setPosts] = useState ([])
    const [user, setUser] = useState()
    const router = useRouter();
    
    const username = useSearchParams().get("user")


    useEffect(()=>{

        

    
        
        const fetchPosts = async () =>{
  
            
            const response = await fetch (`/api/user/${params.id}/posts`)
            const data = await response.json()
            
            setPosts(data)
         
           
        }
        
       if (params.id) fetchPosts();
    },[])
    

  return (
    <Profile 
      name = {username}
      desc = {` Welcome to ${username} personalized profile page. Share with ${username} exceptional prompts and inspire others with the power of data `}
      data = {posts}
      handleEdit = {()=>{

      }}
      handleDelete = {()=>{}}
    />
  )
}

export default UserProfile