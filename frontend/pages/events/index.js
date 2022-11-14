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
import { TableSort } from '../events/components/table';

export default function RoomsIndexPage() {
  const user_logado = useSelector((state) => state.user);
  let [events, setEvents] = useState([]);
  const getCourses = async () => {
    try {
      await axios.get('http://localhost:8000/api/events', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user_logado.access_token
        }
      })
        .then(response => {
          setEvents(response.data)
          console.log(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getCourses();
  }, []);


  return (
    <Container size="xl">
      <Grid>
        <Grid.Col md={12}>
          <Paper shadow="lg" radius="md" style={{ "padding": "1.5%" }}>
            <Grid grow>
              <Grid.Col md={9} style={{ "paddingLeft": "30px" }}>
                <Title style={{ "fontWeight": "600" }}>Eventos</Title>
                <Title order={4}>Lista de eventos cadastrados</Title>
              </Grid.Col>
              <Grid.Col md={3}>
                <Button color="blue" onClick={(e) => Router.push('/events/create')}>
                  Cadastrar um novo evento
                </Button>
              </Grid.Col>
            </Grid>
            <Grid.Col md={12}>
              {events.length > 0 ? (
                <TableSort data={events} />
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