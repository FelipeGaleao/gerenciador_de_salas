import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, Textarea, TextInput, Button, Box, Select, Group, Paper, Title, Text, LoadingOverlay, Notification, Checkbox, Container } from '@mantine/core';
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
    const [teachers, setTeacher] = useState([]);

    let course_id = useRouter().query.course_id ? useRouter().query.course_id : null;

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

    const getTeacherById = async (course_id) => {
        const response = await fetch('http://localhost:8000/api/courses/get_course_by_id?course_id=' + course_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
        });
        const data = await response.json();
        if (data.error) {
            showNotification({
                title: 'Erro ao buscar disciplina!',
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

        const courseToUpdate = {
            'nome': values.nome,
            'lotacao': values.lotacao,
            'curso': values.curso,
            'periodo': values.periodo,
            'qtde_alunos_matriculados': values.qtde_alunos_matriculados,
            'teacher_id': values.teacher_id,
            'course_id': course_id,
        };

        const response = await fetch('http://localhost:8000/api/courses', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
            },
            body: JSON.stringify(courseToUpdate)
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
            Router.push('/courses');
        }
    }

    useEffect(() => {
        if (course_id) {
            getTeacherById(course_id);
            getTeachers();
        }
    }, [course_id]);
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
                                    <Grid.Col md={6} sm={12}> <TextInput
                                        withAsterisk
                                        label="Faculdade"
                                        placeholder="Ex.:  FACOM/UFMS"
                                        {...form.getInputProps('lotacao_faculdade')}
                                    />
                                    </Grid.Col>
                                    <Grid.Col md={6} sm={12}><Select
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
                                    <Grid.Col md={6} sm={12}> <TextInput
                                        withAsterisk
                                        type={"number"}
                                        label="Qtde. de alunos matriculados"
                                        placeholder="Ex.: 45"
                                        {...form.getInputProps('qtde_alunos_matriculados')}
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