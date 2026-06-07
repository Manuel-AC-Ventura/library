# Sistema de Gestão Bibliotecária — Library Manager

## 1. INTRODUÇÃO

O **Library Manager** é um sistema de informação web desenvolvido para automatizar a gestão de bibliotecas universitárias, com foco na FAU (Faculdade), permitindo o cadastro de acervo, controlo de empréstimos, gestão de utentes (estudantes) e produção de relatórios gerenciais. O sistema substitui processos manuais propensos a erros, como registos em papel ou planilhas, por uma plataforma digital centralizada com persistência em base de dados relacional e acesso via interface web responsiva.

## 2. PROBLEMÁTICA

As bibliotecas de pequeno e médio porte, nomeadamente em contextos universitários, enfrentam dificuldades na gestão do acervo e dos empréstimos. A inexistência de um sistema informatizado leva a:

- Perda de registos de empréstimos e devoluções;
- Dificuldade em verificar a disponibilidade de exemplares em tempo real;
- Ineficiência na produção de relatórios (livros mais requisitados, leitores frequentes);
- Falta de controlo sobre prazos de devolução;
- Ausência de níveis de acesso diferenciados para funcionários.

## 3. OBJETIVOS

**Objetivo Geral:** Desenvolver um sistema web de gestão bibliotecária que permita o controlo eficiente do acervo, dos utentes e dos empréstimos, com suporte a relatórios e autenticação de funcionários.

**Objetivos Específicos:**

- Implementar autenticação segura com JSON Web Tokens (JWT) e níveis de permissão (admin/staff);
- Disponibilizar operações CRUD para livros, clientes e funcionários;
- Permitir o registo e devolução de empréstimos com controlo automático de disponibilidade;
- Gerar relatórios de livros mais requisitados e leitores mais ativos;
- Garantir responsividade para acesso em dispositivos móveis e desktop;
- Realizar deploy em ambiente de produção serverless (Vercel);
- Assegurar a persistência dos dados em base de dados PostgreSQL (NeonDB em produção, local em desenvolvimento);
- Gerir stock de livros com controlo de quantidade e disponibilidade por exemplar.

## 4. METODOLOGIA

O projeto foi desenvolvido segundo uma abordagem iterativa incremental, utilizando as seguintes etapas:

1. **Levantamento de requisitos** — Identificação das necessidades funcionais e não funcionais junto ao contexto universitário.
2. **Modelação de dados** — Definição do esquema relacional com quatro entidades principais: `Staff`, `Client`, `Book`, `Loan`.
3. **Implementação** — Desenvolvimento com Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Prisma ORM.
4. **Testes** — Validação funcional dos fluxos de autenticação, CRUD e empréstimos.
5. **Deploy** — Migração de base de dados SQLite para PostgreSQL (NeonDB) e publicação na Vercel.
6. **Documentação** — Elaboração do presente documento seguindo as diretrizes da ABNT.

## 5. ARQUITETURA DO SISTEMA

### 5.1 Stack Tecnológica

| Camada          | Tecnologia                                    |
|-----------------|-----------------------------------------------|
| Frontend        | React 18, Next.js 14 (App Router), Tailwind CSS |
| Backend         | Next.js Server Actions / API Routes           |
| ORM             | Prisma 5.22.0                                 |
| Base de Dados   | PostgreSQL 16 (NeonDB produção / local dev)   |
| Autenticação    | JWT (biblioteca `jose`), bcryptjs             |
| Deploy          | Vercel (serverless functions)                 |
| Versionamento   | Git + GitHub                                  |

### 5.2 Modelo de Dados

O esquema relacional é composto por quatro tabelas:

- **Staff** — `id` (PK, SERIAL), `name`, `email` (UNIQUE), `password` (hash), `role` (admin/staff), `createdAt`, `updatedAt`
- **Client** — `id` (PK, SERIAL), `name`, `email` (UNIQUE), `identityCard` (UNIQUE), `studentId` (UNIQUE), `phone`, `createdAt`, `updatedAt`
- **Book** — `id` (PK, SERIAL), `title`, `author`, `isbn` (UNIQUE), `quantity` (integer), `coverUrl`, `createdAt`, `updatedAt`
- **Loan** — `id` (PK, SERIAL), `clientId` (FK → Client.id), `bookId` (FK → Book.id), `borrowedAt`, `dueDate`, `returnedAt`

### 5.3 Fluxo de Autenticação

1. O funcionário submete email e password no formulário de login.
2. O servidor verifica as credenciais contra o hash armazenado em base de dados (bcryptjs).
3. Em caso de sucesso, é gerado um JWT com payload `{ staffId, name, email, role }` e validade de 7 dias.
4. O token é armazenado num cookie HTTP-only (`library_session`).
5. O middleware do Next.js verifica o token em cada requisição a rotas protegidas.
6. A devolução do token pode ser feita por logout (eliminação do cookie) ou expiração.

### 5.4 Estrutura de Diretórios

