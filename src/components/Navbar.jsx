import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import Upload from "./Upload";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  height: 60px;
  background-color: ${({ theme }) => theme.bgLight};
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Search = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchContainer=styled.div`
   /* max-width: 70%; */
   width: 70%;
   max-width: 500px;
   /* min-width: 290px; */
   border: 1px solid #ccc;
   border-radius: 25px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   @media (max-width:700px) {
    width: 80%;
   }
`
const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  padding: 10px 15px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
  font-weight: 500;
  font-size: 15px;
  border-right: 1px solid #ccc;
  @media (max-width:700px) {
    width: 85%;
    padding: 8px 8px;
   }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #999;
`;

const HamBurger = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const HamItem = styled.div`
  height: 3px;
  width: 20px;
  background-color: white;
  background: white;
  margin: 5px 0px;
`;

const Navbar = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const { small, toggleSmall } = props;

  const setData = (val) => {
    setOpen(val);
  };

  const handleSwitch = () => {
    navigate(`/search?q=${q}`);
  };

  const hadleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
  };

  return (
    <>
    <Container>
      <HamBurger onClick={() => { toggleSmall(!small) }}>
        <HamItem></HamItem>
        <HamItem></HamItem>
        <HamItem></HamItem>
      </HamBurger>
      <Search>
        <SearchContainer>
        <Input placeholder="Search" onChange={(e) => setQ(e.target.value)}></Input>
        <SearchIcon style={{margin:"0px 5px"}} onClick={handleSwitch}></SearchIcon>
        </SearchContainer>
      </Search>
      {currentUser ? (
        <User>
          <LogoutIcon onClick={hadleLogOut} />
          <VideoCallIcon onClick={() => setData(true)} />
          <Avatar src={currentUser.image} />
          {/* {currentUser.name} */}
        </User>
      ) : (
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
      )}
    </Container>
    {open && <Upload setData={setData} />}
    </>
  );
};

export default Navbar;
