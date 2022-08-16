import styled from 'styled-components';

const ChartTitle = styled.h3`
  margin-bottom: 20px;
`;

const Chart = styled.div`
  flex-grow: 1;
  background-color: white;
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  color: rgba(0, 0, 0, 0.87);
  padding: 20px;
  border-radius: 4px;
  margin: 0 0 20px 0;
  transition: all ease-in-out;
  transition-duration: 300ms;
  cursor: pointer;

  :hover {
    transition: all ease-in-out;
    transition-duration: 400ms;
    transform: scale(1.02);
  }

  @media screen and (max-width: 892px) {
    margin-bottom: 20px;
  }
`;

const Card = styled.div`
  flex-grow: 1;
  width: 100%;
  background-image: linear-gradient(
    to right,
    rgba(243, 144, 52, 1),
    rgba(255, 42, 39, 1)
  );
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  color: rgba(0, 0, 0, 0.87);
  padding: 20px;
  border-radius: 16px;
  margin: 0 0 20px 0;

  transition: all ease-in-out;
  transition-duration: 300ms;
  cursor: pointer;
  margin: 0 20px 40px 0;

  :hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 892px) {
    margin-bottom: 20px;
  }
`;
const ItemCard = styled.div`
  margin: 0 0 40px 0;
  @media screen and (max-width: 892px) {
    margin-bottom: 20px;
  }
`;

const PieChartContainer = styled.div`
  display: flex;
  margin-right: -10px;
  
  @media screen and (max-width: 892px) {
    flex-direction: column;
    margin-right: 0px;
  }
`;
const PieChartChildContainer = styled.div`
  width: 100%;
  margin-right: 10px;
  @media screen and (max-width: 892px) {
    margin: 0;
  }
`;

export {
  PieChartContainer,
  PieChartChildContainer,
  ChartTitle,
  Chart,
  Card,
  ItemCard,
};
