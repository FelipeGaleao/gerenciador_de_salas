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
import { TableSort } from '../courses/components/table';

export default function RoomsIndexPage() {
  const user_logado = useSelector((state) => state.user);
  let [teachers, setTeachers] = useState([]);
  const getCourses = async () => {
    try {
      await axios.get('http://localhost:8000/api/courses', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user_logado.access_token
        }
      })
        .then(response => {
          setTeachers(response.data)
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
                <Title style={{ "fontWeight": "600" }}>Disciplinas</Title>
                <Title order={4}>Lista de disciplinas cadastradas</Title>
              </Grid.Col>
              <Grid.Col md={3}>
                <Button color="blue" onClick={(e) => Router.push('/courses/create')}>
                  Cadastrar uma nova disciplina
                </Button>
              </Grid.Col>
            </Grid>
            <Grid.Col md={12}>
              {teachers.length > 0 ? (
                <TableSort data={teachers} />
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