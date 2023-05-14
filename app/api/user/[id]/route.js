

import User from "@models/user";
import { connectToDB } from "@utils/database"




export const GET = async (req, {params}) =>{

    try {

        await connectToDB();

        const user = await User.findById({ _id: params.id})

        

      if (!user)
       return   new Response("User not found",{status:404})
        else
        return  new Response(JSON.stringify(user),{status:200})
        
        
       


        
    } catch (error) {
        return  new  Response( "Failed to fetch user details", {status: 500})
    }

}