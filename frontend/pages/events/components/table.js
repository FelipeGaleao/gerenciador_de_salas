import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
  Grid,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconSelector, IconChevronDown, IconChevronUp, IconSearch,
} from '@tabler/icons';
import Router from 'next/router';
import { showNotification } from '@mantine/notifications';
import { useSelector, useDispatch } from "react-redux";


const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({
  children, reversed, sorted, onSort,
}) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toString().toLowerCase().trim();
  return data.filter((item) => keys(item).some((key) => (item[key] != null ? item[key].toString().toLowerCase().includes(query) : null)));
}

function sortData(
  data,
  payload,
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy].toString());
      }

      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    }),
    payload.search,
  );
}


export function TableSort({ data }) {
  const user_logado = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed: reverseSortDirection, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleDeleteEvent = async (id) => {
    const response = await fetch('http://localhost:8000/api/events/delete_event_by_id?event_id=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user_logado.access_token
      },
    });
    const data = await response.json();
    if (data.error) {
      showNotification({
        title: 'Erro ao deletar evento!',
        message: data.error,
        color: 'red',
        position: 'br',
      });
    } else {
      showNotification({
        title: 'Evento deletado com sucesso!',
        message: 'Evento deletado com sucesso!',
        color: 'green',
        position: 'br',
      });
      Router.push('/events');
    }
  }

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.nome}</td>
      <td>{row.quantidade_de_pessoas}</td>
      <td>{row.nome_curso}</td>
      <td>{row.nome_faculdade}</td>
      <td>{row.dt_inicio_evento} {row.hr_inicio_evento} - {row.dt_fim_evento} {row.hr_fim_evento}</td>
      <td>{row.criado_por}</td>
      <td>{row.dt_criacao}</td>
      <td>{row.atualizado_por ? row.atualizado_por : '-'}</td>
      <td>{row.dt_modificacao ? row.dt_modificacao : '-'}</td>
      <td>
        <Grid grow>
          <Grid.Col>
            <Button size="xs" variant="primary" onClick={() => {
              Router.push({
                pathname: '/events/edit',
                query: { event_id: row.id },
              })
            }} >
              Editar
            </Button>
          </Grid.Col>
          <Grid.Col>
            <Button size="xs" color="red" onClick={(e) => { handleDeleteEvent(row.id) }}>
              Excluir
            </Button>
          </Grid.Col>
        </Grid>
      </td>
    </tr >
  ));

  // {
  //   "id": 4,
  //   "nome": "Estrutura de Dados I",
  //   "descricao": "Aula de Estrutura de Dados I",
  //   "quantidade_de_pessoas": 10,
  //   "nome_curso": "Ciencia da Computacao",
  //   "nome_faculdade": "Faculdade de Computacao",
  //   "dt_inicio_evento": "2022-11-13T21:32:48",
  //   "dt_fim_evento": "2022-11-13T21:32:48",
  //   "hr_inicio_evento": "08:00:00",
  //   "hr_fim_evento": "10:00:00",
  //   "criado_por": 1,
  //   "atualizado_por": 1,
  //   "dt_criacao": "2022-11-13T21:33:42",
  //   "dt_modificacao": "2022-11-13T21:33:42"
  // }

  return (
    <ScrollArea>
      <TextInput
        placeholder="Digite"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              id
            </Th>
            <Th
              sorted={sortBy === 'nome'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nome')}
            >
              Nome
            </Th>
           <Th
              sorted={sortBy === 'quantidade_de_pessoas'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('quantidade_de_pessoas')}
            >
              Quantidade de Pessoas
            </Th>
            <Th
              sorted={sortBy === 'nome_curso'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nome_curso')}
            >
              Nome do Curso
            </Th>
            <Th
              sorted={sortBy === 'nome_faculdade'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nome_faculdade')}
            >
              Nome da Faculdade
            </Th>
            <Th 
              sorted={sortBy === 'dt_inicio_evento'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dt_inicio_evento')}
            >
              Data de Inicio do Evento
            </Th>
            <Th
              sorted={sortBy === 'criado_por'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('criado_por')}
            >
              Criado Por
            </Th>
            <Th
              sorted={sortBy === 'dt_criacao'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dt_criacao')}
            >
              Data de Criação
            </Th>
            <Th
              sorted={sortBy === 'atualizado_por'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('atualizado_por')}
            >
              Atualizado Por
            </Th>
            <Th 
              sorted={sortBy === 'dt_modificacao'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dt_modificacao')}
            >
              Data de Modificação
            </Th>
            <Th>Ações</Th>


          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nada encontrado
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
