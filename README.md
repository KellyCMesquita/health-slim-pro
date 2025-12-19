# 🏥 Health Slim Pro

> Plataforma completa para acompanhamento de usuários de medicações para emagrecimento (Ozempic, Semaglutida, Wegovy, Saxenda, Mounjaro, Tirzepatida)

![Next.js](https://img.shields.io/badge/Next.js-15.4.8-black)
![React](https://img.shields.io/badge/React-19.0.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Integrated-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-purple)

---

## 🎯 Sobre o Projeto

**Health Slim Pro** é uma plataforma web completa desenvolvida para pessoas que utilizam canetas emagrecedoras. O sistema oferece:

- 📊 **Dashboard Profissional** - Acompanhamento completo de métricas
- 💊 **Controle de Medicação** - Registro e lembretes inteligentes
- ⚖️ **Monitoramento de Peso** - Histórico e gráficos de evolução
- 🩺 **Registro de Sintomas** - Acompanhamento de efeitos colaterais
- 💪 **Treinos Personalizados por IA** - Planos adaptados ao seu perfil
- 🍎 **Dietas Personalizadas por IA** - Nutrição especializada
- 💬 **Chat com Coach IA** - Suporte 24/7 especializado
- 💳 **Sistema de Pagamentos** - Assinaturas Premium
- 🔒 **Segurança Total** - RLS e políticas de segurança no Supabase

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.4.8** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização moderna
- **Shadcn/ui** - Componentes UI profissionais
- **Lucide Icons** - Ícones modernos

### Backend
- **Next.js API Routes** - Backend serverless
- **Supabase** - Database PostgreSQL + Auth + Storage
- **OpenAI GPT-4o** - Inteligência Artificial
- **JWT** - Autenticação segura
- **bcryptjs** - Criptografia de senhas

### Infraestrutura
- **Vercel** - Deploy e hosting
- **Supabase Cloud** - Database e storage
- **OpenAI API** - Processamento de IA

---

## 📁 Estrutura do Projeto

```
health-slim-pro/
├── src/
│   ├── app/
│   │   ├── api/                    # Backend APIs
│   │   │   ├── auth/              # Autenticação
│   │   │   ├── quiz/              # Quiz inicial
│   │   │   ├── medications/       # Medicações
│   │   │   ├── weight/            # Peso
│   │   │   ├── symptoms/          # Sintomas
│   │   │   ├── plans/             # Planos IA
│   │   │   ├── chat/              # Chat IA
│   │   │   ├── payments/          # Pagamentos
│   │   │   └── users/             # Usuários
│   │   ├── dashboard/             # Dashboard principal
│   │   ├── login/                 # Página de login
│   │   ├── register/              # Página de registro
│   │   ├── profile/               # Perfil do usuário
│   │   ├── chat-ia/               # Chat com IA
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── ui/                    # Componentes Shadcn
│   │   └── custom/                # Componentes customizados
│   ├── contexts/
│   │   └── AuthContext.tsx        # Context de autenticação
│   ├── lib/
│   │   ├── supabase.ts            # Cliente Supabase
│   │   ├── auth.ts                # Helpers de auth
│   │   └── utils.ts               # Utilitários
│   └── types/
│       └── index.ts               # Tipos TypeScript
├── supabase-setup.sql             # SQL completo do banco
├── API-DOCUMENTATION.md           # Documentação da API
└── README.md                      # Este arquivo
```

---

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Conta na OpenAI (API Key)

### 2. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/health-slim-pro.git
cd health-slim-pro
```

### 3. Instale as Dependências

```bash
npm install
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_supabase

# OpenAI
OPENAI_API_KEY=sua_chave_openai

# JWT
JWT_SECRET=seu_secret_jwt_aleatorio
```

### 5. Configure o Banco de Dados

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Crie um novo projeto
3. Vá em **SQL Editor**
4. Execute o arquivo `supabase-setup.sql` completo
5. Verifique se todas as 13 tabelas foram criadas

### 6. Execute o Projeto

```bash
npm run dev
```

Acesse: `http://localhost:3001`

---

## 🗄️ Banco de Dados

### Tabelas Criadas (13 total)

1. **users** - Usuários do sistema
2. **quiz_results** - Resultados do quiz inicial
3. **medication_logs** - Registro de medicações
4. **medication_reminders** - Lembretes de dose
5. **weight_logs** - Histórico de peso
6. **meal_logs** - Registro de refeições
7. **symptoms_logs** - Registro de sintomas
8. **workout_logs** - Registro de treinos
9. **plans_training** - Planos de treino IA
10. **plans_diet** - Planos alimentares IA
11. **chat_messages** - Histórico de chat
12. **payments** - Pagamentos
13. **subscriptions** - Assinaturas

### Segurança

- ✅ **RLS ativado** em todas as tabelas
- ✅ **Policies configuradas** para cada usuário acessar apenas seus dados
- ✅ **CASCADE DELETE** em relacionamentos
- ✅ **Validações** em todas as APIs

---

## 🔌 APIs Disponíveis

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário

### Quiz
- `POST /api/quiz/save` - Salvar quiz inicial

### Medicações
- `POST /api/medications/log` - Registrar medicação
- `GET /api/medications/log` - Listar medicações
- `POST /api/medications/reminder` - Criar lembrete
- `GET /api/medications/reminder` - Listar lembretes
- `PATCH /api/medications/reminder` - Atualizar lembrete

### Peso
- `POST /api/weight/log` - Registrar peso
- `GET /api/weight/log` - Listar histórico

### Sintomas
- `POST /api/symptoms/log` - Registrar sintoma
- `GET /api/symptoms/log` - Listar sintomas

### Planos IA
- `POST /api/plans/generate-training` - Gerar treino IA
- `GET /api/plans/generate-training` - Listar treinos
- `POST /api/plans/generate-diet` - Gerar dieta IA
- `GET /api/plans/generate-diet` - Listar dietas

### Chat IA
- `POST /api/chat/send` - Enviar mensagem
- `GET /api/chat/send` - Histórico de chat

### Pagamentos
- `POST /api/payments/create` - Criar pagamento
- `POST /api/payments/verify` - Verificar pagamento
- `GET /api/payments/verify` - Consultar pagamento

### Usuários
- `GET /api/users/profile` - Obter perfil
- `PATCH /api/users/profile` - Atualizar perfil

📖 **Documentação completa:** Veja `API-DOCUMENTATION.md`

---

## 🎨 Funcionalidades Principais

### 1. Dashboard Inteligente
- Visão geral de todas as métricas
- Gráficos de evolução
- Ações rápidas
- Status Premium

### 2. Controle de Medicação
- Registro de aplicações
- Lembretes personalizados
- Histórico completo
- Alertas inteligentes

### 3. Monitoramento de Peso
- Registro diário
- Gráficos de evolução
- Cálculo de IMC
- Metas personalizadas

### 4. Planos Personalizados por IA
- **Treinos:** Exercícios adaptados ao seu nível e medicação
- **Dietas:** Nutrição especializada considerando efeitos colaterais
- **Ajustes automáticos:** IA aprende com seu progresso

### 5. Chat com Coach IA
- Suporte 24/7
- Especializado em medicações para emagrecimento
- Histórico de conversas
- Respostas contextualizadas

### 6. Sistema Premium
- Planos ilimitados
- Chat sem limites
- Relatórios avançados
- Suporte prioritário

---

## 🔐 Segurança

- **Autenticação JWT** - Tokens seguros
- **Senhas criptografadas** - bcryptjs
- **RLS no Supabase** - Isolamento de dados
- **Validações** - Em todas as APIs
- **HTTPS** - Comunicação segura

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático!

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

---

## 📊 Roadmap

- [ ] App Mobile (React Native)
- [ ] Integração com wearables
- [ ] Comunidade de usuários
- [ ] Gamificação completa
- [ ] Relatórios para médicos
- [ ] Integração com farmácias
- [ ] Modo offline
- [ ] Notificações push

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar pessoas em sua jornada de emagrecimento saudável.

---

## 📞 Suporte

- 📧 Email: suporte@healthslimpro.com
- 💬 Chat: Disponível no app
- 📚 Docs: `API-DOCUMENTATION.md`

---

## ⭐ Agradecimentos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [OpenAI](https://openai.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---

**Health Slim Pro** - Sua jornada de emagrecimento com tecnologia e inteligência artificial 🚀
