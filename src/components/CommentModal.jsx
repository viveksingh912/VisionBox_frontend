import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';
import Comment from "./Comment";
import {useSelector} from "react-redux";
import axios from "axios";
import styled, {useTheme} from "styled-components";
import {useThemeProps} from "@mui/material";

const Container=styled.div`
width: 100%;
`;
const NewComment=styled.div`
    display: flex;
    gap: 20px;
`
const Avatar=styled.img`
  height: 40px;
  width: 45px;
  border-radius: 50%;
  background-color: #999;
`
const Input=styled.input`
    outline: none;
    width: 80%;
    border: none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color: transparent;
    color:${({theme})=>theme.text};
    padding: 5px;
`
const Button = styled.button`
  padding: 5px 15px;
  width: 86px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  /* border-radius: none; */
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
`;
const CommentModal = ({ isOpen, closeModal,videoId }) => {
    const theme=useTheme();
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'flex-end', // Align items to the bottom
            justifyContent: 'center',
        },
        content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: '0', // Position the modal at the bottom
            border: 'none',
            background: theme.bg,
            borderRadius: '10px', // Add border-radius if needed
            width: '100%',
            maxHeight:'70vh',
            overflowY: 'scroll'
        },
    };

    const [comments,setComments]=useState([]);
    const [flag,setFlag]=useState(true);
    const [desc,setDesc]=useState("");
    const { currentUser } = useSelector((state) => state.user);
    const ref=useRef();
    const handleComment=async(e)=>{
        e.preventDefault();
        try{
            if(currentUser){
                let accessToken = null;
                const User = localStorage.getItem("user");
                if (User) {
                    const data = JSON.parse(User);
                    accessToken = data.accessToken;
                }
                // Set up an Axios instance with a default header for the 'access_token' cookie
                const headers = {
                    Authorization: `Bearer ${accessToken}`, // Add the access token to the header
                };
                const res= await axios.post(`https://vision-box-backend.vercel.app/api/comments`,{videoId,desc},{headers});
                setDesc(res.data);
                console.log(res.data);
                setFlag(!flag);
                ref.current.value="";
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        const fetctComments=async ()=>{
            try{
                const res= await axios.get(`https://vision-box-backend.vercel.app/api/comments/${videoId}`);
                setComments(res.data);
                // console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetctComments();
    }, [videoId,flag])


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <Container>
                <NewComment>
                    <Avatar src={currentUser?.img}></Avatar>
                    <Input placeholder="enter yout text" onChange={(e)=>{setDesc(e.target.value)}} ref={ref}></Input>
                    <Button onClick={handleComment}>Comment</Button>
                </NewComment>
                {
                    comments.map((comment)=>{
                        // console.log(comment);
                        return <Comment key={comment._id} comment={comment}/>
                    })
                }
            </Container>
        </Modal>
    );
};

export default CommentModal;