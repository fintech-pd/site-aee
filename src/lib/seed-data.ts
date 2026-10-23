export const institutionsSeed = [
  {
    slug: 'aee',
    name: 'Associação Educativa Evangélica',
    shortName: 'AEE',
    type: 'mantenedora' as const,
    city: 'Anápolis',
    shortDescription:
      'Mantenedora de instituições de ensino básico, técnico e superior em Goiás, com décadas de tradição em educação evangélica.',
    about:
      'A Associação Educativa Evangélica (AEE) é uma entidade sem fins lucrativos que mantém instituições de ensino em Goiás, atuando da educação básica ao ensino superior. Fundada com o propósito de oferecer educação de qualidade alicerçada em valores cristãos, a AEE hoje mantém colégios, uma escola técnica e faculdades reconhecidas pelo Ministério da Educação.',
    mission: 'Promover educação de excelência, formando cidadãos íntegros e preparados para transformar a sociedade à luz dos valores cristãos.',
    vision: 'Ser reconhecida como referência em educação evangélica de qualidade em todos os níveis de ensino em Goiás.',
    values: 'Ética, excelência acadêmica, respeito à diversidade, compromisso social e fé cristã.',
    contact: { phone: '(62) 3310-0000', email: 'contato@aee.edu.br' },
    campuses: [
      { name: 'Sede Administrativa', city: 'Anápolis', state: 'GO', address: 'Av. Universitária, s/n, Anápolis/GO' },
    ],
  },
  {
    slug: 'couto-magalhaes',
    name: 'Colégio Couto Magalhães',
    shortName: 'Couto Magalhães',
    type: 'basica' as const,
    city: 'Anápolis',
    shortDescription:
      'Educação infantil, ensino fundamental e médio com tradição e qualidade em Anápolis e Goianésia.',
    about:
      'O Colégio Couto Magalhães atua há décadas na educação básica, oferecendo educação infantil, ensino fundamental e ensino médio em suas unidades de Anápolis e Goianésia, sempre com foco no desenvolvimento integral do estudante.',
    mission: 'Educar com excelência acadêmica e formação em valores, preparando os estudantes para os desafios do futuro.',
    vision: 'Ser referência em educação básica de qualidade nas regiões onde atua.',
    values: 'Respeito, responsabilidade, excelência e fé.',
    contact: { phone: '(62) 3310-1000', email: 'secretaria@coutomagalhaes.edu.br' },
    campuses: [
      { name: 'Unidade Anápolis', city: 'Anápolis', state: 'GO', address: 'Rua Engenheiro Portela, 123, Anápolis/GO', phone: '(62) 3310-1000' },
      { name: 'Unidade Goianésia', city: 'Goianésia', state: 'GO', address: 'Av. Brasil, 456, Goianésia/GO', phone: '(62) 3379-2000' },
    ],
    mecAuthorization: {
      credenciamentoAto: 'Credenciado junto à Secretaria de Estado de Educação de Goiás (SEDUC-GO)',
      notes: 'Instituição de educação básica, regulada pelo sistema estadual de ensino de Goiás.',
    },
  },
  {
    slug: 'alvaro-de-melo',
    name: 'Colégio Álvaro de Melo',
    shortName: 'Álvaro de Melo',
    type: 'basica' as const,
    city: 'Ceres',
    shortDescription: 'Educação básica de qualidade no município de Ceres, Goiás.',
    about:
      'O Colégio Álvaro de Melo oferece educação infantil, ensino fundamental e médio em Ceres, com uma proposta pedagógica centrada no desenvolvimento acadêmico e humano dos estudantes.',
    mission: 'Formar cidadãos críticos, éticos e preparados para a vida acadêmica e profissional.',
    vision: 'Ser a instituição de referência em educação básica na região de Ceres.',
    values: 'Ética, solidariedade, excelência e fé cristã.',
    contact: { phone: '(62) 3307-3000', email: 'secretaria@alvarodemelo.edu.br' },
    campuses: [
      { name: 'Unidade Ceres', city: 'Ceres', state: 'GO', address: 'Av. Brasil, 789, Ceres/GO', phone: '(62) 3307-3000' },
    ],
    mecAuthorization: {
      credenciamentoAto: 'Credenciado junto à Secretaria de Estado de Educação de Goiás (SEDUC-GO)',
      notes: 'Instituição de educação básica, regulada pelo sistema estadual de ensino de Goiás.',
    },
  },
  {
    slug: 'unievangelica',
    name: 'Centro Universitário de Anápolis — UniEVANGÉLICA',
    shortName: 'UniEVANGÉLICA',
    type: 'superior' as const,
    city: 'Anápolis',
    shortDescription:
      'Centro universitário com décadas de tradição, cursos de graduação e pós-graduação reconhecidos pelo MEC.',
    about:
      'A UniEVANGÉLICA é um centro universitário consolidado na região Centro-Oeste, oferecendo cursos de graduação, pós-graduação e extensão nas áreas de saúde, exatas, humanas e sociais aplicadas, sempre pautada pela busca da excelência acadêmica.',
    mission: 'Formar profissionais competentes e éticos, comprometidos com o desenvolvimento da sociedade.',
    vision: 'Ser reconhecida nacionalmente pela qualidade do ensino, pesquisa e extensão.',
    values: 'Excelência acadêmica, ética, inovação e responsabilidade social.',
    contact: { phone: '(62) 3310-5000', email: 'contato@unievangelica.edu.br' },
    campuses: [
      { name: 'Campus Anápolis', city: 'Anápolis', state: 'GO', address: 'Av. Universitária, 1.440, Anápolis/GO', phone: '(62) 3310-5000' },
    ],
    mecAuthorization: {
      mecCode: '1021',
      credenciamentoAto: 'Portaria MEC nº 1.234',
      credenciamentoData: '2021-03-15',
      credenciamentoVigencia: '5 anos',
      igc: '3 (contínuo)',
      notes: 'Dados ilustrativos — devem ser substituídos pelos atos oficiais reais da instituição no painel administrativo.',
    },
  },
  {
    slug: 'uniego',
    name: 'Centro Universitário de Goiás — UNIEGO',
    shortName: 'UNIEGO',
    type: 'superior' as const,
    city: 'Goianésia',
    shortDescription: 'Instituição de ensino superior com cursos de graduação reconhecidos pelo MEC.',
    about:
      'A UNIEGO oferece cursos de graduação presenciais e a distância, com infraestrutura moderna e corpo docente qualificado, contribuindo para o desenvolvimento regional através da formação de profissionais capacitados.',
    mission: 'Promover educação superior de qualidade, acessível e comprometida com o desenvolvimento regional.',
    vision: 'Consolidar-se como referência em ensino superior na região Centro-Goiano.',
    values: 'Qualidade, acessibilidade, inovação e compromisso social.',
    contact: { phone: '(62) 3379-4000', email: 'contato@uniego.edu.br' },
    campuses: [
      { name: 'Campus Goianésia', city: 'Goianésia', state: 'GO', address: 'Av. Brasil, 1000, Goianésia/GO', phone: '(62) 3379-4000' },
    ],
    mecAuthorization: {
      mecCode: '2045',
      credenciamentoAto: 'Portaria MEC nº 987',
      credenciamentoData: '2020-08-10',
      credenciamentoVigencia: '5 anos',
      notes: 'Dados ilustrativos — devem ser substituídos pelos atos oficiais reais da instituição no painel administrativo.',
    },
  },
  {
    slug: 'faculdade-raizes',
    name: 'Faculdade Raízes',
    shortName: 'Raízes',
    type: 'superior' as const,
    city: 'Anápolis',
    shortDescription: 'Faculdade com cursos de graduação focados no mercado de trabalho regional.',
    about:
      'A Faculdade Raízes forma profissionais nas áreas de gestão, educação e tecnologia, com metodologias ativas de ensino e forte conexão com o mercado de trabalho local.',
    mission: 'Formar profissionais preparados para os desafios do mercado de trabalho contemporâneo.',
    vision: 'Ser reconhecida pela qualidade do ensino e pela empregabilidade de seus egressos.',
    values: 'Inovação, empreendedorismo, ética e compromisso com resultados.',
    contact: { phone: '(62) 3310-6000', email: 'contato@faculdaderaizes.edu.br' },
    campuses: [
      { name: 'Campus Anápolis', city: 'Anápolis', state: 'GO', address: 'Rua das Flores, 200, Anápolis/GO', phone: '(62) 3310-6000' },
    ],
    mecAuthorization: {
      mecCode: '3098',
      credenciamentoAto: 'Portaria MEC nº 555',
      credenciamentoData: '2019-11-20',
      credenciamentoVigencia: '5 anos',
      notes: 'Dados ilustrativos — devem ser substituídos pelos atos oficiais reais da instituição no painel administrativo.',
    },
  },
  {
    slug: 'florence-nightingale',
    name: 'Escola Técnica Florence Nightingale',
    shortName: 'Florence Nightingale',
    type: 'tecnica' as const,
    city: 'Anápolis',
    shortDescription: 'Educação técnica profissionalizante na área da saúde.',
    about:
      'A Escola Técnica Florence Nightingale forma profissionais técnicos na área da saúde, com forte ênfase em prática clínica supervisionada e parcerias com instituições de saúde da região.',
    mission: 'Formar técnicos de saúde competentes, éticos e humanizados.',
    vision: 'Ser referência em educação técnica na área da saúde em Goiás.',
    values: 'Cuidado, ética profissional, excelência técnica e humanização.',
    contact: { phone: '(62) 3310-7000', email: 'contato@florencenightingale.edu.br' },
    campuses: [
      { name: 'Unidade Anápolis', city: 'Anápolis', state: 'GO', address: 'Av. Universitária, 900, Anápolis/GO', phone: '(62) 3310-7000' },
    ],
    mecAuthorization: {
      credenciamentoAto: 'Credenciada junto ao Conselho Estadual de Educação de Goiás (CEE-GO) para educação profissional técnica',
      notes: 'Dados ilustrativos — devem ser substituídos pelos atos oficiais reais da instituição no painel administrativo.',
    },
  },
]

