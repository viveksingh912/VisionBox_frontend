import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from 'styled-components';
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1.3;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  transition: transform 0.5s;
  transform: translate(0%);
  z-index: 5;
  max-width: 234px;
  /* overflow: auto; */
  @media (max-width: 1000px) {
    position: absolute;
  }
  &.${props => props.className} {
    @media (max-width: 1000px) {
      transition: transform 0.5s;
      transform: translate(-100%);
    }
  }

`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  font-size: 17px;
  font-weight: 600;
  gap: 3px;
  margin-bottom: 5px;
  align-items: center;
  /* height: 56px; */
  color: ${({ theme }) => theme.text};
`;
const Item = styled.div`
  display: flex;
  padding: 4px 0px;
  color: ${({ theme }) => theme.text};
  align-items: center;
  gap: 20px;
  font-size: 16px;
  /* font-weight: 400; */
  /* line-height: 25px; */
  min-height: 35px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Img = styled.img`
  height: 20px;
  border-radius: 8px;
  /* padding:0px 5px; */
`;
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  padding: 5px 15px;
  width: 86px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;
const Menu = (props) => {
  const { darkMode, setdarkMode } = props;
  const { currentUser } = useSelector((state) => state.user);
  const {small,setSmall}=props;
  const theme =useTheme();
  const menuRef= useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSmall(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container className={`${props.small ? 'small-class' : ''}`} ref={menuRef}>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo onClick={()=>setSmall(!small)}>
            {/* <Img src={logo}></Img> */}
            <SmartDisplayIcon />
            VisionBox
          </Logo>
          <Item onClick={()=>setSmall(!small)}>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none" }}>
          <Item onClick={()=>setSmall(!small)}>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        {currentUser && <Link to="subscriptions" style={{ textDecoration: "none" }}>
          <Item onClick={()=>setSmall(!small)}>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>}
        {currentUser &&
          <>
            <Hr></Hr>
            <Item style={{ pointerEvents: "none",color: theme.textSoft }}>
              <VideoLibraryIcon />
              Library
            </Item>
          </>}
        {currentUser && <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <HistoryIcon />
          History
        </Item>}
        {!currentUser && (
          <>
            <Hr></Hr>
            <Login onClick={()=>setSmall(!small)}>
              <span>Sign in to like videos, comment, and subscribe.</span>
              <Link to="signin" style={{ textDecoration: "none", color: theme.textSoft }}>
                <Button>Sign In</Button>
              </Link>
            </Login>
          </>
        )}
        {/*<Item style={{ pointerEvents: "none", color: theme.textSoft}}>*/}
        {/*  <LibraryMusicIcon />*/}
        {/*  Music*/}
        {/*</Item>*/}
        {/*<Item style={{ pointerEvents: "none", color: theme.textSoft }}>*/}
        {/*  <SportsVolleyballIcon />*/}
        {/*  Sports*/}
        {/*</Item >*/}
        {/*<Item style={{ pointerEvents: "none", color: theme.textSoft }}>*/}
        {/*  <SportsEsportsIcon />*/}
        {/*  Gaming*/}
        {/*</Item>*/}
        {/*<Item style={{ pointerEvents: "none", color: theme.textSoft }}>*/}
        {/*  <MovieCreationIcon />*/}
        {/*  Movies*/}
        {/*</Item>*/}
        <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <NewspaperIcon />
          News
        </Item>
        <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <LiveTvIcon />
          Live
        </Item >
        <Hr></Hr>
        <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <SettingsApplicationsIcon />
          Settings
        </Item>
        <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <ReportIcon />
          Report
        </Item>
        <Item style={{ pointerEvents: "none", color: theme.textSoft }}>
          <HelpIcon />
          Help
        </Item>
        <Item
          onClick={() => {
            setdarkMode(!darkMode);
            setSmall(!small);
          }}
        >
          <LightModeIcon />
          {darkMode ? "Light mode" : "Dark mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
