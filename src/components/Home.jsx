// import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
const Container = styled.div`
  display: grid;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
  grid-template-columns: repeat(4,1fr);
  gap: 28px;
  height: calc(100vh - 104px);
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
  @media (max-width: 700px) {
    height: calc(100vh - 84px);
  }
`
const Home = ({ type,setProgress }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] =useState(true);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setProgress(0);
      try {
        let accessToken = null;
        const User = localStorage.getItem('user');
        if (User) {
          const data = JSON.parse(User);
          accessToken = data.accessToken;
        }
        // Set up an Axios instance with a default header for the 'access_token' cookie
        const headers = {
          Authorization: `Bearer ${accessToken}`, // Add the access token to the header
        };
        setProgress(30);
        const req = await axios.get(`https://vision-box-backend.vercel.app/api/videos/${type}`, { headers });
        setProgress(70);
        setLoading(false);
        setVideos(req.data);
        setProgress(100);
      } catch (err) {
        setProgress(100);
        setLoading(false);
        console.log(err);
      }
    };
    fetchVideos();
  }, [type]);
  return (
  <>
    { loading && <CircularProgress style={{ display: 'flex' ,position:'absolute',top: '50%', left:'50%'}}/>}
    <Container>
      {
        !loading && videos.map((video) => (
          <Card key={video._id} video={video} />
        ))
      }
    </Container>
  </>
  )
}

export default Home