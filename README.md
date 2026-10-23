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
- **SQLite** como banco de dados padrão (fácil de rodar localmente). Para produção, recomenda-se
  migrar para Postgres (`@payloadcms/db-postgres`), especialmente diante de múltiplas instituições
  e volume de conteúdo/mídia.

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

```bash
npm install
cp .env.example .env   # ajuste PAYLOAD_SECRET em produção
npm run dev
```

Acesse `http://localhost:3000`. No primeiro acesso ao `/admin`, o Payload pedirá a criação do
usuário administrador inicial.

### Popular dados de exemplo

Com o servidor de desenvolvimento rodando, execute uma vez:

```bash
curl -X POST http://localhost:3000/api/seed
```

Isso cria as 7 instituições, linha do tempo da mantenedora, cursos de exemplo (incluindo o caso
"sub judice" citado no briefing), notícias, eventos e registros de coordenação/diretoria a serem
completados no painel. A operação é idempotente (não duplica dados se já existirem instituições)
e **fica desabilitada automaticamente em produção** (`NODE_ENV=production`). Veja
`src/app/(payload)/api/seed/route.ts`.

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
2. **Domínios**: configurar o campo `domain` de cada instituição e, em produção, adicionar
   roteamento por domínio/subdomínio (ex: middleware do Next.js lendo o host e redirecionando
   para `/[slug-da-instituicao]`), já que hoje o roteamento usado no desenvolvimento é por
   caminho (`/unievangelica`, `/aee`, etc.).
3. **Banco de dados**: migrar de SQLite para Postgres em produção.
4. **E-mail**: configurar um adapter de e-mail do Payload (hoje os e-mails só são logados no
   console) para recuperação de senha de usuários do painel.
5. **Upload de mídia**: configurar armazenamento externo (S3, Vercel Blob, etc.) via plugins
   `@payloadcms/storage-*` para produção, em vez do disco local.
6. **Permissões**: refinar as regras de acesso (`access`) de cada collection por instituição,
   usando o campo `institutions` da collection `users`, para que cada equipe edite apenas o seu
   site.
