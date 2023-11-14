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
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 104px);
  padding: 22px 0px;
`;
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  /* display:flex; */
  color: ${({ theme }) => theme.text};
  flex: 7;
`;

function App() {
  const [darkMode, setdarkMode] = useState(true);
  const [small, setSmall] = useState(true);
  const toggleSmall = (value) => {
    setSmall(value); 
  };
  return (
    <ThemeProvider theme={darkMode ? darktheme : lighttheme}>
      <BrowserRouter>
        <Container>
          <Menu
            darkMode={darkMode}
            setdarkMode={setdarkMode}
            small={small}
          ></Menu>
          <Main>
            <Navbar toggleSmall={toggleSmall} small={small}></Navbar>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />}></Route>
                  <Route path="video/:id" element={<Video />}></Route>
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
