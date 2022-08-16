import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { io } from 'socket.io-client';

import DataTable from '../components/UserTable';
import HighlightCard from '../components/HighlightCard';
import MaleFemale from '../components/charts/MaleFemalePieChart';
import DevicePie from '../components/charts/DevicePieChart';
import LineChart from '../components/charts/LineChart';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Main,
  Body,
  BodyContainer,
  WidthContainer,
  ContainerBox,
} from '../components/styles/sharedstyles';
import {
  PieChartContainer,
  PieChartChildContainer,
} from '../components/styles/dashboardstyles';
import { NavbarSection } from '../components/styles/navbarstyles';
import {
  getDeviceData,
  getGenderData,
  getTopCountriesData,
} from '../utils/dashboard-data-format';
import { SEVER_URL } from '../config';

function Index() {
  const [dashboardData, setData] = useState();

  useEffect(() => {
    const newSocket = io(SEVER_URL);
    newSocket.on('connect', () => {

      // Real-time data
      newSocket.on('dashboard', (res) => {
        if (res.data) {
          setData(res.data);
        } else setData({});
      });
    });
    return () => newSocket.close();
  }, []);

  return (
    <>
      <Header />
      <NavBar>
        <NavbarSection style={{ '--layout': 'start' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'flex',
                color: 'grey',
                alignItems: 'center',
              }}
            >
              <h1>Dashboard</h1>
            </div>
          </Link>
        </NavbarSection>
        <NavbarSection style={{ '--layout': 'end' }}>
          <Link href="/add-user" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              disableElevation
              style={{ textTransform: 'none' }}
            >
              Add User
            </Button>
          </Link>
        </NavbarSection>
      </NavBar>
      <Main>
        <ContainerBox>
          <WidthContainer>
            {dashboardData && (
              <BodyContainer>
                <Body>
                  <HighlightCard data={dashboardData.userActiveStatus} />
                  <LineChart
                    data={getTopCountriesData(dashboardData.topCountriesByUser)}
                  />
                  <PieChartContainer>
                    <PieChartChildContainer>
                      <DevicePie
                        data={getDeviceData(dashboardData.devicesCount)}
                      />
                    </PieChartChildContainer>
                    <PieChartChildContainer>
                      <MaleFemale
                        data={getGenderData(dashboardData.genderCount)}
                      />
                    </PieChartChildContainer>
                  </PieChartContainer>
                  <DataTable data={dashboardData.topActiveUsers} />
                </Body>
              </BodyContainer>
            )}
          </WidthContainer>
        </ContainerBox>
      </Main>
      {dashboardData && <Footer />}
    </>
  );
}

export default Index;
