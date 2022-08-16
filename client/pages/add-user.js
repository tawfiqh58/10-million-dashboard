import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Header from '../components/Header';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Main,
  Body,
  WidthContainer,
  ContainerBox,
  Column,
  InputContainer,
} from '../components/styles/sharedstyles';
import { NavbarSection } from '../components/styles/navbarstyles';
import { Form, Title, FormItemSpace } from '../components/styles/formstyles';

import { countryList, lastActiveDd } from '../utils/input-form-utils';
import { SEVER_URL } from '../config';

export default function () {
  const router = useRouter();
  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let _data = {
      ...data,
      password: data.username + '123',
      totalActive: data.totalActive * 1000 * 60 * 60,
    };

    await axios
      .post(`${SEVER_URL}/api/users`, _data)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          router.push('/');
        } else {
          console.log(response.data);
          if (response.data.nameExist) {
            alert('This username is already exist!');
            setNameTaken(true);
          } else {
            alert('Error occured while saving data! Please try again later.');
          }
        }
      })
      .catch(({ response }) => {
        alert('Error occured while saving data! Please try again later.');
      });

    setSubmitting(false);
  };

  const getContryList = () => {
    return countryList.map((val, pos) => (
      <MenuItem value={val} key={`country-${pos}`}>
        {val}
      </MenuItem>
    ));
  };

  return (
    <>
      <Header />
      <NavBar>
        <NavbarSection style={{ '--layout': 'start' }}>
          <InputContainer>
            <Button variant="outlined" onClick={() => router.push('/')}>
              Back
            </Button>
          </InputContainer>
        </NavbarSection>
      </NavBar>
      <Main>
        <ContainerBox>
          <WidthContainer>
            <Body>
              <Column>
                <InputContainer>
                  <Title>Add User</Title>
                  <Form onSubmit={handleSubmitForm}>
                    <TextField
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                      autoComplete="name"
                      value={data.fullName}
                      onChange={(e) =>
                        setData({ ...data, fullName: e.target.value })
                      }
                    />
                    <FormItemSpace />
                    <TextField
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={data.username}
                      onChange={(e) => {
                        setNameTaken(false);
                        setData({ ...data, username: e.target.value });
                      }}
                      helperText={
                        nameTaken
                          ? 'User name is already exit. try different one'
                          : null
                      }
                      error={nameTaken}
                    />
                    <FormItemSpace />
                    <TextField
                      id="email"
                      label="Email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                    <FormItemSpace />
                    <FormControl fullWidth>
                      <InputLabel id="user-gender-label">Gender</InputLabel>
                      <Select
                        labelId="user-gender-label"
                        id="gender"
                        value={data.gender}
                        label="Gender"
                        onChange={(e) =>
                          setData({ ...data, gender: e.target.value })
                        }
                        defaultValue={''}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                    <FormItemSpace />
                    <FormControl fullWidth>
                      <InputLabel id="user-device-label">Device</InputLabel>
                      <Select
                        labelId="user-device-label"
                        id="device"
                        value={data.device}
                        label="Device"
                        defaultValue={''}
                        onChange={(e) =>
                          setData({ ...data, device: e.target.value })
                        }
                      >
                        <MenuItem value="Desktop">Desktop</MenuItem>
                        <MenuItem value="Mobile">Mobile</MenuItem>
                        <MenuItem value="Tablet">Tablet</MenuItem>
                      </Select>
                    </FormControl>
                    <FormItemSpace />
                    <FormControl fullWidth>
                      <InputLabel id="user-country-label">Country</InputLabel>
                      <Select
                        labelId="user-country-label"
                        id="country"
                        value={data.country}
                        label="Country"
                        onChange={(e) =>
                          setData({ ...data, country: e.target.value })
                        }
                        defaultValue={''}
                      >
                        {getContryList()}
                      </Select>
                    </FormControl>

                    <FormItemSpace />
                    <FormControl fullWidth>
                      <InputLabel id="user-lastActive-label">
                        Last Active
                      </InputLabel>
                      <Select
                        labelId="user-lastActive-label"
                        id="lastActive"
                        value={data.lastActive}
                        label="Last Active"
                        defaultValue={''}
                        onChange={(e) => {
                          setData({ ...data, lastActive: e.target.value });
                        }}
                      >
                        {lastActiveDd.map((val, pos) => (
                          <MenuItem
                            value={val.value}
                            key={`last-active-option-${pos}`}
                          >
                            {val.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormItemSpace />
                    <FormControl fullWidth>
                      <TextField
                        id="totalActive"
                        type="number"
                        label="Total Active Hour"
                        value={data.totalActive}
                        onChange={(e) =>
                          setData({ ...data, totalActive: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormItemSpace />
                    <Button
                      disabled={submitting}
                      variant="contained"
                      type="submit"
                      size="large"
                    >
                      Save User
                    </Button>
                    <FormItemSpace />
                  </Form>
                </InputContainer>
              </Column>
            </Body>
          </WidthContainer>
        </ContainerBox>
      </Main>
      <Footer />
    </>
  );
}
