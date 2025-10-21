# Documentação de Requisitos: FindAFriend API

Este documento descreve os requisitos funcionais, regras de negócio e requisitos não-funcionais para o back-end da API de adoção de animais.

---

## 1. Requisitos Funcionais (RF)

_Os Requisitos Funcionais descrevem **o que** o sistema deve fazer (as funcionalidades)._

### Módulo de Organização (ORG)

- **[RF 01]** A ORG deve poder se cadastrar na aplicação (Nome, E-mail, Senha, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 02]** A ORG deve poder se autenticar na aplicação (E-mail, Senha).
- **[RF 03]** A ORG autenticada pode acessar a aba de profile com seus dados (Nome, E-mail, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 04]** A ORG autenticada pode atualizar a aba de profile com seus dados (Nome, Endereço, Cidade, CEP, Telefone/WhatsApp).
- **[RF 05]** A ORG autenticada pode atualizar sua senha.
- **[RF 06]** A ORG autenticada pode deletar seu profile.

### Módulo de Animais (PET)

- **[RF 03]** A ORG (autenticada) deve poder cadastrar um novo PET (Nome, Descrição, Idade, Tamanho, Nível de Energia, Cidade onde está).
- **[RF 04]** O usuário (público) deve poder buscar PETs por cidade.
- **[RF 05]** O usuário (público) deve poder filtrar os PETs (listados pela cidade) por características opcionais (Idade, Tamanho, Nível de Energia).
- **[RF 06]** O usuário (público) deve poder ver os detalhes de um PET específico.

---

## 2. Regras de Negócio (RN)

_As Regras de Negócio descrevem as **restrições e lógicas** que o sistema deve seguir._

### Cadastro de ORG (Ref. RF 01)

- **[RN 01]** O e-mail da ORG deve ser único no sistema.
- **[RN 02]** A senha da ORG deve ser armazenada de forma criptografada (hash).

### Autenticação de ORG (Ref. RF 02)

- **[RN 03]** A ORG só pode se autenticar se o e-mail estiver cadastrado e a senha estiver correta.

### Cadastro de PET (Ref. RF 03)

- **[RN 04]** Apenas uma ORG autenticada pode cadastrar um PET.
- **[RN 05]** O PET deve ser, obrigatoriamente, associado à ORG que o cadastrou.

### Busca de PETs (Ref. RF 04, RF 05)

- **[RN 06]** A busca de PETs por cidade é obrigatória (o usuário _deve_ informar a cidade).
- **[RN 07]** Os filtros de características (idade, tamanho, energia) são opcionais. Se não informados, não devem ser aplicados à busca.

### Detalhes do PET (Ref. RF 06)

- **[RN 08]** Ao visualizar os detalhes de um PET, o sistema deve retornar também as informações de contato da ORG responsável por ele (especialmente o Telefone/WhatsApp para o usuário poder iniciar o contato).
- **[RN 09]** O sistema deve retornar um erro se for solicitado um PET com ID inexistente.

---

## 3. Requisitos Não-Funcionais (RNF)

_Os Requisitos Não-Funcionais descrevem **como** o sistema deve operar e seus padrões de qualidade._

- **[RNF 01]** A aplicação deve ser desenvolvida em Node.js com TypeScript.
- **[RNF 02]** A persistência de dados deve ser feita com PostgreSQL, gerenciado pelo Prisma ORM.
- **[RNF 03]** A arquitetura do sistema deve seguir os princípios SOLID (especialmente Injeção de Dependência e Separação de Responsabilidades com Casos de Uso e Repositórios).
- **[RNF 04]** A autenticação deve ser baseada em tokens JWT (JSON Web Tokens).
- **[RNF 05]** Senhas e dados sensíveis nunca devem ser retornados nas respostas da API ou armazenados em logs.
- **[RNF 06]** Todos os Casos de Uso (lógica de negócio) devem possuir testes unitários (Vitest) com cobertura de 100%.
- **[RNF 07]** A aplicação deve rodar em um ambiente containerizado (Docker) tanto em desenvolvimento quanto em produção.
- **[RNF 08]** A API deve utilizar um framework web leve e performático (ex: Fastify).
- **[RNF 09]** O código-fonte deve ser padronizado usando ESLint e Prettier (conforme configurações já definidas).
- **[RNF 10]** Todas as variáveis de ambiente devem ser gerenciadas por arquivos `.env` e validadas no início da aplicação (sugestão: usar Zod).
