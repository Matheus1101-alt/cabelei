# Design System — Benedeti Concept (Salão de Cabelo)

**Aplicação:** Landing page única, mobile-first
**Objetivo:** agendamento pelo WhatsApp (CTA único, repetido)
**Praça:** Sorocaba/SP ("Agora também em Sorocaba": confirmar com a cliente se há outra unidade)
**Base de extração:** arte de divulgação (logo BC dourado + wordmark serifado espaçado, gradiente lilás, cartão de serviços translúcido, borboleta dourada, retrato de cabelo liso escuro)
**Contraste:** todos os pares abaixo foram calculados (WCAG), não estimados.

---

## 0. Leitura da identidade (e 4 problemas da arte que não podem migrar para a web)

**O que a marca tem:** monograma "BC" dourado em coroa, wordmark em serifa clássica com tracking aberto, tagline em sans fina ("BELEZA • CUIDADO • AUTOESTIMA"), script lilás para a frase emocional, fundo em gradiente lavanda → ameixa, cartão de vidro fosco, linhas e borboleta em dourado. Posicionamento: feminino, premium acessível, "cuidado". A foto do cabelo é o único elemento de prova.

**Problemas a corrigir:**

1. **Dourado sobre lilás reprova.** `#B8934F` sobre fundo claro = 2.64:1. Na arte o dourado funciona porque é logo/ornamento. No site, dourado nunca carrega texto pequeno. Só decoração, linha, ícone grande, ou texto sobre ameixa escuro.
2. **Texto branco sobre botão dourado** (como na arte "Agende seu horário") reprova. O CTA do site é ameixa com texto branco (8.81:1) ou dourado-claro com texto escuro (9.17:1).
3. **Cartão de vidro translúcido derruba a leitura.** Transparência sobre gradiente varia o contraste por pixel. No site o cartão é quase opaco (`rgba(255,255,255,.88)`), o blur é só efeito.
4. **Script em excesso.** "esse cuidado!" funciona em arte. Em web, script em mais de uma frase por seção vira ilegível no celular. Uma frase por seção, 24px ou mais.

---

## 1. Cores

### Primária: marca (ameixa)

| Token | Hex | Uso |
|---|---|---|
| `--ameixa-900` | `#3A2150` | Fundo de seção escura, rodapé, hover do CTA |
| `--ameixa-700` | `#5E3A7E` | **Cor de marca.** CTA primário, títulos de destaque, links, ícones |
| `--lilas-500` | `#7B5499` | Ícone ativo, borda de foco, detalhe (branco sobre ele = 5.88:1) |
| `--lilas-300` | `#CDB8E0` | Fim do gradiente do hero, divisores, fundo de chip |
| `--lilas-100` | `#EFE6F6` | Fundo de card alternado, badge |
| `--lavanda-50` | `#F8F4FB` | **Fundo global** |

### Secundária: ouro (o brilho da marca)

| Token | Hex | Uso |
|---|---|---|
| `--ouro` | `#B8934F` | **Só decorativo:** linha fina, borboleta, borda, ícone grande, monograma |
| `--ouro-claro` | `#DCC08A` | Texto e botão sobre ameixa escura (sobre `--ameixa-900` = 7.90:1) |
| `--ouro-texto` | `#8C6A2F` | Overline/texto dourado sobre `--lavanda-50` apenas (4.58:1) |

### Suporte

| Token | Hex | Uso |
|---|---|---|
| `--texto` | `#2A1A38` | Texto principal (14.83:1 sobre lavanda) |
| `--texto-2` | `#5F5170` | Texto secundário (6.67:1 sobre lavanda, 5.98:1 sobre lilás-100) |
| `--borda` | `#E3D6EE` | Contorno de card e input |
| `--whatsapp` | `#25D366` | **Somente no glifo** do ícone do WhatsApp |
| `--sucesso` / `--erro` | `#2F7D4F` / `#B3261E` | Feedback de formulário (sempre com texto e ícone) |

### Contraste verificado

