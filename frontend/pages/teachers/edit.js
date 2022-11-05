import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, Textarea, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification, Checkbox, Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import App from 'next/app';
import { useRouter } from 'next/router'

export default function RoomsEditPage() {
    const user_logado = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);

    let teacher_id = useRouter().query.teacher_id ? useRouter().query.teacher_id : null;

    const schema = Yup.object().shape({
        nome: Yup.string().min(2, 'Seu nome deve ter pelo menos 2 caracteres').required('Nome do professor é obrigatório'),
        sobrenome: Yup.string().min(2, 'Seu sobrenome deve ter pelo menos 2 caracteres').required('Sobrenome do professor é obrigatório'),
        siafi: Yup.number().min(1, 'O siafi deve ser maior que 0').required('O siafi é obrigatório'),
        lotacao: Yup.string().min(2, 'A lotação deve ter pelo menos 2 caracteres').required('A lotação é obrigatória'),
    });

    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
        },
    });

    const getTeacherById = async (teacher_id) => {
        const response = await fetch('http://localhost:8000/api/teachers/get_teacher_by_id?teacher_id=' + teacher_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
        });
        const data = await response.json();
        if (data.error) {
            showNotification({
                title: 'Erro ao buscar sala!',
                message: data.error,
                color: 'red',
                position: 'br',
            });
        } else {
            form.setValues(data);
        }
    }

    const handleSubmit = async (values) => {
        setVisible((v) => !v);

        const teacherToUpdate = {
                'nome': values.nome,
                'sobrenome': values.sobrenome,
                'siafi': values.siafi,
                'lotacao': values.lotacao,
                'teacher_id': teacher_id
        };

        const response = await fetch('http://localhost:8000/api/teachers', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
            body: JSON.stringify(teacherToUpdate)
        });
        const data = await response.json();
        setVisible((v) => !v);
        if (data.error) {
            showNotification({
                title: 'Erro ao criar sala!',
                message: data.error,
                color: 'red',
                position: 'br',
            });
        } else {
            showNotification({
                title: 'Sala atualizada com sucesso!',
                message: data.message + ':)',
                color: 'teal',
                position: 'br',
            });
            Router.push('/teachers');
        }
    }

    useEffect(() => {
        if (teacher_id) {
            getTeacherById(teacher_id);
        }
    }, [teacher_id]);
    return (
        <Container size="xl">
        <Grid>
            <Grid.Col md={12}>
                <Paper shadow="lg" radius="md" p="xl">
                    <Grid grow>
                        <Grid.Col md={10}>
                            <Title>Professores</Title>
                            <Title order={4}>Editando um novo professor</Title>
                        </Grid.Col>
                        <hr></hr>
                    </Grid>
                    <Grid.Col md={12}>
                        <hr style={{ color: "#495057", marginBottom: "30px", opacity: "0.2" }} />
                        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                            <Grid>
                                <LoadingOverlay visible={visible} overlayBlur={1.5} />

                                <Grid.Col md={6} sm={12}> <TextInput
                                    withAsterisk
                                    label="Nome"
                                    placeholder="Ex.:  Francisco Morato"
                                    {...form.getInputProps('nome')}
                                />
                                </Grid.Col>
                                <Grid.Col md={6} sm={12}> <TextInput
                                    withAsterisk
                                    label="Sobrenome"
                                    placeholder="Ex.:  Galvão"
                                    {...form.getInputProps('sobrenome')}
                                />
                                </Grid.Col>
                                <Grid.Col md={6} sm={12}> <TextInput
                                    withAsterisk
                                    label="Lotação"
                                    placeholder="Ex.: Faculdade de Computacao / UFMS"
                                    {...form.getInputProps('lotacao')}
                                />
                                </Grid.Col>
                                <Grid.Col md={6} sm={12}> <TextInput
                                    withAsterisk
                                    type={"number"}
                                    label="SIAFI"
                                    placeholder="Ex.: 012345"
                                    {...form.getInputProps('siafi')}
                                />
                                </Grid.Col>
                

                            </Grid>

                            <Group position="right" mt="xl">
                                <Button onClick={(e) => Router.push('/teachers/')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Voltar</Button>
                                <Button type="submit">Cadastrar</Button>
                            </Group>
                        </form>
                    </Grid.Col>
                </Paper>
            </Grid.Col>
        </Grid>
    </Container>
    );
}