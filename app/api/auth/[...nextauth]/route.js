import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react";

import { connectToDB } from "@utils/database";
import User from '@models/user'

const handler = NextAuth({
    providers : [
        GoogleProvider(
           { 
            clientId : process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
        ),

       
    ],

    callbacks:{
        async session({session}){

            const userSession = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = userSession._id.toString()
            return session
        },
        async signIn({profile}){
    
            try {
            
                await connectToDB();
    
                const UserExists = await User.findOne({
                    email: profile.email
                })
                
                let valid_username = profile.name.replace(new RegExp(" ","g"),"_").toLowerCase()

                if(valid_username.length > 20)
                {
                   //const split_position = indexesOf(valid_username, "_")
                  valid_username = valid_username.substring(0,valid_username.indexOf("_")) +"_"+ Math.floor(Math.random()*1000000)

                }


                if(!UserExists){
                    User.create({
                        email : profile.email,
                        username: valid_username,
                        image: profile.picture
                    })
                }
                return true
    
            } catch (error) {
                console.log("Error checking if user exists:", error.message)
                return false
            }
    
        }
    }
})

export  {handler as GET, handler as POST} 