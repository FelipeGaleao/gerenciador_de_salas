import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import App from 'next/app';


export default function SignupPage() {
  const [visible, setVisible] = useState(false);

  const schema = Yup.object().shape({
    nome: Yup.string().min(2, 'Seu nome deve ter pelo menos 2 caracteres').required('Nome é obrigatório'),
    sobrenome: Yup.string().min(2, 'Seu sobrenome deve ter pelo menos 2 caracteres').required('Sobrenome é obrigatório'),
    lotacao: Yup.string().min(2, 'Sua lotação deve ter pelo menos 2 caracteres').required('Lotação é obrigatória'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    senha_1: Yup.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    senha_2: Yup.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres').oneOf([Yup.ref('senha_1'), null], 'As senhas não conferem').required('Senha é obrigatória'),
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

  useEffect(() => {
    checkUserLogado();
  }, []);

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

    const user_to_create = {
      "nome": values.nome,
      "sobrenome": values.sobrenome,
      "lotacao": values.lotacao,
      "email": values.email,
      "senha": values.senha_1,
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_to_create),
      });
      data = await response.json();
      if (response.status == 200) {
        showNotification({
          title: 'Usuário criado com sucesso!',
          message: 'Agora você pode fazer login.' + data.message,
          color: 'teal',
          position: 'br',
        });

        Router.push('/login');

      }
      else {
        showNotification({
          title: 'Erro ao criar usuário',
          message: data.message,
          color: 'red',
          position: 'br',
        });
      }

    }
    catch (error) {
      console.log(error);
    }
    console.log(data)
    setVisible((v) => !v);
  };

  return (
    <Grid style={{ justifyContent: "center" }}>
      <Grid.Col md={8} sm={12}>
        <Paper shadow="xl" radius="md" p="lg" withBorder style={{ padding: "60px" }}>
          <Title order={1} style={{ color: "#495057" }}>Cadastro</Title>
          <Text size="lg">Preencha os campos abaixo para criar sua conta</Text>
          <hr style={{ color: "#495057", marginBottom: "30px", opacity: "0.2" }} />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

            <Grid>
              <LoadingOverlay visible={visible} overlayBlur={1.5} />

              <Grid.Col md={12} sm={12}> <TextInput
                withAsterisk
                label="Email"
                placeholder="ex.: maycon.mota@ufms.br"
                {...form.getInputProps('email')}
              />
              </Grid.Col>
              <Grid.Col md={4} sm={12}>
                <TextInput
                  withAsterisk
                  label="Nome"
                  placeholder="ex.: Maycon"
                  {...form.getInputProps('nome')}
                />
              </Grid.Col>
              <Grid.Col md={4} sm={12}>
                <TextInput
                  withAsterisk
                  label="Sobrenome"
                  placeholder="ex.: Mota"
                  {...form.getInputProps('sobrenome')}
                />
              </Grid.Col>
              <Grid.Col md={4} sm={12}>
                <TextInput
                  withAsterisk
                  label="Lotação"
                  placeholder="ex.: FACOM/UFMS"
                  {...form.getInputProps('lotacao')}
                />
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <TextInput
                  withAsterisk
                  label="Senha"
                  placeholder="ex.: 123456"
                  type={"password"}
                  {...form.getInputProps('senha_1')}
                />
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <TextInput
                  withAsterisk
                  label="Confirme sua senha"
                  placeholder="ex.: 123456"
                  type={"password"}
                  {...form.getInputProps('senha_2')}
                />
              </Grid.Col>
            </Grid>

            <Group position="right" mt="xl">
              <Button onClick={(e) => Router.push('/login')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Já tenho conta</Button>
              <Button type="submit">Cadastrar</Button>
            </Group>
          </form>
        </Paper >
      </Grid.Col>
    </Grid>
  );
}
