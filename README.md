# Biblioteca - Sistema de Gerenciamento

Sistema web para gerenciamento de biblioteca com Next.js 14, Prisma + SQLite e autenticação JWT.

## Funcionalidades

- **Login** — Autenticação de funcionários com sessão JWT (7 dias)
- **Dashboard** — Visão geral com estatísticas e empréstimos ativos
- **Livros** — CRUD de livros com status disponível/emprestado
- **Clientes** — Cadastro de clientes com BI e telefone
- **Empréstimos** — Registrar empréstimos com data de devolução personalizável e devoluções
- **Relatórios** — Ranking de livros mais lidos e leitores mais ativos
- **Funcionários** — CRUD de funcionários com perfis admin/staff
- **Modo escuro** — Alternância com persistência em localStorage

## Tecnologias

- **Next.js 14** (App Router, Server Actions)
- **TypeScript**
- **Tailwind CSS 3** (modo escuro com classe `dark:`)
- **Prisma 5** + SQLite
- **JWT** (jose) para sessão
- **bcryptjs** para hash de senhas
- **lucide-react** para ícones

## Estrutura

```
library/
├── app/
│   ├── books/          # CRUD de livros
│   ├── clientes/       # CRUD de clientes
│   ├── loans/          # Empréstimos e devoluções
│   ├── staff/          # CRUD de funcionários
│   ├── reports/        # Relatórios e rankings
│   ├── login/          # Página de login
│   ├── page.tsx        # Dashboard
│   └── layout.tsx      # Layout raiz (navbar, tema)
├── components/
│   ├── nav.tsx         # Barra de navegação
│   ├── page-header.tsx # Cabeçalho de página reutilizável
│   ├── empty-state.tsx # Estado vazio reutilizável
│   ├── submit-button.tsx # Botão de formulário com loading
│   ├── delete-button.tsx # Botão de exclusão com confirmação
│   ├── theme-provider.tsx # Contexto de tema (claro/escuro)
│   └── theme-toggle.tsx   # Alternador de tema
├── lib/
│   ├── auth.ts         # JWT, sessão, login, hash de senha
│   ├── actions.ts      # Server Actions (livros, clientes, empréstimos, relatórios)
│   ├── actions-staff.ts # Server Actions (login, staff CRUD)
│   ├── prisma.ts       # Singleton Prisma Client
│   └── types.ts        # Tipos compartilhados
├── prisma/
│   ├── schema.prisma   # Modelo de dados
│   └── seed.ts         # Dados de exemplo
└── middleware.ts       # Proteção de rotas (Edge Runtime)
```

## Modelo de Dados

| Modelo | Campos |
|--------|--------|
| **Staff** | id, name, email, password, role (admin/staff), createdAt, updatedAt |
| **Client** | id, name, email, identityCard (BI), phone, createdAt, updatedAt |
| **Book** | id, title, author, isbn, available, coverUrl, createdAt, updatedAt |
| **Loan** | id, clientId, bookId, borrowedAt, dueDate, returnedAt |

## Como Executar

```bash
# Instalar dependências
npm install

# Inicializar o banco de dados e popular com dados de exemplo
npx prisma db push
npx tsx prisma/seed.ts

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Credenciais de Teste

| Email | Senha | Perfil |
|-------|-------|--------|
| admin@biblioteca.com | admin123 | Administrador |
| maria@biblioteca.com | staff123 | Funcionário |
