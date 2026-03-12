<div align="center">

# 🐶 Find-a-Friend API

**Conectando amigos, criando alegria, instantaneamente.**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify_5-000000?style=flat-square&logo=fastify&logoColor=white)](https://fastify.dev/)
[![Prisma](https://img.shields.io/badge/Prisma_6-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vitest](https://img.shields.io/badge/Vitest_3-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/features/actions)

</div>

---

## Sobre o Projeto

O **Find-a-Friend** é uma API construída para gerenciar plataformas de adoção de pets e organizações não governamentais (ONGs). O foco do projeto é facilitar a ponte entre animais que precisam de um lar e pessoas dispostas a adotar, fornecendo uma base de dados sólida e segura.

Desenvolvido no ecossistema moderno do **Node.js** com **Fastify v5**, o sistema foi arquitetado para ser extremamente rápido, escalável e de fácil manutenção. O projeto brilha pela sua organização interna, adotando a separação por *Casos de Uso (Use Cases)* e o padrão *Repository Pattern*, garantindo que as regras de negócio fiquem 100% isoladas de frameworks externos.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Arquitetura e Padrões](#arquitetura-e-padrões)
- [Tecnologias](#tecnologias)
- [Endpoints da API](#endpoints-da-api)
- [Como Executar Localmente](#como-executar-localmente)
- [Testes e Integração Contínua](#testes-e-integração-contínua)
- [Estrutura de Pastas](#estrutura-de-pastas)

---

## Funcionalidades

- 🔐 **Autenticação Segura:** Login de organizações (ONGs) utilizando JWT e Cookies transacionais, com gerenciamento seguro de senhas via `bcryptjs`.
- 🏢 **Gestão de Organizações:** Cadastro de ONGs com informações de contato e localização.
- 🐕 **Gerenciamento de Pets:** Cadastro de animais disponíveis para adoção, permitindo filtrar buscas por características do pet (idade, nível de energia, porte) e localização.
- ⚙️ **Automação (CI/CD):** Pipeline configurado com GitHub Actions para rodar *linters*, formatadores e toda a suíte de testes automaticamente.

---

## Arquitetura e Padrões

O projeto foi construído utilizando conceitos avançados de engenharia de software e recursos modernos do Node:

- **Use Cases:** A lógica de negócio é encapsulada em casos de uso únicos (*Single Responsibility Principle*), facilitando o entendimento e a testabilidade de cada funcionalidade.
- **Repository Pattern:** O acesso a dados (Prisma) é abstraído através de interfaces. Isso permitiu a criação de *In-Memory Repositories*, possibilitando rodar testes unitários de forma ultrarrápida sem depender de um banco de dados real.
- **Node.js Subpath Imports:** Utilização nativa do Node (`#use-cases/*`, `#repositories/*`) para importações limpas, eliminando a poluição visual de caminhos relativos longos.
- **Design Factories:** Utilização de *Factory Functions* para a instanciação de casos de uso e suas dependências.

---

## Tecnologias

| Categoria       | Tecnologia                 |
| --------------- | -------------------------- |
| Linguagem       | TypeScript                 |
| Framework Web   | Fastify v5                 |
| Banco de Dados  | PostgreSQL                 |
| ORM             | Prisma v6                  |
| Validação       | Zod                        |
| Autenticação    | `@fastify/jwt` / Cookies   |
| Testes          | Vitest / Supertest         |
| Execução Dev    | tsx                        |
| Qualidade       | ESLint / Prettier          |

---

## Endpoints da API

> **Segurança:** O acesso às rotas privadas exige autenticação (via middleware `verifyJwt`).

### Organizações (Orgs)

| Método | Rota                   | Descrição                                         | Auth |
| ------ | ---------------------- | ------------------------------------------------- | ---- |
| POST   | `/orgs`                | Cadastra uma nova organização (ONG)               | ❌   |
| POST   | `/sessions`            | Autentica a ONG e retorna o token JWT/Cookie      | ❌   |
| GET    | `/orgs/me`             | Busca o perfil da organização autenticada         | ✅   |
| PATCH  | `/orgs/me/profile`     | Atualiza os dados do perfil da organização        | ✅   |
| PATCH  | `/orgs/me/password`    | Atualiza a senha da organização                   | ✅   |
| DELETE | `/orgs/me`             | Deleta a conta da organização logada              | ✅   |

### Pets

| Método | Rota                     | Descrição                                         | Auth |
| ------ | ------------------------ | ------------------------------------------------- | ---- |
| GET    | `/pets/search`           | Busca pets disponíveis (filtros via query params) | ❌   |
| GET    | `/pets/details/:petId`   | Busca os detalhes completos de um pet específico  | ❌   |
| POST   | `/pets`                  | Registra um novo pet para adoção                  | ✅   |
| PATCH  | `/pets/:petId`           | Atualiza os dados cadastrais do pet               | ✅   |
| PATCH  | `/pets/adoption/:petId`  | Marca o status do pet como adotado                | ✅   |
| DELETE | `/pets/:petId`           | Remove o registro do pet do sistema               | ✅   |

---

## Como Executar Localmente

### Pré-requisitos
- Node.js (v20+)
- NPM
- Docker (Para subir o banco de dados)

### Passo a passo

**1. Clone o repositório:**
~~~bash
git clone https://github.com/gabriel-smartins/find-a-friend.git
cd find-a-friend
~~~

**2. Instale as dependências:**
~~~bash
npm install
~~~

**3. Configure as Variáveis de Ambiente:**
Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias.

**4. Suba o banco de dados (Container Docker):**
~~~bash
npm run dev:db:up
~~~

**5. Execute as migrations do Prisma:**
~~~bash
npm run prisma:migrate
~~~

**6. Inicie o servidor em modo de desenvolvimento:**
~~~bash
npm run dev
~~~

---

## Testes e Integração Contínua

A aplicação possui uma orquestração avançada de testes dividida em duas camadas, executadas nativamente pelo **Vitest**:

**Testes Unitários:** Validam as regras de negócio de forma isolada em milissegundos, utilizando repositórios em memória.
~~~bash
npm run test:unit
~~~

**Testes End-to-End (E2E):** Testes robustos que validam o fluxo completo (Rotas -> Controllers -> Use Cases -> Banco). A aplicação possui um script orquestrado que sobe um banco de dados temporário no Docker, aplica as migrations de teste, roda a suíte E2E via *Supertest* e derruba o container de forma limpa.
~~~bash
npm run test:e2e
~~~

**Suíte Completa (CI):** Para rodar todos os testes (Unitários e E2E) em sequência, exatamente como a *pipeline* do GitHub Actions faz:
~~~bash
npm run test
~~~

---

## Estrutura de Pastas

~~~text
find-a-friend/
│
├── .github/workflows/         # Pipeline de CI/CD (GitHub Actions)
├── prisma/                    # Schemas e migrations do banco de dados
│
└── src/
    ├── env/                   # Validação de variáveis de ambiente com Zod
    ├── http/                  # Camada de apresentação (Web)
    │   ├── controllers/       # Controladores Fastify de Pets e Orgs
    │   └── middlewares/       # Interceptadores (Autenticação JWT, Cookies)
    │
    ├── lib/                   # Configuração de bibliotecas externas
    │
    ├── repositories/          # Contratos (Interfaces) de acesso a dados
    │   ├── in-memory/         # Repositórios falsos para testes unitários
    │   └── prisma/            # Implementações reais conectadas ao PostgreSQL
    │
    ├── use-cases/             # Regras de Negócio (Core da aplicação)
    │   ├── errors/            # Exceções personalizadas de domínio
    │   ├── orgs/              # Casos de uso de Organizações
    │   └── pets/              # Casos de uso de Pets
    │
    ├── app.ts                 # Configuração central do Fastify
    └── server.ts              # Entry-point (Start do servidor)
~~~

---

<div align="center">

Desenvolvido por Gabriel. Focado em arquitetura limpa, alta cobertura de testes e performance Node.js.

</div>
