# localiza_sala_backend

Aplicação backend para o projeto de trabalho final "Localiza Sala" da disciplina de Programação para Web do curso de Engenharia de Software da Universidade Federal do Mato Grosso do Sul.


## Poetry

Esse projeto utiliza o gerenciador de dependências [Poetry](https://python-poetry.org/).
Para executar o projeto, é necessário instalar o Poetry e executar o comando `poetry install` para instalar as dependências.
Utilize a sequência de comandos abaixo:


```bash
poetry install
poetry run python -m app
```

Isso fará com que o Poetry crie um ambiente virtual e instale as dependências necessárias para o projeto.
Em seguida, o comando `poetry run python -m app` executará o projeto.

Você poderá encontrar a documentação da API em `http://localhost:5000/api/docs`.


## Docker

Você pode executar o projeto utilizando o Docker.
Para isso, é necessário ter o Docker e o Docker Compose instalados.
Utilize a sequência de comandos abaixo:

```bash
docker-compose -f deploy/docker-compose.yml --project-directory . up --build
```

Caso você queira executar o projeto em modo de desenvolvimento, utilize o comando abaixo:


```bash
docker-compose -f deploy/docker-compose.yml -f deploy/docker-compose.dev.yml --project-directory . up
```

Esse comando irá executar o projeto em modo de desenvolvimento, ou seja, com o hot reload ativado.
Isso significa que, toda vez que você alterar um arquivo, o projeto será reiniciado automaticamente.

Lembre-se de toda vez que você precisar instalar uma nova dependência, você deve executar o comando `docker-compose -f deploy/docker-compose.yml --project-directory . up --build` para que a dependência seja instalada no container.


## Estrutura do projeto

```bash
$ tree "localiza_sala_backend"
app
├── conftest.py  # Arquivo de configuração do pytest
├── db  # módulo de banco de dados
│   ├── dao  # Data Access Object. Contém as classes que acessam o banco de dados
│   └── models  # Pacote com os modelos do banco de dados (classes que representam as tabelas) 
├── __main__.py  # Script de inicialização do projeto
├── services  # Pacote com os serviços do projeto (para interagir com ferramentas externas, ex. Redis)
├── settings.py  # Principal arquivo de configuração do projeto
├── static  # Conteúdo estático do projeto (ex. imagens)
├── tests  # Pacote com os testes do projeto
└── web  # Pacote que contém o servidor web, a API e a documentação da API
    ├── api  # Handler principal da API
    │   └── router.py  # Arquivo que contém as rotas da API
    ├── application.py  # Arquivo que contém a configuração da API (FastAPI)
    └── lifetime.py  # Contém as funções que são executadas no início e no fim da execução do projeto
```

## Configuração

Essa aplicação deve ser configurada utilizando variáveis de ambiente.
As variáveis de ambiente são definidas no arquivo `.env` na raiz do projeto.
Você pode utilizar o arquivo `.env.example` como base para criar o arquivo `.env`.

Todas as variáveis de ambiente devem iniciadas com o prefixo "LOCALIZA_SALA_BACKEND_".

Por exemplo, a variável de ambiente `LOCALIZA_SALA_BACKEND_DATABASE_URL` é utilizada para definir a URL de conexão com o banco de dados.


Exemplo de arquivo `.env`:

```bash
```bash
LOCALIZA_SALA_BACKEND_RELOAD="True"
LOCALIZA_SALA_BACKEND_PORT="8000"
LOCALIZA_SALA_BACKEND_ENVIRONMENT="dev"
```
s/

## Pre-commit
O Pre-commit é uma ferramenta que executa scripts antes de cada commit. 
Essa ferramenta é utilizada para executar testes e formatação de código antes de cada commit.
Para instalar o pre-commit, execute o comando abaixo:


```bash
pre-commit install
```

O pre-commit é configurado no arquivo `.pre-commit-config.yaml` na raiz do projeto.
Por padrão, o pre-commit executa os seguintes scripts:

* black (formatação de código)
* mypy (verificação de tipos)
* isort (organização de imports)
* flake8 (verificação de erros de código)
* yesqa (remoção de imports não utilizados)


Você pode ler mais sobre em: https://pre-commit.com/

## Migrações

Se você quer executar uma migração de banco de dados, execute o comando abaixo:

```bash
# Para executar uma migração específica (ex. migração 0001)

alembic upgrade "<revision_id>"

# Para executar todas as migrações pendentes (migrações que ainda não foram executadas)
alembic upgrade "head"
```

### Reverter migrações

Se você deseja reverter uma migração, basta executar o comando abaixo:

```bash
# Reverter todas as migrações para a: revision_id.
alembic downgrade <revision_id>

# Reverter tudo.
 alembic downgrade base
```

### Gerar uma nova migração

Para gerar uma migração, você deve executar o comando abaixo:

```bash
# Para gerar uma migração com detecção de alterações automáticas
alembic revision --autogenerate

# Para gerar um arquivo de migração vazio
alembic revision
```


## Executando testes

Se você deseja executar os testes dentro de um container, execute o comando abaixo:


```bash
docker-compose -f deploy/docker-compose.yml --project-directory . run --rm api pytest -vv .
docker-compose -f deploy/docker-compose.yml --project-directory . down
```

Para executar os testes sem utilizar um container, execute o comando abaixo:
Antes, crie um banco de dados chamado "localiza_sala_backend_test" no seu banco de dados local.

```
docker run -p "3306:3306" -e "MYSQL_PASSWORD=localiza_sala_backend" -e "MYSQL_USER=localiza_sala_backend" -e "MYSQL_DATABASE=localiza_sala_backend" -e ALLOW_EMPTY_PASSWORD=yes bitnami/mysql:8.0.30
```


1. Execute o comando abaixo para executar os testes:

```bash
pytest -vv .
```
