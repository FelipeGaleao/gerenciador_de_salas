import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
// import { TimeInput } from '@mantine/dates';
import { DatePicker, TimeRangeInput } from '@mantine/dates';
import { NumberInput, Textarea, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification, Checkbox, Container, Select } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';

import React from 'react';
import App from 'next/app';
import { useRouter } from 'next/router';

export default function RoomsEditPage() {
    const user_logado = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    const [teachers, setTeacher] = useState([]);
    const [hrEvento, setHrEvento] = useState([]);

    let event_id = useRouter().query.event_id ? useRouter().query.event_id : null;

  
    const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório'),
        descricao: Yup.string().required('Descrição é obrigatório'),
        quantidade_de_pessoas: Yup.number().required('Quantidade de pessoas é obrigatório').min(1, 'Quantidade de pessoas deve ser maior que 0'),
        nome_curso: Yup.string().required('Nome do curso é obrigatório'),
        nome_faculdade: Yup.string().required('Nome da faculdade é obrigatório'),
        dt_inicio_evento: Yup.date().required('Data de início é obrigatório'),
        dt_fim_evento: Yup.date().required('Data de fim é obrigatório'),
});

    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
        },
    });

    const getEventById = async (event_id) => {
        const response = await fetch('http://localhost:8000/api/events/get_event_by_id?event_id=' + event_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
        });
        const data = await response.json();
        if (data.error) {
            showNotification({
                title: 'Erro ao buscar evento!',
                message: data.error,
                color: 'red',
                position: 'br',
            });
        } else {
            form.setValues(data);
        }
    }

    const getTeachers = async () => {
        const response = await fetch('http://localhost:8000/api/teachers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.token,
            },
        });

        const data = await response.json();
        setTeacher(data);
    }

    const getTeachersSelect = () => {
        let list_teachers = [];
        teachers.map((teacher) => {
            list_teachers.push({ label: teacher.nome + ' ' + teacher.sobrenome, value: teacher.id });
        });
        return list_teachers;
    }

    const handleSubmit = async (values) => {
        setVisible((v) => !v);

        if(!hrEvento[0] || !hrEvento[1]){
            showNotification({
                title: 'Erro ao salvar evento!',
                message: 'Selecione um horário para o evento',
                color: 'red',
                position: 'br',
            });
            setVisible((v) => !v);
            return;
        }

        const eventToCreate = {
            'event_id': event_id,
            'nome': values.nome,
            'descricao': values.descricao,
            'nome_curso': values.nome_curso,
            'nome_faculdade': values.nome_faculdade,
            'quantidade_de_pessoas': values.quantidade_de_pessoas,
            'hr_inicio_evento': (hrEvento[0].getHours()<10?'0':'') + hrEvento[0].getHours() + ':' + (hrEvento[0].getMinutes()<10?'0':'') + hrEvento[0].getMinutes(),
            'hr_fim_evento': (hrEvento[1].getHours()<10?'0':'') + hrEvento[1].getHours() + ':' + (hrEvento[1].getMinutes()<10?'0':'') + hrEvento[1].getMinutes(),
            'dt_inicio_evento': values.dt_inicio_evento,
            'dt_fim_evento': values.dt_fim_evento,
        };

        const response = await fetch('http://localhost:8000/api/events', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
            body: JSON.stringify(eventToCreate)
        });
        const data = await response.json();
        setVisible((v) => !v);
        if (data.error) {
            showNotification({
                title: 'Erro ao criar evento!',
                message: data.error,
                color: 'red',
                position: 'br',
            });
        } else {
            showNotification({
                title: 'Evento atualizada com sucesso!',
                message: data.message + ':)',
                color: 'teal',
                position: 'br',
            });
            console.log("teste");
            Router.push('/events');
        }
    }

    useEffect(() => {
        if (event_id) {
            getEventById(event_id);
            getTeachers();
        }
    }, [event_id]);
    return (
        <Container size="xl">
            <Grid>
                <Grid.Col md={12}>
                    <Paper shadow="lg" radius="md" p="xl">
                        <Grid grow>
                            <Grid.Col md={10}>
                                <Title>Eventos</Title>
                                <Title order={4}>Editando um novo evento</Title>
                            </Grid.Col>
                            <hr></hr>
                        </Grid>
                        <Grid.Col md={12}>
                            <hr style={{ color: "#495057", marginBottom: "30px", opacity: "0.2" }} />
                            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                                <Grid>
                                    <LoadingOverlay visible={visible} overlayBlur={1.5} />

                                    <Grid.Col md={4} sm={12}> <TextInput
                                        withAsterisk
                                        label="Nome"
                                        placeholder="Ex.:  Aula de Estrutura de Dados"
                                        {...form.getInputProps('nome')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={12} sm={12}> <Textarea
                                        withAsterisk
                                        label="Descrição"
                                        placeholder="Ex.:  Aula de Estrutura de Dados I"
                                        {...form.getInputProps('descricao')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={4} sm={12}> <TextInput
                                        withAsterisk
                                        label="Quantidade de pessoas"
                                        placeholder="Ex.:  10"
                                        {...form.getInputProps('quantidade_de_pessoas')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={6} sm={12}><Select
                                        label="Selecione o curso"
                                        placeholder="Selecione o curso"
                                        {...form.getInputProps('nome_curso')}
                                        searchable={true}
                                        data={
                                            [
                                                { label: 'Ciência da Computação', value: 'Ciência da Computação' },
                                                { label: 'Sistemas de Informação', value: 'Sistemas de Informação' },
                                                { label: 'Engenharia de Software', value: 'Engenharia de Software' },
                                                { label: 'Engenharia de Computação', value: 'Engenharia de Computação' },
                                                { label: 'Engenharia de Telecomunicações', value: 'Engenharia de Telecomunicações' },
                                                { label: 'Engenharia de Controle e Automação', value: 'Engenharia de Controle e Automação' },
                                                { label: 'Engenharia Elétrica', value: 'Engenharia Elétrica' },
                                                { label: 'Engenharia Mecânica', value: 'Engenharia Mecânica' },
                                                { label: 'Engenharia Civil', value: 'Engenharia Civil' },
                                                { label: 'Engenharia de Produção', value: 'Engenharia de Produção' },
                                                { label: 'Engenharia Química', value: 'Engenharia Química' },
                                                { label: 'Engenharia de Alimentos', value: 'Engenharia de Alimentos' },

                                            ]
                                        }
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={6} sm={12}><Select
                                        label="Selecione a faculdade"
                                        placeholder="Selecione a faculdade"
                                        {...form.getInputProps('nome_faculdade')}
                                        searchable={true}
                                        data={
                                            [
                                                { label: 'Faculdade de Computação', value: 'Faculdade de Computação' },
                                                { label: 'Faculdade de Engenharia', value: 'Faculdade de Engenharia' },
                                                { label: 'Faculdade de Ciências', value: 'Faculdade de Ciências' },
                                                { label: 'Faculdade de Arquitetura', value: 'Faculdade de Arquitetura' },
                                            ]
                                        }
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12}> <DatePicker
                                        label="Data de início do evento"
                                        placeholder="Selecione a data de início do evento"
                                        {...form.getInputProps('dt_inicio_evento')}

                                    />
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12}> <DatePicker
                                        label="Data de fim do evento"
                                        placeholder="Selecione a data de fim do evento"
                                        {...form.getInputProps('dt_fim_evento')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12}> 
                                    <TimeRangeInput label="Horário do evento (Inicio e Fim)" value={hrEvento} onChange={setHrEvento} clearable />
                                    </Grid.Col>

                                </Grid>

                                <Group position="right" mt="xl">
                                    <Button onClick={(e) => Router.push('/events/')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Voltar</Button>
                                    <Button type='submit'>Cadastrar</Button>
                                </Group>
                            </form>
                        </Grid.Col>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
}