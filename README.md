# Site AEE — Associação Educativa Evangélica

Plataforma institucional única (Next.js 16 + Payload CMS 3) que atende a mantenedora e todas as
instituições de ensino da rede:

- **Associação Educativa Evangélica (AEE)** — mantenedora
- **Colégio Couto Magalhães** — educação básica (Anápolis e Goianésia)
- **Colégio Álvaro de Melo** — educação básica (Ceres)
- **UniEVANGÉLICA** — ensino superior
- **UNIEGO** — ensino superior
- **Faculdade Raízes** — ensino superior
- **Escola Técnica Florence Nightingale** — educação técnica

Um único CMS gerencia o conteúdo de todos os sites (multi-tenant), cada um com sua própria
identidade visual, domínio e conteúdo.

## Stack

- **Next.js 16** (App Router) para o front-end público e as rotas de API.
- **Payload CMS 3**, rodando embutido no mesmo app Next.js (painel administrativo em `/admin`).
- **Postgres** como banco de dados (`@payloadcms/db-postgres`), hospedado no **Supabase**.
- **Render** como serviço de hospedagem (Web Service Node.js).
- **Supabase Storage** (compatível com S3) para os arquivos de mídia (imagens), já que o
  sistema de arquivos do Render é efêmero.

## Estrutura de conteúdo (collections do Payload)

| Collection | Finalidade |
|---|---|
| `institutions` | Dados institucionais de cada site: nome, slug, domínio, identidade visual, missão/visão/valores, história, credenciamento MEC, campi, contato, matriz/organograma. |
| `courses` | Cursos oferecidos por cada instituição, com **status** (`oferta`, `suspenso`, `em_breve`, `encerrado`) e histórico de **atos legais do MEC** (ex: "Aut. Port. nº 497 - SERES/MEC, 23/09/2026 (sub judice)"). |
| `people` | Diretoria, coordenação de curso, NDE e corpo docente, vinculados a uma instituição e, opcionalmente, a um curso. |
| `news` | Notícias por instituição. |
| `events` | Eventos por instituição (com data, local, inscrição). |
| `slides` | Banners/carrossel da home de cada instituição. |
| `timeline-entries` | Linha do tempo histórica (usada principalmente na mantenedora). |
| `pages` | Páginas institucionais genéricas (CMS livre) por instituição. |
| `media` | Biblioteca de mídia (imagens). |
| `users` | Usuários do painel administrativo, com permissão por instituição. |

## Rotas do site público

- `/` — hub com lista de todas as instituições.
- `/[instituicao]` — home da instituição (slides, cursos em oferta, notícias, linha do tempo).
- `/[instituicao]/sobre` — página institucional aprovada pelo MEC (missão, visão, valores, história, credenciamento).
- `/[instituicao]/matriz` — estrutura organizacional / organograma / unidades.
- `/[instituicao]/coordenacao` — diretoria, coordenação de curso, NDE, docentes.
- `/[instituicao]/cursos` — listagem comercial de cursos, com filtro por status (`?status=oferta`, `suspenso`, `em_breve`, `encerrado`).
- `/[instituicao]/cursos/[slug]` — página do curso com atos legais do MEC.
- `/[instituicao]/noticias`, `/[instituicao]/noticias/[slug]`
- `/[instituicao]/eventos`, `/[instituicao]/eventos/[slug]`
- `/[instituicao]/linha-do-tempo`
- `/[instituicao]/paginas/[slug]` — páginas institucionais livres (CMS)

Painel administrativo: `/admin`. API REST: `/api/*`. GraphQL: `/api/graphql` (playground em `/api/graphql-playground`).

## Como rodar localmente

Você precisa de um Postgres rodando (local ou já o seu projeto do Supabase — ver seção abaixo).

```bash
npm install
cp .env.example .env   # edite DATABASE_URI, PAYLOAD_SECRET e MIGRATE_SECRET
npm run dev
```

Acesse `http://localhost:3000`. No primeiro acesso ao `/admin`, o Payload pedirá a criação do
usuário administrador inicial.

As tabelas do banco são criadas **automaticamente** na primeira requisição que inicializa o
Payload (hook `onInit` em `payload.config.ts`) — não é preciso rodar nenhum comando antes de usar
o site, nem em desenvolvimento nem em produção (ver `AUTO_MIGRATE` mais abaixo). Se quiser forçar
a sincronização manualmente em algum momento (ex: depois de adicionar um campo novo), o endpoint
abaixo também funciona a qualquer momento:

```bash
curl -X POST http://localhost:3000/api/migrate -H "x-migrate-secret: SEU_MIGRATE_SECRET"
```

### Popular dados de exemplo

Com o servidor rodando (dev ou produção), execute uma vez:

```bash
curl -X POST http://localhost:3000/api/seed -H "x-migrate-secret: SEU_MIGRATE_SECRET"
```