export const timelineSeed = [
  { year: 1965, title: 'Fundação da Associação Educativa Evangélica', description: 'Início das atividades da mantenedora em Anápolis, Goiás.' },
  { year: 1968, title: 'Criação do Colégio Couto Magalhães', description: 'Abertura da primeira unidade de educação básica da rede.' },
  { year: 1985, title: 'Expansão para Goianésia', description: 'Inauguração da unidade do Colégio Couto Magalhães em Goianésia.' },
  { year: 1992, title: 'Fundação do Colégio Álvaro de Melo', description: 'Chegada da rede educacional ao município de Ceres.' },
  { year: 2001, title: 'Criação da UniEVANGÉLICA', description: 'Início do ensino superior na rede, com os primeiros cursos de graduação.' },
  { year: 2010, title: 'Fundação da Escola Técnica Florence Nightingale', description: 'Início da oferta de cursos técnicos na área da saúde.' },
  { year: 2015, title: 'Credenciamento da UNIEGO', description: 'Expansão do ensino superior para a região de Goianésia.' },
  { year: 2018, title: 'Criação da Faculdade Raízes', description: 'Nova frente de ensino superior com foco em empregabilidade.' },
  { year: 2024, title: 'Modernização digital da rede', description: 'Lançamento da nova plataforma digital integrada das instituições da AEE.' },
]

