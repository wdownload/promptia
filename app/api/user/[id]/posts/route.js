import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database"

Prompt


export const GET = async (req, {params }) =>{

    try {

        await connectToDB();

       const  data = await Prompt.find({creator: params.id}).populate("creator")

        return new Response(JSON.stringify(data),{status:200})


        
    } catch (error) {
        console.log(error)
        return  new  Response( "Failed to fetch user's prompts", {status: 500})
    }

}