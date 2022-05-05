import styled from "styled-components";

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
`;

const Header = () => {
  return (
    <Navbar>
      <p>AIRPORT</p>
      <p>
        <i className="fa-solid fa-jet-fighter-up fa-2x"></i>
      </p>

      <p>FINDER</p>
    </Navbar>
  );
};

export default Header;
