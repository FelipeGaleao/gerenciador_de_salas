import { Grid, Paper, Title, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableSort } from '../../components/table'
import { useSelector, useDispatch } from "react-redux";

const data = [
    {
      "name": "Athena Weissnat",
      "company": "Little - Rippin",
      "email": "Elouise.Prohaska@yahoo.com"
    },
    {
      "name": "Deangelo Runolfsson",
      "company": "Greenfelder - Krajcik",
      "email": "Kadin_Trantow87@yahoo.com"
    },
    {
      "name": "Danny Carter",
      "company": "Kohler and Sons",
      "email": "Marina3@hotmail.com"
    },
    {
      "name": "Trace Tremblay PhD",
      "company": "Crona, Aufderhar and Senger",
      "email": "Antonina.Pouros@yahoo.com"
    },
    {
      "name": "Derek Dibbert",
      "company": "Gottlieb LLC",
      "email": "Abagail29@hotmail.com"
    },
    {
      "name": "Viola Bernhard",
      "company": "Funk, Rohan and Kreiger",
      "email": "Jamie23@hotmail.com"
    },
    {
      "name": "Austin Jacobi",
      "company": "Botsford - Corwin",
      "email": "Genesis42@yahoo.com"
    },
    {
      "name": "Hershel Mosciski",
      "company": "Okuneva, Farrell and Kilback",
      "email": "Idella.Stehr28@yahoo.com"
    },
    {
      "name": "Mylene Ebert",
      "company": "Kirlin and Sons",
      "email": "Hildegard17@hotmail.com"
    },
    {
      "name": "Lou Trantow",
      "company": "Parisian - Lemke",
      "email": "Hillard.Barrows1@hotmail.com"
    },
    {
      "name": "Dariana Weimann",
      "company": "Schowalter - Donnelly",
      "email": "Colleen80@gmail.com"
    },
    {
      "name": "Dr. Christy Herman",
      "company": "VonRueden - Labadie",
      "email": "Lilyan98@gmail.com"
    },
    {
      "name": "Katelin Schuster",
      "company": "Jacobson - Smitham",
      "email": "Erich_Brekke76@gmail.com"
    },
    {
      "name": "Melyna Macejkovic",
      "company": "Schuster LLC",
      "email": "Kylee4@yahoo.com"
    },
    {
      "name": "Pinkie Rice",
      "company": "Wolf, Trantow and Zulauf",
      "email": "Fiona.Kutch@hotmail.com"
    },
    {
      "name": "Brain Kreiger",
      "company": "Lueilwitz Group",
      "email": "Rico98@hotmail.com"
    }
  ]

export default function RoomsIndexPage() {
    const user_logado = useSelector((state) => state.user);
    let [rooms, setRooms] = useState([]);
    const getRooms = async () => {
        try{
        await axios.get('http://localhost:8000/api/rooms', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user_logado.access_token
    }})
        .then(response => {
            setRooms(response.data)
            console.log(response.data)
        })
        }catch(error){
            console.log(error)
        }
    }

    
    
    useEffect(() => {
        getRooms();
    }, [])

    

    
    
  return (
    <Grid>
        <Grid.Col md={8} offset={2}>
        <Paper shadow="lg" radius="md" p="xl">
            <Grid.Col md={12}>
                <Title>Salas</Title>
                <Title order={4}>Lista de espaços cadastrados</Title>
            </Grid.Col>
            <Grid.Col md={12}>
              {rooms.length > 0 ? (
                <TableSort data={rooms} />
                ) : (
                <Text>Carregando...</Text>
                )}

{/*                 
                <TableSort data={data} /> */}
            </Grid.Col>
            </Paper>
        </Grid.Col>
    </Grid>
  );
}