# Documentação de Requisitos: FindAFriend API

Este documento descreve os requisitos funcionais, regras de negócio e requisitos não-funcionais para o back-end da API de adoção de animais.

---

## 1. Requisitos Funcionais (RF)

_Os Requisitos Funcionais descrevem **o que** o sistema deve fazer (as funcionalidades)._

### Módulo de Organização (ORG)

- **[RF 01]** A ORG deve poder se cadastrar na aplicação (Nome, E-mail, Senha, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 02]** A ORG deve poder se autenticar na aplicação (E-mail, Senha).
- **[RF 03]** A ORG deve poder renovar seu token de acesso (via Refresh Token).
- **[RF 04]** A ORG autenticada pode acessar a aba de profile com seus dados (Nome, E-mail, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 05]** A ORG autenticada pode atualizar a aba de profile com seus dados (Nome, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 06]** A ORG autenticada pode atualizar sua senha.
- **[RF 07]** A ORG autenticada pode deletar seu profile.

### Módulo de Animais (PET)

- **[RF 08]** A ORG (autenticada) deve poder cadastrar um novo PET (Nome, Descrição, Idade, Tamanho, Nível de Energia, Cidade onde está).
- **[RF 09]** A ORG (autenticada) deve poder listar os PETs que ela cadastrou.
- **[RF 10]** A ORG (autenticada) deve poder atualizar os dados de um PET cadastrado por ela.
- **[RF 11]** A ORG (autenticada) deve poder deletar um PET cadastrado por ela.
- **[RF 12]** O usuário (público) deve poder buscar PETs por cidade.
- **[RF 13]** O usuário (público) deve poder filtrar os PETs (listados pela cidade) por características opcionais (Idade, Tamanho, Nível de Energia).
- **[RF 14]** O usuário (público) deve poder ver os detalhes de um PET específico.

---

## 2. Regras de Negócio (RN)

_As Regras de Negócio descrevem as **restrições e lógicas** que o sistema deve seguir._

### Módulo de ORG (Ref. RF 01, 05, 06, 07)

- **[RN 01]** O e-mail da ORG deve ser único no sistema.
- **[RN 02]** A senha da ORG deve ser armazenada de forma criptografada (hash).
- **[RN 03]** A ORG só pode se autenticar se o e-mail estiver cadastrado e a senha estiver correta.
- **[RN 04]** Uma ORG só pode atualizar ou deletar seu próprio perfil. (Ex: ORG "A" não pode modificar os dados da ORG "B").

### Módulo de PET (Ref. RF 08 - RF 14)

- **[RN 05]** Apenas uma ORG autenticada pode cadastrar um PET.
- **[RN 06]** O PET deve ser, obrigatoriamente, associado à ORG que o cadastrou.
- **[RN 07]** Uma ORG só pode atualizar ou deletar um PET que ela mesma cadastrou.
- **[RN 08]** A busca de PETs por cidade é obrigatória (o usuário _deve_ informar a cidade).
- **[RN 09]** Os filtros de características (idade, tamanho, energia) são opcionais. Se não informados, não devem ser aplicados à busca.
- **[RN 10]** Ao visualizar os detalhes de um PET, o sistema deve retornar também as informações de contato da ORG responsável por ele (especialmente o Telefone/WhatsApp).
- **[RN 11]** O sistema deve retornar um erro se for solicitado um PET com ID inexistente.

---

## 3. Requisitos Não-Funcionais (RNF)

_Os Requisitos Não-Funcionais descrevem **como** o sistema deve operar e seus padrões de qualidade._

- **[RNF 01]** A aplicação deve ser desenvolvida em Node.js com TypeScript.
- **[RNF 02]** A persistência de dados deve ser feita com PostgreSQL, gerenciado pelo Prisma ORM.
- **[RNF 03]** A arquitetura do sistema deve seguir os princípios SOLID (especialmente Injeção de Dependência e Separação de Responsabilidades com Casos de Uso e Repositórios - _Clean Architecture_).
- **[RNF 04]** A autenticação deve ser baseada em tokens JWT (JSON Web Tokens), utilizando um Access Token de curta duração e um Refresh Token de longa duração.
- **[RNF 05]** O Refresh Token deve ser armazenado em um cookie `HttpOnly`, `Secure` e `SameSite` para mitigar ataques XSS.
- **[RNF 06]** Senhas e dados sensíveis nunca devem ser retornados nas respostas da API (exceto o token) ou armazenados em logs.
- **[RNF 07]** Todos os Casos de Uso (lógica de negócio) devem possuir testes unitários (Vitest) com alta cobertura.
- **[RNF 08]** Todos os endpoints da API (controllers) devem possuir testes End-to-End (E2E) com o Vitest/Supertest.
- **[RNF 09]** Os testes E2E devem rodar contra um banco de dados de teste real (PostgreSQL) e isolado, que é criado e destruído automaticamente.
- **[RNF 10]** A aplicação deve rodar em um ambiente containerizado (Docker) tanto em desenvolvimento quanto em produção.
- **[RNF 11]** A aplicação deve ter um pipeline de Integração Contínua (CI) no GitHub Actions que execute o lint, os testes unitários e os testes E2E a cada pull request.
- **[RNF 12]** A API deve utilizar o framework web Fastify.
- **[RNF 13]** O código-fonte deve ser padronizado usando ESLint e Prettier.
- **[RNF 14]** Todas as variáveis de ambiente devem ser gerenciadas por arquivos `.env` e validadas no início da aplicação usando Zod.
