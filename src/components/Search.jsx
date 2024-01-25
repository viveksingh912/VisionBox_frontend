import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from './Card';
const Container=styled.div`
    display: grid;
    flex-wrap: wrap;
    overflow: auto;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(4,1fr);
    gap: 28px;
    @media (max-width: 1800px) {
        grid-template-columns: repeat(3,1fr);
    }
    @media (max-width: 1400px) {
        grid-template-columns: repeat(2,1fr);
    }
    @media (max-width: 800px) {
        grid-template-columns: repeat(1,1fr);
        gap: 0;
    }
`
const Search = ({setProgress}) => {
    const[videos,setVideo]=useState([]);
    const query=useLocation().search;
    useEffect(() => {
     const fetchVideos=async()=>{
         setProgress(0);
        try{
            setProgress(40);
            const res=await axios.get(`https://vision-box-backend.vercel.app/api/videos/search${query}`)
            setProgress(70);
            setVideo(res.data);
            setProgress(100);
        }
        catch(err){
            setProgress(100)
            console.log(err);
        }
     }
     fetchVideos();
    }, [query])
    
  return (
    <Container>
        {videos.map((video)=>{
            return <Card key={video._id} video={video}/>
        })}
    </Container>
  )
}

export default Search