```
library/
├── app/
│   ├── api/session/route.ts      # Endpoint da sessão
│   ├── books/                    # CRUD de livros
│   ├── clientes/                 # CRUD de clientes
│   ├── loans/                    # Empréstimos
│   ├── staff/                    # CRUD de funcionários
│   ├── login/                    # Página de autenticação
│   ├── reports/                  # Relatórios
│   └── layout.tsx                # Layout global com navegação
├── components/                   # Componentes reutilizáveis
├── lib/
│   ├── actions.ts                # Server Actions (livros, clientes, empréstimos)
│   ├── actions-staff.ts          # Server Actions (staff, login)
│   ├── auth.ts                   # Lógica de autenticação JWT
│   ├── prisma.ts                 # Singleton PrismaClient
│   └── types.ts                  # Tipos para relatórios
├── prisma/
│   ├── schema.prisma             # Schema do Prisma ORM
│   ├── seed.ts                   # Povoamento inicial
│   └── migrations/               # Histórico de migrações
└── middleware.ts                 # Proteção de rotas
```

### 5.5 Ambientes de Execução

O sistema suporta dois ambientes distintos:

| Ambiente   | Base de Dados                         | URL de acesso             |
|------------|---------------------------------------|---------------------------|
| Produção   | NeonDB (nuvem, PostgreSQL 16)         | https://imetro-library.vercel.app |
| Desenvolvimento | PostgreSQL local (máquina do desenvolvedor) | http://localhost:3000     |

O ficheiro `.env` contém as credenciais de produção (NeonDB), enquanto `.env.local` (ignorado pelo Git) sobrepõe as variáveis para desenvolvimento local com PostgreSQL na máquina do desenvolvedor:

```env
# .env.local — PostgreSQL local (desenvolvimento)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/library
DIRECT_URL=postgresql://postgres:postgres@localhost:5432/library
JWT_SECRET=library-jwt-secret-change-in-production
```

Para aplicar as migrações e povoar a base de dados local:

```bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### 5.6 Gestão de Stock

O modelo `Book` possui o campo `quantity` (inteiro) que representa o número total de exemplares disponíveis daquele título. A quantidade de exemplares atualmente disponíveis é calculada dinamicamente subtraindo os empréstimos ativos (sem data de devolução) da quantidade total:

```
disponível = quantity - (empréstimos ativos do título)
```

Quando um empréstimo é registado, o sistema verifica se ainda existem exemplares disponíveis (`empréstimos ativos < quantity`). Caso contrário, o empréstimo é recusado com a mensagem "Nenhum exemplar disponível". Na devolução, não é necessário atualizar o livro — a disponibilidade é recalculada automaticamente.

## 6. REQUISITOS FUNCIONAIS

| ID    | Descrição                                           | Prioridade |
|-------|------------------------------------------------------|------------|
| RF01  | O sistema deve permitir autenticação de funcionários | Alta       |
| RF02  | O sistema deve diferenciar permissões (admin/staff)  | Alta       |
| RF03  | O sistema deve permitir CRUD de livros               | Alta       |
| RF04  | O sistema deve permitir CRUD de clientes             | Alta       |
| RF05  | O sistema deve registar empréstimos de livros        | Alta       |
| RF06  | O sistema deve registar devoluções de livros         | Alta       |
| RF07  | O sistema deve controlar stock com quantidade por título | Alta    |
| RF08  | O sistema deve exibir dashboard com estatísticas     | Média      |
| RF09  | O sistema deve gerar relatórios de livros/locadores  | Média      |
| RF10  | O sistema deve permitir CRUD de funcionários (admin) | Média      |

## 7. REQUISITOS NÃO FUNCIONAIS

| ID    | Descrição                                              | Tipo           |
|-------|--------------------------------------------------------|----------------|
| RNF01 | A interface deve ser responsiva (desktop e mobile)     | Usabilidade    |
| RNF02 | As senhas devem ser armazenadas com hash (bcryptjs)    | Segurança      |
| RNF03 | A autenticação deve usar JWT com cookie HTTP-only      | Segurança      |
| RNF04 | O sistema deve ser implantado em ambiente serverless   | Infraestrutura |
| RNF05 | A base de dados deve ser relacional e remota (PostgreSQL) | Persistência |
| RNF06 | O frontend deve utilizar React com componentes reutilizáveis | Manutenibilidade |
| RNF07 | O sistema deve suportar modo claro/escuro              | UX             |
| RNF08 | As migrações de base de dados devem ser versionadas   | DevOps         |

## 8. RESULTADOS

O sistema encontra-se implantado em produção no endereço **https://imetro-library.vercel.app**, com base de dados PostgreSQL na NeonDB. Todos os fluxos principais (autenticação, CRUD de livros, CRUD de clientes com número de estudante, registo e devolução de empréstimos com controlo de stock por quantidade, dashboard e relatórios) encontram-se operacionais. O código-fonte está disponível em repositório Git privado no GitHub, com histórico de migrações versionadas via Prisma Migrate.

A aplicação permite que os funcionários da biblioteca universitária realizem a gestão completa do acervo e dos utentes de forma centralizada, segura e acessível a partir de qualquer dispositivo com conexão à internet.

---

**Nota sobre a norma ABNT:** Este texto segue parcialmente os preceitos da NBR 14724 (trabalhos académicos), NBR 10520 (citações) e NBR 6023 (referências). Para um trabalho completo, deve-se adicionar capa, folha de rosto, sumário, referências bibliográficas, apêndices (código-fonte, printscreens) e anexos conforme orientação institucional.