| Combinação | Razão | Veredito |
|---|---|---|
| Branco sobre `--ameixa-700` (CTA) | 8.81:1 | OK AAA |
| Branco sobre `--ameixa-900` | 12.77:1 (creme `#F8F4FB`) | OK AAA |
| `--texto` sobre `--lavanda-50` | 14.83:1 | OK AAA |
| `--texto` sobre `--lilas-300` | 8.85:1 | OK AAA |
| `--ameixa-700` sobre `--lavanda-50` (link) | 8.11:1 | OK AAA |
| `--ameixa-700` sobre `--lilas-100` | 7.27:1 | OK AAA |
| `--ouro-claro` sobre `--ameixa-900` | 7.90:1 | OK AAA |
| `--texto` sobre `--ouro-claro` (botão) | 9.17:1 | OK AAA |
| `--ouro-texto` sobre `--lavanda-50` | 4.58:1 | OK AA (só texto normal sobre esse fundo) |
| `--ouro-texto` sobre `--lilas-100` | 4.11:1 | **REPROVA** para texto pequeno |
| `--ouro` sobre `--lavanda-50` | 2.64:1 | **REPROVA**. Só decoração |

### Regras de cor (não negociáveis)

1. **Página clara e lilás por padrão.** `--lavanda-50` é a base. Uma faixa `--ameixa-900` na página inteira (Método ou CTA final).
2. **Ameixa é ação.** CTA, link, ícone, palavra de destaque. Não pintar seções inteiras em `--ameixa-700`.
3. **Ouro é joia, não superfície.** Máx. 3 aparições por tela: linha, ícone, borboleta. Nunca fundo de seção, nunca texto pequeno.
4. **Verde do WhatsApp só no glifo.** Botão ameixa com ícone verde. Fundo verde quebra a paleta.
5. **Gradiente permitido só no hero:** `linear-gradient(165deg, #F8F4FB 0%, #E4D4F0 55%, #CDB8E0 100%)`. Texto escuro por cima. Fora do hero, cor chapada.
6. **Proporção por tela:** ~70% lavanda/branco · ~15% ameixa · ~10% lilás · ~5% ouro.

---

## 2. Tipografia

Wordmark e monograma entram como **SVG**, nunca recriados em web font. O site usa uma serifa para dar o tom "premium" sem copiar a arte.

- **Display:** `Cormorant Garamond` (500/600, com itálico). Fiel ao wordmark BENEDETI. Frágil abaixo de 28px, então não usar em texto pequeno.
- **Corpo / UI:** `Jost` (400/500/600). Sans geométrica fina, equivale à tagline da arte, boa no celular.
- **Script (acento):** `Allura`, **uma frase por seção**, nunca em botão, nunca abaixo de 24px.
- Fallback: `Georgia, serif` / `system-ui, -apple-system, sans-serif`

### Hierarquia

| Nível | Fonte / peso | Mobile → desktop | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| **H1** | Cormorant Garamond 600 | 38px → 68px | 1.05 | `0` | Hero. Uma palavra em *itálico* `--ameixa-700` |
| **H2** | Cormorant Garamond 600 | 30px → 48px | 1.1 | `0` | Título de seção |
| **H3** | Jost 600 | 18px → 22px | 1.3 | `0` | Título de card / serviço |
| **Script** | Allura 400 | 28px → 44px | 1.1 | `0` | "esse cuidado!" (1 por seção) |
| **Subtítulo** | Jost 400 | 17px → 20px | 1.55 | `0` | Apoio do hero |
| **Corpo** | Jost 400 | 16px → 17px | 1.65 | `0` | Texto geral. Máx. 62ch |
| **Corpo pequeno** | Jost 400 | 14px | 1.55 | `0` | Legenda, nota, rodapé |
| **Overline** | Jost 500 | 12px | 1.2 | `0.2em` UPPERCASE | "BELEZA • CUIDADO • AUTOESTIMA", rótulo de seção |
| **Botão** | Jost 600 | 15px → 16px | 1 | `0.06em` UPPERCASE | CTA |