export const coursesSeed: Record<
  string,
  Array<{
    name: string
    slug: string
    level: string
    modality: string[]
    status: string
    statusNote?: string
    shortDescription: string
    description: string
    details?: { duration?: string; workload?: string; shift?: string; degreeTitle?: string }
    legalActs?: Array<{
      type: string
      issuingBody: string
      number: string
      date: string
      subJudice?: boolean
    }>
  }>
> = {
  unievangelica: [
    {
      name: 'Medicina',
      slug: 'medicina',
      level: 'bacharelado',
      modality: ['presencial'],
      status: 'oferta',
      shortDescription: 'Formação médica completa com forte base em prática clínica desde os primeiros semestres.',
      description:
        'O curso de Medicina da UniEVANGÉLICA forma profissionais capacitados para atuar com excelência técnica e humanismo, com infraestrutura própria de hospital-escola e laboratórios modernos.',
      details: { duration: '6 anos (12 semestres)', workload: '8.760 horas', shift: 'Integral', degreeTitle: 'Bacharel em Medicina' },
      legalActs: [
        { type: 'autorizacao', issuingBody: 'seres_mec', number: '497', date: '2026-09-23', subJudice: true },
        { type: 'reconhecimento', issuingBody: 'seres_mec', number: '312', date: '2015-06-10' },
      ],
    },
    {
      name: 'Direito',
      slug: 'direito',
      level: 'bacharelado',
      modality: ['presencial'],
      status: 'oferta',
      shortDescription: 'Formação jurídica sólida, com núcleo de prática jurídica e forte inserção regional.',
      description:
        'O curso de Direito prepara bacharéis para atuação em todas as áreas jurídicas, com corpo docente qualificado e núcleo de prática jurídica ativo na comunidade.',
      details: { duration: '5 anos (10 semestres)', workload: '3.700 horas', shift: 'Matutino e Noturno', degreeTitle: 'Bacharel em Direito' },
      legalActs: [{ type: 'reconhecimento', issuingBody: 'seres_mec', number: '201', date: '2012-04-18' }],
    },
    {
      name: 'Odontologia',
      slug: 'odontologia',
      level: 'bacharelado',
      modality: ['presencial'],
      status: 'suspenso',
      statusNote: 'Processo de vestibular temporariamente suspenso. Novas turmas previstas para o próximo ciclo avaliativo.',
      shortDescription: 'Formação completa em odontologia, com clínicas-escola para atendimento à comunidade.',
      description:
        'O curso de Odontologia oferece formação teórico-prática robusta, com clínicas integradas que atendem a comunidade local sob supervisão docente.',
      details: { duration: '5 anos (10 semestres)', workload: '4.800 horas', shift: 'Integral', degreeTitle: 'Bacharel em Odontologia' },
      legalActs: [{ type: 'autorizacao', issuingBody: 'seres_mec', number: '150', date: '2010-02-05' }],
    },
  ],
  uniego: [
    {
      name: 'Administração',
      slug: 'administracao',
      level: 'bacharelado',
      modality: ['presencial', 'ead'],
      status: 'oferta',
      shortDescription: 'Formação generalista em gestão de negócios, com foco em empreendedorismo regional.',
      description:
        'O curso de Administração da UNIEGO forma gestores preparados para os desafios do mercado, com forte ênfase em projetos aplicados e empreendedorismo.',
      details: { duration: '4 anos (8 semestres)', workload: '3.200 horas', shift: 'Noturno', degreeTitle: 'Bacharel em Administração' },
      legalActs: [{ type: 'reconhecimento', issuingBody: 'seres_mec', number: '88', date: '2018-05-22' }],
    },
    {
      name: 'Pedagogia',
      slug: 'pedagogia',
      level: 'licenciatura',
      modality: ['ead'],
      status: 'oferta',
      shortDescription: 'Formação de professores para a educação infantil e os anos iniciais do ensino fundamental.',
      description:
        'O curso de Pedagogia forma educadores capacitados para atuar na gestão e docência da educação básica, com flexibilidade de estudo na modalidade EAD.',
      details: { duration: '4 anos (8 semestres)', workload: '3.200 horas', degreeTitle: 'Licenciado em Pedagogia' },
      legalActs: [{ type: 'autorizacao', issuingBody: 'seres_mec', number: '42', date: '2019-09-12' }],
    },
  ],
  'faculdade-raizes': [
    {
      name: 'Gestão de Recursos Humanos',
      slug: 'gestao-de-recursos-humanos',
      level: 'tecnologo',
      modality: ['presencial', 'semipresencial'],
      status: 'oferta',
      shortDescription: 'Formação tecnóloga voltada à gestão estratégica de pessoas nas organizações.',
      description:
        'O curso forma profissionais capacitados para atuar na gestão estratégica de pessoas, recrutamento, desenvolvimento e cultura organizacional.',
      details: { duration: '2 anos (4 semestres)', workload: '1.600 horas', shift: 'Noturno', degreeTitle: 'Tecnólogo em Gestão de RH' },
      legalActs: [{ type: 'autorizacao', issuingBody: 'seres_mec', number: '67', date: '2020-03-02' }],
    },
    {
      name: 'Análise e Desenvolvimento de Sistemas',
      slug: 'analise-e-desenvolvimento-de-sistemas',
      level: 'tecnologo',
      modality: ['presencial'],
      status: 'em_breve',
      statusNote: 'Curso em processo de autorização junto ao MEC. Previsão de início das turmas no próximo ano letivo.',
      shortDescription: 'Formação tecnóloga em desenvolvimento de software e sistemas de informação.',
      description:
        'Curso voltado à formação de profissionais de tecnologia capazes de projetar, desenvolver e manter sistemas de software para empresas da região.',
      details: { duration: '2 anos (4 semestres)', workload: '1.600 horas', shift: 'Noturno', degreeTitle: 'Tecnólogo em ADS' },
    },
  ],
  'florence-nightingale': [
    {
      name: 'Técnico em Enfermagem',
      slug: 'tecnico-em-enfermagem',
      level: 'tecnico',
      modality: ['presencial'],
      status: 'oferta',
      shortDescription: 'Formação técnica completa para atuação em unidades de saúde.',
      description:
        'O curso Técnico em Enfermagem forma profissionais capacitados para atuar em hospitais, clínicas e unidades básicas de saúde, com estágio supervisionado em instituições parceiras.',
      details: { duration: '18 meses', workload: '1.800 horas', shift: 'Matutino, Vespertino e Noturno', degreeTitle: 'Técnico em Enfermagem' },
      legalActs: [{ type: 'autorizacao', issuingBody: 'cee', number: '34', date: '2021-02-14' }],
    },
    {
      name: 'Técnico em Radiologia',
      slug: 'tecnico-em-radiologia',
      level: 'tecnico',
      modality: ['presencial'],
      status: 'suspenso',
      statusNote: 'Entrada de novas turmas suspensa temporariamente para reforma dos laboratórios de imagem.',
      shortDescription: 'Formação técnica em diagnóstico por imagem.',
      description:
        'O curso forma técnicos capacitados a operar equipamentos de diagnóstico por imagem, atuando em clínicas e hospitais da região.',
      details: { duration: '18 meses', workload: '1.700 horas', shift: 'Vespertino', degreeTitle: 'Técnico em Radiologia' },
      legalActs: [{ type: 'autorizacao', issuingBody: 'cee', number: '19', date: '2019-07-30' }],
    },
  ],
}
