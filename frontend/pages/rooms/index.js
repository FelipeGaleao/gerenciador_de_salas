import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification, Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import App from 'next/app';
import axios from 'axios';
import TableSort from '../rooms/components/table';

export default function RoomsIndexPage() {
  const user_logado = useSelector((state) => state.user);
  let [rooms, setRooms] = useState([]);
  const getRooms = async () => {
    try {
      await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/rooms', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user_logado.access_token
        }
      })
        .then(response => {
          setRooms(response.data)
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getRooms();
  }, []);


  return (
    <Container size="xl">
      <Grid>
        <Grid.Col md={12}>
          <Paper shadow="lg" radius="md" style={{ "padding": "1.5%" }}>
            <Grid grow>
              <Grid.Col md={10} style={{ "paddingLeft": "30px" }}>
                <Title style={{ "fontWeight": "600" }}>Salas</Title>
                <Title order={4}>Lista de espaços cadastrados</Title>
              </Grid.Col>
              <Grid.Col md={2}>
                <Button color="blue" onClick={(e) => Router.push('/rooms/create')}>
                  Cadastrar uma nova sala
                </Button>
              </Grid.Col>
            </Grid>
            <Grid.Col md={12}>
              {rooms.length > 0 ? (
                <TableSort data={rooms} />
              ) : (
                <Text>Carregando...</Text>
              )}

              {/*                 
                  <TableSort data={data} /> */}
            </Grid.Col>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}