### Regras
- Caixa alta só em overline e botão. Títulos em caixa mista.
- Itálico de Cormorant: uma palavra por título.
- Exemplo H1: `Seu cabelo merece <em>esse cuidado</em>.`

---

## 3. Componentes

### Botão primário: "Agendar pelo WhatsApp"
- Fundo `--ameixa-700`, texto branco, ícone WhatsApp em `--whatsapp` à esquerda, borda `1px solid var(--ouro)` (liga com o ouro da marca sem depender dele para contraste)
- Altura 54px mobile / 58px desktop · padding `16px 32px` · radius `999px`
- Hover: fundo `--ameixa-900`, `translateY(-2px)`, `--sh-cta`
- Ativo: `translateY(0)`, sem sombra
- Foco: `outline: 3px solid var(--lilas-500); outline-offset: 3px`
- Transição `180ms ease-out`
- **Texto igual em toda a página.** Mensagem pré-preenchida: "Olá! Vi a página da Benedeti Concept e quero agendar um horário."

### Botão sobre fundo escuro
- Fundo `--ouro-claro`, texto `--texto`, ícone verde. Mesmas dimensões.

### Botão secundário: "Ver serviços"
- Transparente, borda `1.5px solid var(--ameixa-700)`, texto `--ameixa-700`
- Hover: fundo `--ameixa-700`, texto branco

### Botão WhatsApp flutuante
- Mobile: barra fixa `bottom: 16px`, largura total menos 32px, fundo `--ameixa-700`, aparece após 30% de scroll (`fade + slide-up` 240ms)
- Desktop: pílula canto inferior direito, ícone + "Agendar"
- `z-index: 90`, sombra `--sh-3`

### Header
- 68px mobile / 84px desktop · fundo `--lavanda-50`, borda inferior `1px solid var(--borda)` após scroll
- Monograma/wordmark SVG à esquerda. Menu âncora: `Serviços · Diferenciais · Resultados · Sobre · Contato`
- CTA compacto (pílula ameixa) sempre visível, inclusive no mobile ao lado do hambúrguer

### Hero
- Gradiente do hero (regra 5). Texto à esquerda, foto à direita (no mobile, foto abaixo do H1 e do CTA, nunca empurrando o CTA para fora da primeira dobra)
- Overline `BELEZA • CUIDADO • AUTOESTIMA` + H1 + subtítulo + CTA primário + selo "Atendimento em Sorocaba/SP"
- Foto em arco: `border-radius: 220px 220px 24px 24px`. Sem filtro CSS por cima
- Borboleta dourada em SVG, opacity .9, só aqui e no CTA final

### Cartão de serviços (o cartão de vidro da arte)
- Fundo `rgba(255,255,255,.88)` + `backdrop-filter: blur(10px)`, borda `1px solid rgba(184,147,79,.45)`, radius `24px`, padding `28px 24px`
- Chip de título (como o "NOSSOS SERVIÇOS" da arte): fundo `--ameixa-700`, texto branco, overline, radius 999px
- Cada serviço: ícone de linha 24px `--ameixa-700` + nome (Jost 500) + linha fina `--lilas-300` + botão "Agendar" em texto. Toque abre WhatsApp com o serviço na mensagem
- **Sem preço** por padrão (varia por comprimento/volume). Se a cliente quiser, usar "a partir de" com valor real
- Serviços: Progressiva · Botox capilar · Hidratação · Reconstrução · Cauterização · Selagem · Escova + chapinha · Lavagem + escova + chapinha

### Card de diferencial (os 4 ícones da arte)
- Fundo branco, borda `1px solid var(--borda)`, radius `24px`, padding 24px
- Ícone em círculo `--lilas-100` 56px, traço `--ameixa-700` 2px
- Itens: Resultados visíveis · Produtos de qualidade · Atendimento personalizado · Beleza com segurança
- "Produtos de qualidade" e "segurança": só publicar com marca/procedimento real. Genérico não convence

