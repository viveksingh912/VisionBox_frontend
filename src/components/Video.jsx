import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import logo from "../img/logo.png";
import Comments from "./Comments";
// import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recomendation from "./Recomendation";
const Container = styled.div`
  display: flex;
  gap: 20px;
  /* justify-content: space-between; */
  height: 100%;
  overflow: auto;
  width: 100%;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 500px;
  @media (max-width: 1000px) {
    height: auto;
  }
`;
const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  /* font-weight: 500; */
  font-style: bold;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.div``;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 500px) {
    gap: 12px;
  }
`;
const Button = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  /* border: 0.2px solid ${(theme) => theme.soft}; */
  margin: 15px 0px;
  color: ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Subscribe = styled.button`
  background-color: red;
  color: white;
  font-weight: 500;
  height: max-content;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.div``;

const ChannelCounter = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const ChannelDescription = styled.div`
  font-size: 14px;
`;
const ChannelIMage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #999;
`;
const VideoFrame = styled.video`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const videoRes = await axios.get(`https://vision-box-backend.vercel.app/api/videos/find/${path}`);
        const channelRes = await axios.get(
          `https://vision-box-backend.vercel.app/api/users/find/${videoRes.data.userId}`
        );
        const addedView = await axios.get(`https://vision-box-backend.vercel.app/api/videos/view/${path}`);
        // console.log(videoRes.data);
        dispatch(
          fetchSuccess({ ...videoRes.data, views: videoRes.data.views + 1 })
        );
        // console.log(currentVideo);
        setChannel(channelRes.data);
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateScreenWidth);
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, [])
  const handleLike = async () => {
    let accessToken = null;
    const User = localStorage.getItem("user");
    if (User) {
      const data = JSON.parse(User);
      accessToken = data.accessToken;
    }
    else
      return;
    // Set up an Axios instance with a default header for the 'access_token' cookie
    const headers = {
      Authorization: `Bearer ${accessToken}`, // Add the access token to the header
    };
    // console.log(headers);
    await axios.put(`https://vision-box-backend.vercel.app/api/users/like/${currentVideo._id}`, {}, { headers });
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    let accessToken = null;
    const User = localStorage.getItem('user');
    if (User) {
      const data = JSON.parse(User);
      accessToken = data.accessToken;
    }
    else
      return;
    // Set up an Axios instance with a default header for the 'access_token' cookie
    const headers = {
      Authorization: `Bearer ${accessToken}`, // Add the access token to the header
    };
    console.log(headers);
    await axios.put(`https://vision-box-backend.vercel.app/api/users/dislike/${currentVideo._id}`, {}, { headers });
    dispatch(dislike(currentUser._id));
  };
  const handleSub = async () => {
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
    // console.log(accessToken);
    // console.log(channel?._id);
    if (currentUser && currentUser.subscribedUsers.includes(channel._id)) {
      try {
        await axios.put(`https://vision-box-backend.vercel.app/api/users/unsub/${channel._id}`, {}, { headers });
        setChannel({ ...channel, subscribers: channel.subscribers - 1 });
        dispatch(subscription(channel._id));
      }
      catch (err) {
        console.log(err);
      }
    } else if (currentUser) {
      try {
        await axios.put(`https://vision-box-backend.vercel.app/api/users/sub/${channel._id}`, {}, { headers });
        setChannel({ ...channel, subscribers: channel.subscribers + 1 });
        dispatch(subscription(channel._id));
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info> {currentVideo?.views} views </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpOutlinedIcon />
              ) : (
                <ThumbUpAltIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownOutlinedIcon />
              ) : (
                <ThumbDownIcon />
              )}{" "}
              {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ShareIcon /> Share
            </Button>
            <Button>
              <SaveIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelIMage src={channel.image}></ChannelIMage>
            <ChannelDetails>
              <ChannelName>{channel.name} </ChannelName>
              <ChannelCounter> {channel.subscribers} subscibers</ChannelCounter>
              <ChannelDescription>{currentVideo?.desc}</ChannelDescription>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
        {screenWidth <= 1000 && (
          <Recomendation tags={currentVideo?.tags} type="lg" />
        )}
      </Content>
      {screenWidth > 1000 && (
        <Recomendation tags={currentVideo?.tags} type="sm" />
      )}
    </Container>
  );
};
export default Video;
