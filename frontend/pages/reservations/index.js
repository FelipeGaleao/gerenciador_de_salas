import { Grid, Paper, Card, Menu, Image, ActionIcon, Indicator, Text, Badge, Button, Group, MultiSelect } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons';
import { Calendar } from '@mantine/dates';
import { useEffect, useState } from 'react';

export default function ReservationPage() {
  const [value, setValue] = useState(null);
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    const res = await fetch('http://localhost:8000/api/reservation');
    const data = await res.json();
    console.log(data);
    setReservations(data);
  };


  useEffect(() => {
    getReservations();
  }, []);

  return (
    <Grid>
      <Grid.Col
        md={3}
        sm={12}
      >
        <Grid.Col
          md={12}
        >
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Text weight={500}>Filtrar por data de reserva  </Text>
              </Group>
            </Card.Section>

            <Calendar
              value={value}
              onChange={setValue}
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <Indicator size={6} color="red" offset={8} disabled={day !== 16}>
                    <div>{day}</div>
                  </Indicator>
                );
              }}
            />

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Filtrar
            </Button>
          </Card>


        </Grid.Col>

        <Grid.Col
          span={12}
        >
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Text weight={500}>Filtrar por Professor  </Text>
              </Group>
            </Card.Section>

            <MultiSelect
                  data={[
                    { label: 'Professor 1', value: '1' },
                    { label: 'Professor 2', value: '2' },
                    { label: 'Professor 3', value: '3' },
                  ]}
                  placeholder="Selecione um professor"
                  label="Selecione um professor"
                  radius="md"
                  fullWidth
                  mt="md"
                  searchable={true}
                  />

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Filtrar
            </Button>
          </Card>


        </Grid.Col>

        <Grid.Col
          span={12}
        >
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Text weight={500}>Filtrar por Sala  </Text>
              </Group>
            </Card.Section>

            <MultiSelect
                  data={[
                    { label: 'Sala 1', value: '1' },
                    { label: 'Sala 2', value: '2' },
                    { label: 'Sala 3', value: '3' },
                  ]}
                  placeholder="Selecione uma Sala"
                  label="Selecione uma Sala"
                  radius="md"
                  fullWidth
                  mt="md"
                  searchable={true}
                  />

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Filtrar
            </Button>
          </Card>


        </Grid.Col>

        
      </Grid.Col>
      <Grid.Col
        span={9}
      >
        <Paper>

        </Paper>

      </Grid.Col>

    </Grid>

  );
}