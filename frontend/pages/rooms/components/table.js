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


export default function TableSort({ data }) {
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

  const handleDeleteRoom = async (id) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api/rooms/delete_room_by_id?room_id=' + id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user_logado.access_token
      },
  });
    const data = await response.json();
    if(data.error){
      showNotification({
        title: 'Erro ao deletar sala!',
        message: data.error,
        color: 'red',
        position: 'br',
    });
    }else{
      showNotification({
        title: 'Sala deletada com sucesso!',
        message: 'Sala deletada com sucesso!',
        color: 'green',
        position: 'br',
    });
    Router.push('/rooms');
    }
  }

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.nome_sala}</td>
      <td>{row.lotacao}</td>
      <td>{row.agendavel ? 'Sim' : 'Não'}</td>
      <td>{row.criado_por}</td>
      <td>{row.dt_criacao}</td>
      <td>{row.atualizado_por ? row.atualizado_por : '-'}</td>
      <td>{row.dt_atualizacao ? row.dt_atualizacao : '-'}</td>
      <td>
        <Grid grow>
          <Grid.Col>
            <Button size="xs" variant="primary" onClick={() => {
              Router.push({
                pathname: '/rooms/edit',
                query: { room_id: row.id },
              })
            }} >
              Editar
            </Button>
          </Grid.Col>
          <Grid.Col>
            <Button size="xs" color="red" onClick={(e) => { handleDeleteRoom(row.id) }}>
              Excluir
            </Button>
          </Grid.Col>
        </Grid>
      </td>
    </tr >
  ));

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
              sorted={sortBy === 'nome_sala'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nome_sala')}
            >
              Nome da Sala
            </Th>
            <Th
              sorted={sortBy === 'lotacao'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('lotacao')}
            >
              Lotação
            </Th>
            <Th
              sorted={sortBy === 'agendavel'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('agendavel')}
            >
              Agendável
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
              Criado Em
            </Th>
            <Th
              sorted={sortBy === 'atualizado_por'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('atualizado_por')}
            >
              Atualizado Por
            </Th>
            <Th
              sorted={sortBy === 'dt_atualizacao'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dt_atualizacao')}
            >
              Atualizado Em
            </Th>
            <th />
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
