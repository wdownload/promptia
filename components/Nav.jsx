"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"



const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null);

    
    useEffect(()=>{
        const setUpProviders= async () =>{
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders()
    },[])

    // mobile Menu use state

    const [toggleDropdown, setToggleDropdown] = useState (false);
  return (
    <nav className="flex-between w-full mb-16 pt-5">
        <Link href="/"   className="flex gap-2 flex-center" replace>
            <Image src="/images/logo.svg"
            alt="Promptia Logo" 
            width={30} 
            height={30} 
            className="object-contain"/>
            <p className="logo_text">Promptopia</p> 
        </Link>
        {/* Desktop Navigation*/}
        <div className="sm:flex hidden">
             { session?.user ?(
                <div className="flex gap-3 md:gap-3">
                    <Link 
                    href="/create-prompt" 
                    className="black_btn">
                        Create Post
                    </Link>
                    <button type="button" className="outline_btn" onClick={signOut}>
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src= {session?.user.image} 
                        width={37} 
                        height={37} 
                        className="rounded-full"
                        alt="User Profile Picture"
                        />
                    </Link>
                </div>
             ):(
                <>
                 { providers && 
                 Object.values(providers).map((provider) => (
                   <button
                   type="button" key={provider.name}
                   onClick={() => signIn(provider.id)}
                   className="black_btn"
                   >
                    SignIn
                   </button>
                 ))
                 }
                </>
             )
             }
        </div>
  {/* Mobile Navigation */}
  <div className="sm:hidden flex relative">
    {
        session?.user? (
            <div className="flex"> 
                <Image src={session?.user.image}
                        width={37} 
                        height={37} 
                        className="rounded-full"
                        alt="User Profile Picture"
                        onClick={() => {
                            setToggleDropdown( (prev) => !prev )

                        }}

                        />
                        {toggleDropdown && (
                            <div
                            className="dropdown" > 
                               <Link
                               href="/profile"
                               className= "dropdown_link"
                               onClick={()=> setToggleDropdown(false)}
                               >
                               My Profile
                               </Link>
                               <Link
                               href="/create-prompt"
                               className= "dropdown_link"
                               onClick={()=> setToggleDropdown(false)}
                               >
                               Create Prompt
                               </Link>
                               <button
                               className="mt-5 w-full black_btn"
                               onClick={()=>{
                                setToggleDropdown(false)
                                signOut()
                               }}>
                                Sign Out
                               </button>
                            </div>
                        )}

            </div>
     
        ): 
        (
            <>
             { providers && 
                 Object.values(providers).map((provider) => (
                   <button
                   type="button" key={provider.name}
                   onClick={() => signIn(provider.id)}
                   className="black_btn"
                   >
                    SignIn
                   </button>
                 ))
                 }
            </>
        )
    }

  </div>
    </nav>
  )
}

export default Nav