### Galeria de resultados
- Grid uniforme, 1 coluna mobile / 2 tablet / 3 desktop, gap `12px` / `16px`, radius `16px`, `aspect-ratio: 4/5`
- Foto real da própria clínica, mesma luz e fundo. `loading="lazy"` a partir da 4ª

### Depoimento
- Fundo branco, borda-esquerda `3px solid var(--ouro)`, radius `0 16px 16px 0`, padding 24px
- Autor em overline `--texto-2`. Sem avatar de banco: iniciais em círculo `--lilas-100` ou foto real

### Input de formulário (opcional)
- Fundo branco, borda `1.5px solid var(--borda)`, radius `14px`, altura 52px, padding `14px 16px`
- Label sempre visível acima. Foco: borda `--ameixa-700` + `box-shadow: 0 0 0 4px rgba(94,58,126,.16)`
- Erro: borda `--erro` + ícone + mensagem 14px
- Campos: nome, WhatsApp (máscara), serviço (select), melhor dia/horário. Termina em **mensagem pré-preenchida no WhatsApp**, sem backend

### Rodapé
- Fundo `--ameixa-900`, texto `#F8F4FB`, padding `64px 0 32px`
- 3 colunas desktop: logo + tagline · âncoras · contato (WhatsApp, Instagram, endereço, horário)
- Linha final: `© {ano} Benedeti Concept` 13px, crédito de desenvolvimento discreto

---

## 4. Estética

### Border-radius
Macio e feminino, escalonado.

| Token | Valor | Uso |
|---|---|---|
| `--r-sm` | `10px` | Badge, chip |
| `--r-md` | `14px` | Input |
| `--r-lg` | `24px` | Card, cartão de serviços |
| `--r-arch` | `220px 220px 24px 24px` | Foto do hero |
| `--r-full` | `999px` | Botão, pílula, chip, avatar |

### Sombras
Sombra com tinta ameixa, nunca preto puro.

| Token | Valor | Uso |
|---|---|---|
| `--sh-1` | `0 1px 2px rgba(58,33,80,.06), 0 1px 3px rgba(58,33,80,.08)` | Card em repouso |
| `--sh-2` | `0 10px 28px rgba(58,33,80,.12)` | Card hover |
| `--sh-3` | `0 16px 40px rgba(58,33,80,.20)` | Flutuante, drawer |
| `--sh-cta` | `0 8px 20px rgba(94,58,126,.32)` | Hover do CTA |

### Espaçamento: base 8px
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Container: `20px` mobile / `32px` tablet / `64px` desktop · máx. `1200px`
- Entre seções: `64px` mobile / `104px` desktop
- Título → conteúdo: `24px` / `40px`
- Gap de cards: `16px` / `24px`
- Nunca menos de 48px entre seções

### Decoração
- Borboleta dourada: hero e CTA final apenas
- Linha fina dourada `1px` como divisor sob títulos de seção (a "linha curva" da arte)
- Ícones: traço 2px, cantos arredondados, `--ameixa-700`

### Imagem
- WebP, `srcset` 480/768/1280/1920, hero com `fetchpriority="high"`, resto `lazy`
- Sem filtro CSS sobre foto de cabelo. O brilho é a prova do serviço

### Movimento
- 200ms padrão / 300ms entrada · easing `cubic-bezier(.2,.8,.2,1)`
- Fade-in ao entrar na viewport: opacidade 0→1 + `translateY(12px)`
- `@media (prefers-reduced-motion: reduce)` → tudo em 0ms

---

## 5. Estrutura da landing (ordem das seções)

