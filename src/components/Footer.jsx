import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 65px;
  width: 100%;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Bitwise Industires {new Date().getFullYear()}</p>
    </StyledFooter>
  );
};

export default Footer;
