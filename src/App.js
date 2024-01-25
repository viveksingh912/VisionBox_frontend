import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/menu";
import Navbar from "./components/Navbar";
import { darktheme, lighttheme } from "./utility/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Video from "./components/Video";
import SignIn from "./components/SignIn";
import "./Scrollbar.css";
import Search from "./components/Search";
import { useSelector } from "react-redux";
import { SetMeal } from "@mui/icons-material";
import LoadingBar from 'react-top-loading-bar'
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  height: calc(100vh - 104px);
  padding: 22px 20px;
  @media (max-width: 700px) {
    padding: 12px 8px;
    height: calc(100vh - 84px);
  }
`;
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  position: relative;
  overflow: hidden;
  /* display:flex; */
  color: ${({ theme }) => theme.text};
  flex: 7;
`;

function App() {
  const [darkMode, setdarkMode] = useState(true);
  const [small, setSmall] = useState(true);
  const [progress, setProgress] = useState(30)
  const toggleSmall = (value) => {
    setSmall(value); 
  };
  return (
    <ThemeProvider theme={darkMode ? darktheme : lighttheme}>
      <BrowserRouter>
        <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
        <Container>
          <Menu
            darkMode={darkMode}
            setdarkMode={setdarkMode}
            small={small}
            setSmall={setSmall}
          ></Menu>
          <Main>
            <Navbar toggleSmall={toggleSmall} small={small}></Navbar>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home setProgress={setProgress} progress={progress} type="random" />} />
                  <Route path="trends"  element={<Home setProgress={setProgress} type="trend" />} />
                  <Route path="subscriptions"  element={<Home setProgress={setProgress} type="sub" />} />
                  <Route path="search"  element={<Search setProgress={setProgress} />} />
                  <Route path="signin"  element={<SignIn setProgress={setProgress} />}></Route>
                  <Route path="video/:id"  element={<Video setProgress={setProgress} />}></Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
