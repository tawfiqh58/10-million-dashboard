import styled from 'styled-components';

const HighlightCount = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: white;
`;
const HighlightSubTitle = styled.span`
  font-size: 15px;
  color: white;
`;
const HighlightCountContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  color: white;
  align-items: center;
`;
const HighlightTitle = styled.span`
  font-size: 20px;
  color: white;
`;
const HighlightWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 892px) {
    flex-direction: column;
  }
`;
const HighlightContainer = styled.div`
  display: flex;
  margin-right: -20px;

  @media screen and (max-width: 892px) {
    flex-direction: column;
    margin-right: 0px;
  }
`;

export {
  HighlightWrapper,
  HighlightTitle,
  HighlightSubTitle,
  HighlightContainer,
  HighlightCountContainer,
  HighlightCount,
};
