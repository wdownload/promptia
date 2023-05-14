"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"



const PromptCardList = ({data, handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout"> 
    {data.map((post) =>(
      <PromptCard
         key = {post._id}
         post = {post}
         handleTagCLick = {handleTagClick}

      />
       

      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchResults] = useState([]);
  const router = useRouter()

  useEffect(() =>{

    const fetchPosts = async () =>{
      const response = await fetch("/api/prompt")
      const data = await response.json();
      setPosts(data);
    }

    
    fetchPosts();

  },[posts]);

  const filterPrompts = (searchText) =>{
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };

  const handleSearchChange =  (e) => {
      
       clearTimeout(searchTimeout);
       setSearchText(e.target.value)

       setSearchTimeout(
        setTimeout(()=>{
          const searchResult =  filterPrompts(e.target.value);
          
           setSearchResults(searchResult);
           

        },500)
      )
  }

  const handleTagClick = (tagName)=>{
    setSearchText(tagName)
   
    const searchResult = filterPrompts(tagName)
    setSearchResults(searchResult);
    
  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
         type="text" placeholder="Search for a tag or a username"
         value={searchText}
         onChange={handleSearchChange}
         required
         className="search_input peer "
 
         />
      </form>
 
      {
        searchText? (
          <PromptCardList
         data = {searchedResult}
         handleTagClick =  {handleTagClick}
      />
        ):(
          <PromptCardList
         data = {posts}
         handleTagClick =  {handleTagClick}
      
      />
        )
      }
    </section>
  )
}

export default Feed