1. **Header** fixo: logo + âncoras + CTA
2. **Hero:** H1 + subtítulo + CTA + foto em arco + selo de cidade
3. **Serviços:** cartão com os 8 serviços, cada um abre WhatsApp com o nome
4. **Diferenciais:** 4 cards de ícone
5. **Resultados:** galeria de 6–9 fotos reais
6. **Sobre** (faixa ameixa): quem atende, tempo de salão, produtos que usa
7. **Depoimentos:** 2–3 reais
8. **Como agendar:** 3 passos (chama no WhatsApp → escolhe serviço e horário → confirma)
9. **Localização:** endereço, mapa, horário de funcionamento
10. **CTA final** (faixa ameixa) + rodapé
11. **Botão flutuante** a partir de 30% de scroll

---

## 6. Tokens CSS

```css
:root {
  /* Cores */
  --ameixa-900: #3A2150;
  --ameixa-700: #5E3A7E;
  --lilas-500: #7B5499;
  --lilas-300: #CDB8E0;
  --lilas-100: #EFE6F6;
  --lavanda-50: #F8F4FB;
  --ouro: #B8934F;        /* decorativo, nunca texto */
  --ouro-claro: #DCC08A;  /* só sobre ameixa escura */
  --ouro-texto: #8C6A2F;  /* só sobre --lavanda-50 */
  --texto: #2A1A38;
  --texto-2: #5F5170;
  --borda: #E3D6EE;
  --whatsapp: #25D366;    /* só no glifo */
  --sucesso: #2F7D4F;
  --erro: #B3261E;

  /* Gradiente (só hero) */
  --grad-hero: linear-gradient(165deg, #F8F4FB 0%, #E4D4F0 55%, #CDB8E0 100%);

  /* Tipografia */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Jost', system-ui, -apple-system, sans-serif;
  --font-script: 'Allura', cursive;

  /* Raios */
  --r-sm: 10px; --r-md: 14px; --r-lg: 24px;
  --r-arch: 220px 220px 24px 24px; --r-full: 999px;

  /* Sombras */
  --sh-1: 0 1px 2px rgba(58,33,80,.06), 0 1px 3px rgba(58,33,80,.08);
  --sh-2: 0 10px 28px rgba(58,33,80,.12);
  --sh-3: 0 16px 40px rgba(58,33,80,.20);
  --sh-cta: 0 8px 20px rgba(94,58,126,.32);

  /* Espaçamento */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px; --space-32: 128px;

  --ease: cubic-bezier(.2,.8,.2,1);
}
```

---

## 7. O que NÃO fazer

- Texto dourado em fundo lilás ou lavanda (reprova)
- Texto branco sobre botão dourado
- Botão verde de WhatsApp
- Cartão de vidro com transparência alta sob texto
- Script em mais de uma frase por seção, ou em botão
- Gradiente fora do hero
- Foto de banco de "mulher de cabelo liso" no lugar de trabalho real
- Preço inventado, "resultado garantido" ou promessa de durabilidade sem base
- Borboleta como padrão de fundo repetido

---

## 8. Pendências (dependem da cliente)

- **Logo (BC + wordmark) em SVG.** A arte é raster, não serve para produção
- **Foto do hero:** confirmar que é da cliente ou licenciada. Se for banco/IA, trocar por foto real de cliente com autorização
- **Fotos reais de resultado** (6–9) e fotos do salão
- WhatsApp, endereço, horário, Instagram
- "Agora também em Sorocaba": existe outra unidade? Se sim, definir se a landing é só de Sorocaba
- Lista final de serviços, e se publica "a partir de" em algum
- Qual produto/linha de cabelo usam (alimenta "produtos de qualidade")
- Depoimentos reais, com autorização

---

## 9. Checklist de entrega

- [ ] Contraste AA verificado em todo texto (tabela da seção 1)
- [ ] Nenhum texto dourado sobre fundo lilás/lavanda
- [ ] Foco visível em todos os interativos
- [ ] `alt` descritivo nas fotos
- [ ] Área de toque mínima 44×44px
- [ ] Mensagem de WhatsApp pré-preenchida por serviço
- [ ] Nenhuma métrica, depoimento ou preço inventado
- [ ] `prefers-reduced-motion` respeitado
- [ ] LCP < 2.5s, primeira dobra < 300KB
