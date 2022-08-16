import { Navbar, NavbarContainer } from './styles/navbarstyles';
import { WidthContainer, ContainerBox } from './styles/sharedstyles';

export default function ({ children }) {
  return (
    <NavbarContainer>
      <ContainerBox>
        <WidthContainer>
          <Navbar>{children}</Navbar>
        </WidthContainer>
      </ContainerBox>
    </NavbarContainer>
  );
}
