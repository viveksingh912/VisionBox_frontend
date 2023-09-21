// import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import axios from 'axios'
const Container=styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Home = ({type}) => {
  const [videos,setVideos]=useState([]);
  // useEffect(() => {
  //   const fetchvidoes= async ()=>{
  //     try{
  //     const req=await axios.get(`/api/videos/${type}`);
  //     setVideos(req.data)
  //     }
  //     catch(err){
  //       console.log(err);
  //     }
  //   }
  //   fetchvidoes();
  // }, [type])
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let accessToken =null;
        const User= localStorage.getItem('user');
        if(User){
          const data=JSON.parse(User);
          accessToken=data.accessToken;
        }  
        // Set up an Axios instance with a default header for the 'access_token' cookie
        const headers = {
          Authorization: `Bearer ${accessToken}`, // Add the access token to the header
        };
        const req = await axios.get(`https://vision-box-backend.vercel.app/api/videos/${type}`, { headers });
        setVideos(req.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
    {
      videos.map((video)=>(
        <Card key={video._id} video={video}/>
      ))
    }
    </Container>
  )
}

export default Home