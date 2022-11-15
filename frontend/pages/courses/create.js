import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, Textarea, TextInput, Button, Box, Group, Paper, Title, Text, LoadingOverlay, Notification, Checkbox, Container, Select } from '@mantine/core';
import { DatePicker, TimeRangeInput } from '@mantine/dates';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import App from 'next/app';
import dayjs from 'dayjs';


export default function RoomsIndexPage() {
    const user_logado = useSelector((state) => state.user);
    const [teachers, setTeacher] = useState([]);
    const [visible, setVisible] = useState(false);
    const now = new Date();
    const then = dayjs(now).add(30, 'minutes').toDate();
    const [hrEvento, setHrEvento] = useState([now, then]);

    const schema = Yup.object().shape({
        nome: Yup.string().min(2, 'O nome da disciplina deve ter no mínimo 2 caracteres').max(50, 'O nome da disciplina deve ter no máximo 50 caracteres').required('O nome da disciplina é obrigatório'),
        lotacao_faculdade: Yup.string().min(2, 'A lotação da faculdade deve ter no mínimo 2 caracteres').max(50, 'A lotação da faculdade deve ter no máximo 50 caracteres').required('A lotação da faculdade é obrigatória'),
        curso: Yup.string().min(2, 'O curso deve ter no mínimo 2 caracteres').max(50, 'O curso deve ter no máximo 50 caracteres').required('O curso é obrigatório'),
        periodo: Yup.string().min(2, 'O período deve ter no mínimo 2 caracteres').max(50, 'O período deve ter no máximo 50 caracteres').required('O período é obrigatório'),
        qtde_alunos_matriculados: Yup.number().min(2, 'A quantidade de alunos matriculados deve ter no mínimo 2 caracteres').max(200, 'A quantidade de alunos matriculados deve ter no máximo 200 caracteres').required('A quantidade de alunos matriculados é obrigatória'),
        teacher_id: Yup.number().required('O professor é obrigatório'),
    });

    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
        },
    });

    const getTeachers = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/teachers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.token,
            },
        });

        const data = await response.json();
        setTeacher(data);
    }

    const handleSubmit = async (values) => {
        setVisible((v) => !v);

        const courseToCreate = {
            'nome': values.nome,
            'lotacao_faculdade': values.lotacao_faculdade,
            'curso': values.curso,
            'periodo': values.periodo,
            'qtde_alunos_matriculados': values.qtde_alunos_matriculados,
            'dt_inicio_disciplina': values.dt_inicio_disciplina,
            'dt_fim_disciplina': values.dt_fim_disciplina,
            'hr_inicio_disciplina': (hrEvento[0].getHours()<10?'0':'') + hrEvento[0].getHours() + ':' + (hrEvento[0].getMinutes()<10?'0':'') + hrEvento[0].getMinutes(),
            'hr_fim_disciplina': (hrEvento[1].getHours()<10?'0':'') + hrEvento[1].getHours() + ':' + (hrEvento[1].getMinutes()<10?'0':'') + hrEvento[1].getMinutes(),
            'teacher_id': values.teacher_id,
            'segunda_aula': values.segunda_aula,
            'terca_aula': values.terca_aula,
            'quarta_aula': values.quarta_aula,
            'quinta_aula': values.quinta_aula,
            'sexta_aula': values.sexta_aula,
            'sabado_aula': values.sabado_aula,
            'domingo_aula': values.domingo_aula,
        };

        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
            body: JSON.stringify(courseToCreate)
        });
        const data = await response.json();
        setVisible((v) => !v);
        if (data.error) {
            showNotification({
                title: 'Erro ao criar disciplina!',
                message: data.error,
                color: 'red',
                position: 'br',
            });
        } else {
            showNotification({
                title: 'Disciplina criada com sucesso!',
                message: data.message + ':)',
                color: 'teal',
                position: 'br',
            });
            Router.push('/courses');
        }

    }

    const getTeachersSelect = () => {
        let list_teachers = [];
        teachers.map((teacher) => {
            list_teachers.push({ label: teacher.nome + ' ' + teacher.sobrenome, value: teacher.id });
        });
        return list_teachers;
    }

    useEffect(() => {
        getTeachers();
    }, []);


    //     "qtde_alunos_matriculados": 10,
    //   "dt_inicio_disciplina": "2022-11-15T21:07:15.564888",
    //   "dt_fim_disciplina": "2022-11-15T21:07:15.564905",
    //   "hr_inicio_disciplina": "08:00:00",
    //   "hr_fim_disciplina": "09:00:00",
    //  "segunda_aula": true,
    //   "terca_aula": true,
    //   "quarta_aula": true,
    //   "quinta_aula": true,
    //   "sexta_aula": true,
    //   "sabado_aula": true,
    //   "domingo_aula": true,


    return (
        <Container size="xl">
            <Grid>
                <Grid.Col md={12}>
                    <Paper shadow="lg" radius="md" p="xl">
                        <Grid grow>
                            <Grid.Col md={10}>
                                <Title>Disciplinas</Title>
                                <Title order={4}>Adicionando uma nova disciplina</Title>
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
                                        placeholder="Ex.:  Estrutura de Dados"
                                        {...form.getInputProps('nome')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={4} sm={12}> <TextInput
                                        withAsterisk
                                        label="Faculdade"
                                        placeholder="Ex.:  FACOM/UFMS"
                                        {...form.getInputProps('lotacao_faculdade')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={4} sm={12}><Select
                                        label="Professor"
                                        placeholder="Selecione o professor"
                                        {...form.getInputProps('teacher_id')}
                                        searchable={true}
                                        data={getTeachersSelect()}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={6} sm={12}> <Select
                                        label="Período"
                                        placeholder="Selecione o período"
                                        {...form.getInputProps('periodo')}
                                        searchable={true}
                                        data={[
                                            { label: '2021.2', value: '2021.2' },
                                            { label: '2022.1', value: '2022.1' },
                                        ]}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={6} sm={12}><Select
                                        label="Selecione o curso"
                                        placeholder="Selecione o curso"
                                        {...form.getInputProps('curso')}
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
                                    <Grid.Col md={3} sm={12}><DatePicker
                                        label="Data de início"
                                        placeholder="Selecione a data de início"
                                        {...form.getInputProps('dt_inicio_disciplina')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12}><DatePicker
                                        label="Data de término"
                                        placeholder="Selecione a data de término"
                                        {...form.getInputProps('dt_fim_disciplina')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12}>
                                        <TimeRangeInput label="Horário do evento (Inicio e Fim)" value={hrEvento} onChange={setHrEvento} clearable />
                                    </Grid.Col>

                                    <hr />
                                    <Grid.Col md={12} sm={12} style={{marginBottom: "20px"}}>
                                        <h3>Selecione os dias de aula</h3>
                                    </Grid.Col>
                                    <Grid.Col md={3} sm={12} style={{marginTop: "40px"}}> <TextInput
                                        withAsterisk
                                        type={"number"}
                                        label="Qtde. de alunos matriculados"
                                        placeholder="Ex.: 45"
                                        {...form.getInputProps('qtde_alunos_matriculados')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Segunda"
                                        {...form.getInputProps('segunda_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Terça"
                                        {...form.getInputProps('terca_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Quarta"
                                        {...form.getInputProps('quarta_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Quinta"
                                        {...form.getInputProps('quinta_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Sexta"
                                        {...form.getInputProps('sexta_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Sábado"
                                        {...form.getInputProps('sabado_aula')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={1} sm={12}><Checkbox
                                        label="Domingo"
                                        {...form.getInputProps('domingo_aula')}
                                    />
                                    </Grid.Col>
                                </Grid>

                                <Group position="right" mt="xl">
                                    <Button onClick={(e) => Router.push('/courses/')} variant="outline" color="gray" style={{ marginRight: "10px" }}>Voltar</Button>
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