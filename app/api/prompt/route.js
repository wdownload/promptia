import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const  GET = async (req) => {



    try{
 
        await connectToDB();

       const prompts = await Prompt.find({}).populate("creator")

       
       return new Response(JSON.stringify(prompts),{status: 200,headers
    :{'Cache-Control': 'no-store'}})
 
     }
 
     catch(error){
 
         return new Response("Failed to return the prompt",{status: 500} )
     }

}


