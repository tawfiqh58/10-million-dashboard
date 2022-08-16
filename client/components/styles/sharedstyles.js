import styled from 'styled-components';

const Main = styled.main`
  padding: 2rem 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 892px) {
    padding: 12px 12px 0;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const WidthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 892px;
`;
const ContainerBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const InputContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
`;
const BodyContainer = styled.div`
  padding-top: 16px;
  width: 100%;

  @media screen and (max-width: 892px) {
    padding-top: 0;
    margin: auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const CenterdDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  padding: 0 26px;
  flex-grow: 1;
  flex-direction: column;
  @media screen and (max-width: 892px) {
    padding: 0;
  }
`;

const Footer = styled.footer`
  padding: 10px 0;
  @media screen and (max-width: 892px) {
    padding: 4px 0;
  }
`;

const FooterText = styled.p`
  padding: 0;
`;

export {
  Main,
  Body,
  BodyContainer,
  Row,
  Column,
  WidthContainer,
  InputContainer,
  Container,
  CenterdDiv,
  ContainerBox,
  Footer,
  FooterText,
};
