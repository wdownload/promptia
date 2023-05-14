import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

// GET 
export const  GET = async (req,{params}) => {
    try{
        await connectToDB();
        
        console.log(params.id)
       const data = await Prompt.findById(params.id).populate("creator")
      
       if(!data)
       return new Response("Prompt not found",{status: 404})
       else
       return new Response(JSON.stringify(data),{status: 200})
 
     }
 
     catch(error){
 
         return new Response("Failed to return the prompt",{status: 500} )
     }

}

// PATCH


export const PATCH = async(req, {params})=>{

    const {prompt, tag} = await req.json();
try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id).populate("creator")

    if(!existingPrompt)
    return  new Response("Prompt not found",{status: 404})
       else{

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
       return  await new Response(JSON.stringify(existingPrompt),{status: 200})

    }

} catch (error) {
    return new Response("Failed to update the prompt",{status: 500} )
}
    
}


// DELETE

export const  DELETE = async (req,{params}) => {
    try{
        await connectToDB();
        
       const existingPrompt = await Prompt.findByIdAndRemove(params.id);
      
    
     }
 
     catch(error){
 
         return new Response("Failed to delete the prompt",{status: 500} )
     }

}