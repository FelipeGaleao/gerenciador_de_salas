import { useState } from 'react';
import { store } from '../store/index';

import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  Transition,
  Paper
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Image from 'next/image'



const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  dropdown: {
    position: 'absolute',
    top: 135,
    left: 0,
    right: 0,
    zIndex: 100,
    borderRadius: "16px",
    marginLeft: "50px",
    overflow: 'hidden',
    width: "250px",

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
      }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.1
      ),
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      0.1
    ),
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    borderBottom: '0 !important',
  },

  tab: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: 'transparent',

    borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.1
      ),
    },

    '&[data-active]': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.1
      ),
      borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    },
  },
}));


export function Navbar() {

  const router = useRouter()


  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const user_logado = useSelector((state) => state.user);
  const data = {
    "user": {
      "name": user_logado.nome ? user_logado.nome + ' ' + user_logado.sobrenome : 'Não logado',
      "image": user_logado.nome ? "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80" : 'Não logado',
    },
    "tabs": [
      { title: 'Home', href: '/' },
      { title: 'Login', href: '/login' },
      { title: 'Cadastro', href: '/signup' },
      { title: 'Agendamentos', href: '/agendamento' },
      { title: 'Salas', href: '/rooms' },
      { title: 'Professores', href: '/teachers' },
      { title: 'Disciplinas', href: '/courses' },
      { title: 'Eventos', href: '/events' },
      { title: 'Reservas', href: '/reservations' },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    router.reload(window.location.pathname)
  }



  const tabs = data.tabs
  const user = data.user

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.title} key={tab.title} onClick={(e) => router.push(tab.href)}>
      {tab.title}
    </Tabs.Tab>
  ));

  const items_sm = tabs.map((tab) => (
    <a className={cx(classes.link)} value={tab.title} key={tab.title} onClick={(e) => router.push(tab.href)}>
      {tab.title}
    </a>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Image src="/logo_ufms.png" width="300" height="104" />



          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Opções</Menu.Label>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} onClick={(e) => handleLogout()} />}>Sair</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

      </Container>
      <Container>


        <Tabs
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          color={theme.white}
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items_sm}
            </Paper>
          )}
        </Transition>

      </Container>
    </div>
  );
}