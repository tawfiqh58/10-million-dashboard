import styled from 'styled-components';

const Navbar = styled.div`
  display: flex;
  height: 3.6rem;
  margin-top: 12.2px;
  width: 100%;
`;
const NavbarContainer = styled.div`
  width: 100%;
  border-bottom: 0.5px solid lightgrey;
`;
const NavbarSection = styled.div`
  transition: 0.3s;
  height: 100%;
  flex: 1;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: var(--layout);

  @media screen and (max-width: 892px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export { Navbar, NavbarContainer, NavbarSection };
