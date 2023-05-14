import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const  GET = async (req) => {

     const {searchParams} = new URL(req.url);

    try{
 
        await connectToDB();

       const prompts = await Prompt.find({}).populate("creator")

       
       return new Response(JSON.stringify(),{status: 200})
 
     }
 
     catch(error){
 
         return new Response("Failed to return the prompt",{status: 500} )
     }

}