Isso cria as 7 instituições, linha do tempo da mantenedora, cursos de exemplo (incluindo o caso
"sub judice" citado no briefing), notícias, eventos e registros de coordenação/diretoria a serem
completados no painel. A operação é idempotente (não duplica dados se já existirem instituições).
**São dados fictícios/placeholder** — a ideia é começar com uma estrutura pronta para editar no
`/admin`, não para ir ao ar como está. Veja `src/app/(payload)/api/seed/route.ts`.

## Deploy: Render + Supabase

### 1. Criar o projeto no Supabase (banco de dados)

1. Acesse [supabase.com](https://supabase.com) → **New project**.
2. Escolha organização, nome do projeto (ex: `site-aee`), uma **senha do banco** forte (anote-a,
   vai precisar dela na connection string) e a região mais próxima (ex: South America / `sa-east-1`
   se disponível, ou a região norte-americana mais próxima).
3. Aguarde o provisionamento (1–2 minutos).
4. Vá em **Project Settings → Database → Connection string**.
5. Use a aba **Session pooler** (recomendado para serviços como o Render, que não garantem
   conectividade IPv6 de saída — o "Direct connection" exige IPv6). A string terá este formato:

   ```
   postgresql://postgres.xxxxxxxxxxxxxxxx:[SUA-SENHA]@aws-0-<regiao>.pooler.supabase.com:5432/postgres
   ```

   Substitua `[SUA-SENHA]` pela senha do banco definida no passo 2. Essa é a sua `DATABASE_URI`.

### 2. Criar o bucket de mídia no Supabase Storage

1. No painel do Supabase, vá em **Storage** → **New bucket**.
2. Nome: `media` (ou outro nome — você vai usar no `SUPABASE_S3_BUCKET`). Marque como **Public
   bucket** (as imagens do site precisam ser acessíveis publicamente).
3. Vá em **Project Settings → Storage → S3 Connection** (também chamado "S3 Access Keys" em
   algumas versões do painel):
   - Copie o **Endpoint** (algo como `https://<project-ref>.storage.supabase.co/storage/v1/s3` ou
     `https://<project-ref>.supabase.co/storage/v1/s3`, dependendo da versão do painel).
   - Copie a **Region** mostrada ali (ex: `sa-east-1` ou `us-east-1`).
   - Clique em **New access key** (ou "Generate new S3 credentials") para gerar um **Access Key
     ID** e uma **Secret Access Key**. Guarde os dois — a secret só é exibida uma vez.

### 3. Variáveis de ambiente

Estas são **todas** as variáveis que o projeto usa. Configure-as no Render (passo 4) e, se quiser
testar localmente contra o mesmo Supabase, também no seu `.env`:

| Variável | O que colocar |
|---|---|
| `PAYLOAD_SECRET` | Uma string aleatória longa e única (ex: gere com `openssl rand -base64 32`). Nunca reaproveite o valor de exemplo. |
| `DATABASE_URI` | A connection string do **Session pooler** do Supabase (passo 1.5). |
| `MIGRATE_SECRET` | Outra string aleatória (ex: `openssl rand -base64 32`). Protege os endpoints `/api/migrate` e `/api/seed`. |
| `SUPABASE_S3_ENDPOINT` | O endpoint S3 copiado no passo 2 (ex: `https://<project-ref>.storage.supabase.co/storage/v1/s3`). |
| `SUPABASE_S3_REGION` | A região copiada no passo 2 (ex: `sa-east-1`). |
| `SUPABASE_S3_BUCKET` | O nome do bucket criado no passo 2 (ex: `media`). |
| `SUPABASE_S3_ACCESS_KEY_ID` | O Access Key ID gerado no passo 2. |
| `SUPABASE_S3_SECRET_ACCESS_KEY` | O Secret Access Key gerado no passo 2. |
| `AUTO_MIGRATE` | Opcional. Deixe sem definir (padrão: sincronização automática ativada). Defina `false` para desativar a sincronização automática do esquema a cada boot — ver seção 5. |

Se `SUPABASE_S3_ENDPOINT` não estiver definido, o projeto usa o disco local para uploads (só
funciona bem em desenvolvimento — em produção no Render os arquivos seriam perdidos a cada deploy,
então configure essas variáveis antes de ir ao ar).

### 4. Criar o Web Service no Render

1. Acesse [render.com](https://render.com) → **New → Web Service**.
2. Conecte o repositório GitHub `fintech-pd/site-aee` e escolha a branch desejada.
3. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: ao menos o plano "Starter" (o plano gratuito "hiberna" o serviço quando
     ocioso, o que é ruim para um painel de CMS).
4. Em **Environment Variables**, adicione todas as variáveis da tabela do passo 3, mais:
   - `NODE_VERSION` = `22` (ou a versão LTS mais recente disponível) — opcional, mas recomendado
     para evitar divergências de versão do Node entre builds.
5. Clique em **Create Web Service**. O Render vai instalar as dependências e buildar o projeto.

### 5. Primeira sincronização do banco e dos dados

**As tabelas são criadas automaticamente** — não é preciso rodar nada manualmente. Assim que o
deploy termina e o serviço fica "Live", a primeira requisição que chegar ao site (ou ao `/admin`)
dispara o hook `onInit` do Payload, que sincroniza o esquema do banco no Supabase. Você pode
confirmar isso nos **Logs** do Render, procurando pela linha:

```
[AUTO_MIGRATE] Esquema do banco de dados sincronizado.
```

Se quiser já começar com a estrutura de exemplo das 7 instituições (dados fictícios, para editar
depois), rode uma vez, da sua máquina:

```bash
curl -X POST https://SEU-APP.onrender.com/api/seed \
  -H "x-migrate-secret: O_MESMO_VALOR_DE_MIGRATE_SECRET"
```

Depois disso, acesse `https://SEU-APP.onrender.com/admin` para criar o usuário administrador e
começar a editar o conteúdo real de cada instituição.

> **Mudou um campo e quer forçar a sincronização sem esperar a próxima requisição?** Rode:
> ```bash
> curl -X POST https://SEU-APP.onrender.com/api/migrate \
>   -H "x-migrate-secret: O_MESMO_VALOR_DE_MIGRATE_SECRET"
> ```
> **Por que a sincronização automática existe em vez do `payload migrate` (CLI)?** O comando
> oficial do Payload roda arquivos TypeScript através da ferramenta `tsx`, que neste projeto
> apresentou um bug de incompatibilidade com `undici`/Node.js em alguns ambientes (erro "Illegal
> constructor" em `CacheStorage`). O hook `onInit` e o endpoint `/api/migrate` aplicam o mesmo
> resultado (criação/atualização das tabelas) reaproveitando o bundler do próprio Next.js, que não
> tem esse problema.
>
> **Atenção para alterações futuras de esquema**: a sincronização automática (`push`) é segura
> para mudanças aditivas (nova collection, novo campo). Para mudanças que o Drizzle considerar
> potencialmente destrutivas (remover/renomear um campo, mudar o tipo de uma coluna com dados),
> o processo pediria uma confirmação interativa — o que **trava o boot do servidor** num ambiente
> sem terminal interativo como o Render. Nesse caso, defina `AUTO_MIGRATE=false` temporariamente,
> faça a alteração com mais cuidado (manualmente no banco, ou testando `payload migrate:create`
> em um ambiente onde o CLI funcione) e reative depois.

### 6. Domínio próprio

No Render, vá em **Settings → Custom Domains** do Web Service e adicione o domínio desejado (ex:
`www.aee.edu.br`), seguindo as instruções de DNS mostradas (CNAME/A record). Veja também o item
"Domínios" em **Próximos passos recomendados** abaixo sobre como rotear múltiplos domínios para
instituições diferentes dentro do mesmo app.

## Observação sobre `payload generate:types`

Neste ambiente de desenvolvimento específico, o comando `npm run generate:types` (que roda via
`tsx`) apresenta um bug conhecido de incompatibilidade entre `tsx` e o Node.js 22 ao carregar o
módulo `undici` (erro "Illegal constructor" em `CacheStorage`). Isso **não afeta** o funcionamento
do site (`next dev`, `next build`, `next start` seguem normalmente, pois usam o bundler do
Next.js, não o `tsx`). Por isso, o arquivo `src/payload-types.ts` foi escrito manualmente,
espelhando fielmente as collections atuais.

Se você tiver um ambiente onde esse comando funcione (outra máquina, versão de `tsx`/Node, etc.),
rode `npm run generate:types` normalmente para regenerar esse arquivo automaticamente a partir do
`payload.config.ts` — é a fonte da verdade a partir daí.

## Próximos passos recomendados

1. **Conteúdo real**: substituir os textos/imagens de exemplo pelos dados reais de cada
   instituição (missão/visão/valores, história, atos de credenciamento MEC reais, organogramas,
   fotos da coordenação, etc.) via painel `/admin`.
2. **Domínios**: configurar o campo `domain` de cada instituição e adicionar roteamento por
   domínio/subdomínio (ex: `middleware.ts` do Next.js lendo o host e reescrevendo para
   `/[slug-da-instituicao]`), já que hoje o roteamento é por caminho (`/unievangelica`, `/aee`,
   etc.). Necessário para que `www.unievangelica.edu.br` e `www.aee.edu.br`, por exemplo, sejam
   domínios próprios apontando para instituições diferentes dentro do mesmo deploy.
3. **E-mail**: configurar um adapter de e-mail do Payload (hoje os e-mails só são logados no
   console) para recuperação de senha de usuários do painel — importante em produção.
4. **Permissões**: refinar as regras de acesso (`access`) de cada collection por instituição,
   usando o campo `institutions` da collection `users`, para que cada equipe edite apenas o seu
   site.
5. **Migrations versionadas**: hoje o `/api/migrate` usa "push" (sincronização direta do
   esquema), adequado para o estágio atual do projeto. Para uma operação mais madura, vale gerar
   migrations versionadas (arquivos SQL no controle de versão) com `payload migrate:create`,
   assumindo que o ambiente usado não tenha o problema de `tsx` descrito acima.
