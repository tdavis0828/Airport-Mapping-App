import "./App.css";
import List from "./components/List";
import MyMap from "./components/Map";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Wrapper = styled.div`
  height: 86vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <Wrapper>
          <MyMap>
            <List />
          </MyMap>
        </Wrapper>
        <Footer />
      </>
    </div>
  );
}

export default App;
