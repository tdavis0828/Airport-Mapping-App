import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Navbar = styled.nav`
  height: 65px;
  width: 100%;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 200;
  position:fixed;
  top: 0;
    i {
      cursor: pointer;
    }

`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <p>AIRPORT</p>
      <p>
        <i onClick={() => navigate('/')} class="fa fa-plane fa-2x"></i>
      </p>

      <p>FINDER</p>
    </Navbar>
  );
};

export default Header;