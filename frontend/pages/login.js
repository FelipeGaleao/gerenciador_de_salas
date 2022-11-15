import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "../store/actions/users";
import store from '../store/index';
import React from 'react'

export default function SignupPage() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    senha: Yup.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });


  const user_logado = useSelector((state) => state.user);

  const checkUserLogado = () => {
    if (user_logado.access_token != null) {
      showNotification({
        title: 'Você já está logado!',
        message: 'Agora você pode agendar salas! :)',
        color: 'teal',
        position: 'br',
      });

      Router.push('/');
    }
  }

  React.useEffect(() => {
    checkUserLogado()
  }, []);


  const users = useSelector((state) => state.users);


  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  const handleSubmit = async (values) => {
    let data;
    setVisible((v) => !v);

    const formData = new FormData();
    formData.append('username', values.email);
    formData.append('password', values.senha);


    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/users/login', {
        method: 'POST',
        body: formData
      });
      data = await response.json();
      if (response.status == 200) {
        showNotification({
          title: 'Usuário autenticado com sucesso!',
          message: 'Agora você pode agendar salas! :)',
          color: 'teal',
          position: 'br',
        });

        let user_detail = JSON.parse(data.user_detail)
        user_detail.refresh_token = data.refresh_token
        user_detail.access_token = data.access_token

        dispatch(userUpdate(user_detail));

        Router.push('/');

      }
      else {
        showNotification({
          title: 'Erro ao fazer login',
          message: "Que pena! Não foi possível fazer login. \n " + data.message,
          color: 'red',
          position: 'br',
        });
      }

    }
    catch (error) {
      console.log(error);
    }
    setVisible((v) => !v);
  };


  return (
    <Grid style={{ justifyContent: "center" }}>
      <Grid.Col md={6} sm={12}>
        <Paper shadow="xl" radius="md" p="lg" withBorder style={{ padding: "60px" }}>

          <Title order={1} style={{ color: "#495057" }}>Login</Title>
          <Text size="md">Preencha os campos para autenticar-se</Text>
          <hr style={{ color: "#495057", marginBottom: "30px", opacity: "0.2" }} />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

            <Grid>
              <LoadingOverlay visible={visible} overlayBlur={1.5} />
              <Grid.Col md={6}>
                <TextInput
                  label="Email"
                  placeholder="Digite seu email"
                  required
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col md={6}>
                <TextInput
                  label="Senha"
                  placeholder="Digite sua senha"
                  required
                  type={"password"}
                  {...form.getInputProps('senha')}
                />
              </Grid.Col>
            </Grid>

            <Group position="center" mt="xl">
              <Grid grow>
                <Grid.Col span={12}>
                  <Button onClick={(e) => Router.push('/signup')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Não tenho conta</Button>
                  <Button type="submit">Entrar</Button>
                </Grid.Col>
              </Grid>
            </Group>
          </form>
        </Paper >
      </Grid.Col>
    </Grid>
  );
}
