/* ─────────────────────────────────────────────────
   Portuguese (pt) landing pages — rendered by app/pt/[slug]/page.tsx
   Target market: Brazil (huge market, lower competition than English)
───────────────────────────────────────────────── */
export interface LandingPt {
  h1:       string;
  sub:      string;
  title:    string;
  desc:     string;
  keywords: string[];
  body:     { h2: string; p: string }[];
  faq:      { q: string; a: string }[];
}

export const LANDING_PT: Record<string, LandingPt> = {

  "gerador-de-faturas-gratis": {
    h1:  "Gerador de Faturas Grátis — Crie e Baixe em PDF",
    sub: "O gerador de faturas online mais rápido do Brasil. Preencha os dados, adicione os itens e baixe uma fatura profissional em PDF em segundos — grátis, sem cadastro.",
    title: "Gerador de Faturas Grátis — Crie Faturas PDF Online",
    desc:  "Crie faturas profissionais em PDF grátis com nosso gerador online. Adicione seu logo, aplique impostos e baixe na hora. Sem cadastro, sem custo. Para freelancers e pequenas empresas.",
    keywords: ["gerador de faturas gratis", "criar fatura gratis", "fatura em pdf gratis", "gerador de faturas online", "fazer fatura gratis"],
    body: [
      { h2: "Como criar uma fatura grátis?", p: "Com o PDF Bill Builder você cria uma fatura profissional em menos de 2 minutos. Basta inserir os dados da sua empresa e do seu cliente, adicionar os produtos ou serviços, aplicar o imposto e baixar o PDF. Sem necessidade de criar uma conta ou instalar nenhum programa." },
      { h2: "O que deve ter em uma fatura?", p: "Uma fatura completa deve incluir: nome e dados da empresa, dados do cliente, número da fatura, data de emissão e data de vencimento, descrição dos produtos ou serviços, subtotal, impostos aplicáveis e total a pagar. Você também pode adicionar seus dados bancários para facilitar o pagamento." },
      { h2: "Fatura para freelancers e autônomos", p: "Se você trabalha como freelancer ou prestador de serviços autônomo, emitir faturas profissionais é essencial para cobrar seus serviços. Inclua seu nome, CPF ou CNPJ, e uma descrição detalhada de cada serviço prestado." },
      { h2: "Como calcular o imposto em uma fatura?", p: "O gerador calcula o imposto automaticamente. Basta inserir a alíquota correspondente (por exemplo, 15% de ISS para serviços) e o sistema calculará o valor do imposto e o total a pagar." },
    ],
    faq: [
      { q: "O gerador de faturas é totalmente gratuito?", a: "Sim, 100% gratuito. Sem limite de faturas, sem marca d'água, sem necessidade de criar uma conta. Crie e baixe quantas faturas quiser." },
      { q: "Posso adicionar meu logo à fatura?", a: "Sim. Você pode fazer upload do logo da sua empresa e ele aparecerá na parte superior da fatura no PDF baixado." },
      { q: "Quais moedas são suportadas?", a: "O gerador suporta múltiplas moedas: BRL (R$), USD ($), EUR (€), GBP (£), e mais. Selecione a moeda desejada antes de adicionar os itens." },
      { q: "Os dados da minha fatura ficam salvos em algum servidor?", a: "Não. Todos os dados inseridos ficam apenas no seu navegador. Nenhuma informação é enviada para nenhum servidor. Privacidade total." },
    ],
  },

  "fatura-gratis": {
    h1:  "Fatura Grátis — Crie sua Fatura Profissional em PDF",
    sub: "Crie uma fatura grátis em segundos. Personalize com seu logo e cores, aplique impostos e baixe um PDF impecável — sem cadastro, sem custo.",
    title: "Fatura Grátis — Gerador de Faturas PDF Online Gratuito",
    desc:  "Gere uma fatura grátis online. Personalize os dados, aplique impostos e baixe um PDF profissional na hora. Ideal para freelancers e pequenas empresas brasileiras.",
    keywords: ["fatura gratis", "fazer fatura gratis", "fatura online gratis", "criar fatura pdf gratis", "gerar fatura gratis"],
    body: [
      { h2: "Por que usar um gerador de faturas online?", p: "Um gerador de faturas online elimina a necessidade de baixar softwares ou pagar assinaturas caras. Basta abrir o navegador, preencher os dados e em segundos você tem uma fatura profissional pronta para enviar ao cliente." },
      { h2: "Fatura para prestadores de serviços", p: "Designers, desenvolvedores, consultores, fotógrafos e qualquer prestador de serviços pode usar nosso gerador para criar faturas detalhadas com descrição do serviço, valor por hora ou por projeto, e cálculo automático do total." },
      { h2: "Fatura com nota fiscal?", p: "Este gerador cria documentos de cobrança profissionais (faturas/recibos). Ele não substitui a Nota Fiscal Eletrônica (NF-e) obrigatória para empresas no Brasil — para isso você precisa de um sistema de emissão de NF-e. Para freelancers pessoa física e microempreendedores, uma fatura detalhada é suficiente como comprovante de serviço." },
    ],
    faq: [
      { q: "Qual a diferença entre fatura e nota fiscal?", a: "Uma fatura é um documento de cobrança profissional. A Nota Fiscal Eletrônica (NF-e) é um documento fiscal oficial emitido via sistema do governo. Freelancers pessoa física geralmente usam recibos ou faturas simples." },
      { q: "Como enviar a fatura para o cliente?", a: "Baixe o PDF e anexe em um e-mail para o cliente. O formato PDF garante que a fatura apareça exatamente igual em qualquer dispositivo." },
    ],
  },

  "modelo-de-fatura": {
    h1:  "Modelo de Fatura Grátis — Preencha e Baixe PDF",
    sub: "Use nosso modelo de fatura profissional online. Preencha os dados no navegador e baixe um PDF perfeito em segundos — grátis, sem software.",
    title: "Modelo de Fatura Grátis — Preencha e Baixe PDF Online",
    desc:  "Modelo de fatura profissional grátis. Preencha os dados online e baixe o PDF na hora. Sem Word, sem Excel, sem cadastro. Perfeito para freelancers e MEIs.",
    keywords: ["modelo de fatura", "modelo fatura gratis", "modelo de fatura pdf", "template fatura gratis", "modelo de fatura word gratis"],
    body: [
      { h2: "Por que usar um modelo online em vez de Word ou Excel?", p: "Modelos de Word ou Excel exigem ajuste de margens, proteção de fórmulas e salvar em PDF manualmente. Um modelo online como o PDF Bill Builder calcula os totais automaticamente, sempre cabe em uma página A4 e gera o PDF com um clique." },
      { h2: "Modelo de fatura para serviços", p: "Se você é consultor, advogado, designer ou qualquer profissional de serviços, este modelo permite detalhar cada serviço com descrição, horas trabalhadas e valor por hora. O total é calculado automaticamente." },
      { h2: "Modelo de fatura com impostos", p: "O modelo inclui campo de imposto configurável. Insira o percentual correspondente e o modelo mostrará o detalhamento de subtotal, imposto e total no documento PDF." },
    ],
    faq: [
      { q: "O modelo tem marca d'água?", a: "A versão gratuita inclui um pequeno texto no rodapé. Com a versão Pro você pode removê-lo completamente." },
      { q: "Posso usar o mesmo modelo para clientes diferentes?", a: "Sim. O gerador não salva dados entre sessões (para proteger sua privacidade), então cada vez que você abre a ferramenta obtém um modelo em branco pronto para um novo cliente." },
    ],
  },

  "recibo-de-pagamento": {
    h1:  "Gerador de Recibos de Pagamento Grátis — PDF",
    sub: "Crie recibos de pagamento profissionais em segundos. Baixe o recibo em PDF na hora — grátis, sem cadastro, sem software.",
    title: "Gerador de Recibos de Pagamento Grátis — Crie Recibos PDF Online",
    desc:  "Gere recibos de pagamento em PDF grátis com nosso gerador online. Adicione os detalhes do pagamento, data, valor e baixe na hora. Perfeito para qualquer tipo de negócio.",
    keywords: ["recibo de pagamento gratis", "criar recibo pdf", "recibo de pagamento online", "fazer recibo gratis", "modelo recibo pagamento"],
    body: [
      { h2: "O que é um recibo de pagamento?", p: "Um recibo de pagamento é um documento que confirma que um pagamento foi realizado. Diferente de uma fatura (que solicita o pagamento), o recibo confirma que o dinheiro foi recebido. É fundamental para controle financeiro e como comprovante para o cliente." },
      { h2: "O que deve ter em um recibo?", p: "Um recibo completo deve incluir: nome e dados de quem recebe o pagamento, nome e dados de quem paga, número do recibo, data, descrição do que foi pago, valor (com detalhamento de impostos se houver) e forma de pagamento utilizada." },
      { h2: "Recibo de aluguel", p: "Se você é proprietário de imóveis, pode usar este gerador para criar recibos de aluguel mensais. Inclua o período correspondente (por exemplo, 'Aluguel referente ao mês de janeiro/2026'), o valor, o endereço do imóvel e os dados do locatário." },
    ],
    faq: [
      { q: "Qual a diferença entre recibo e fatura?", a: "A fatura solicita o pagamento (emitida antes de receber o dinheiro). O recibo confirma que o pagamento foi recebido (emitido após cobrar). Ambos são documentos importantes para controle financeiro." },
      { q: "Posso criar recibos em reais (BRL)?", a: "Sim. Selecione BRL (R$) como moeda antes de inserir os valores." },
    ],
  },

  "orcamento-gratis": {
    h1:  "Gerador de Orçamentos Grátis — PDF Profissional",
    sub: "Crie orçamentos profissionais em segundos. Baixe em PDF e envie para seus clientes na hora — grátis, sem cadastro.",
    title: "Gerador de Orçamentos Grátis — Criar Orçamento PDF Online",
    desc:  "Gere orçamentos profissionais em PDF grátis. Adicione produtos ou serviços, aplique descontos e impostos e baixe na hora. Sem cadastro, sem software.",
    keywords: ["gerador de orcamentos gratis", "fazer orcamento gratis", "orcamento em pdf gratis", "criar orcamento online", "modelo de orcamento gratis"],
    body: [
      { h2: "O que é um orçamento e para que serve?", p: "Um orçamento (também chamado de proposta comercial ou cotação) é um documento que apresenta os preços dos seus produtos ou serviços a um cliente potencial antes de confirmar a venda. É a primeira etapa do processo de vendas profissional." },
      { h2: "Como fazer um orçamento profissional?", p: "Um orçamento profissional deve incluir seus dados de contato, dados do cliente, descrição clara de cada produto ou serviço com preço unitário, subtotal, impostos aplicáveis, total, validade do orçamento e condições de pagamento." },
      { h2: "Diferença entre orçamento e fatura", p: "O orçamento propõe um preço e não gera obrigação de pagamento. A fatura exige o pagamento por um serviço já prestado ou produto entregue. Um orçamento aprovado pelo cliente se converte na base para emitir a fatura." },
    ],
    faq: [
      { q: "Por quanto tempo o orçamento é válido?", a: "Depende do seu negócio. O mais comum é indicar 'Válido por 30 dias'. Você pode escrever isso no campo de notas do orçamento." },
      { q: "Posso converter o orçamento em fatura?", a: "O gerador não converte automaticamente, mas você pode usar o orçamento como referência e criar uma nova fatura com os mesmos dados quando o cliente aprovar." },
    ],
  },
};

export const LANDING_PT_SLUGS = Object.keys(LANDING_PT);
