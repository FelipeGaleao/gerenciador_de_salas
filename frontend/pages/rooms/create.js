import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, Textarea, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification, Checkbox } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import App from 'next/app';

export default function RoomsIndexPage() {
    const user_logado = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    let [rooms, setRooms] = useState([]);

    const schema = Yup.object().shape({
        nome_sala: Yup.string().min(2, 'Seu nome deve ter pelo menos 2 caracteres').required('Nome da sala é obrigatório'),
        lotacao: Yup.number().min(1, 'A lotação deve ser maior que 0').required('A lotação é obrigatória'),
    });

    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
        },
    });

    const handleSubmit = async (values) => {
        setVisible((v) => !v);

        const room_to_create = {
            'agendavel': values.agendavel ? true : false,
            'observacao': values.observacao ? values.observacao : null,
            'nome_sala': values.nome_sala,
            'lotacao': values.lotacao,
        };

        const response = await fetch('http://localhost:8000/api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
            body: JSON.stringify(room_to_create)
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
                title: 'Sala criada com sucesso!',
                message: data.message + ':)',
                color: 'teal',
                position: 'br',
            });
            Router.push('/rooms');
        }
    }

    return (
        <Grid>
            <Grid.Col md={12}>
                <Paper shadow="lg" radius="md" p="xl">
                    <Grid grow>
                        <Grid.Col md={10}>
                            <Title>Salas</Title>
                            <Title order={4}>Adicionando uma nova sala</Title>
                        </Grid.Col>
                        <hr></hr>
                    </Grid>
                    <Grid.Col md={12}>
                        <hr style={{ color: "#495057", marginBottom: "30px", opacity: "0.2" }} />
                        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                            <Grid>
                                <LoadingOverlay visible={visible} overlayBlur={1.5} />

                                <Grid.Col md={12} sm={12}> <TextInput
                                    withAsterisk
                                    label="Nome da sala"
                                    placeholder="Ex.: Sala 1"
                                    {...form.getInputProps('nome_sala')}
                                />
                                </Grid.Col>
                                <Grid.Col md={4} sm={12}>
                                    <TextInput
                                        withAsterisk
                                        label="Lotação"
                                        type={"number"}
                                        min={0}
                                        max={200}
                                        placeholder="Ex.: 10"
                                        {...form.getInputProps('lotacao')}
                                    />
                                </Grid.Col>
                                <Grid.Col md={4} sm={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px" }}>
                                    <Checkbox
                                        label="Esta sala está disponível para agendamentos"
                                        size="md"
                                    />
                                </Grid.Col>
                                <Grid.Col md={12} sm={12}>
                                    <Textarea
                                        variant="filled"
                                        withAsterisk
                                        label="Observação"
                                        placeholder="Insira informações adicionais sobre a sala"
                                        {...form.getInputProps('observacao')}
                                    />
                                </Grid.Col>

                            </Grid>

                            <Group position="right" mt="xl">
                                <Button onClick={(e) => Router.push('/rooms/')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Voltar</Button>
                                <Button type="submit">Cadastrar</Button>
                            </Group>
                        </form>
                    </Grid.Col>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}