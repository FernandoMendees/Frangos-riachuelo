# Frango Assado Riachuelo — cardápio digital

Projeto em HTML, CSS e JavaScript puro (sem frameworks). Antes de publicar,
preencha as informações comerciais abaixo. Tudo fica centralizado no topo de
**`js/app.js`**, no objeto `CONFIG`.

## 1. Número do WhatsApp
Arquivo: `js/app.js` → `CONFIG.whatsappNumber`
Preencha com o número comercial, somente dígitos, com código do país (sem
espaços, parênteses ou traços). Exemplo: `"5511999998888"`.
Enquanto estiver vazio, o botão "Finalizar pedido pelo WhatsApp" mostra um
aviso de configuração pendente em vez de abrir um link quebrado.

## 2. Endereço comercial
Arquivo: `js/app.js` → `CONFIG.businessAddress`
Usado na opção "Retirada no local" e no rodapé do site. Exemplo:
`"Rua Riachuelo, 123 - Centro"`.

## 3. Preços dos produtos
Arquivo: `js/app.js` → `CONFIG.products[].price`
Cada produto começa com `price: null` e exibe "Preço a definir" — o botão de
adicionar fica desativado até um valor ser informado. Use números com ponto
decimal, em reais. Exemplo: `price: 34.90`.

## 4. Descrições dos produtos
Arquivo: `js/app.js` → `CONFIG.products[].description`
Enquanto vazio, o card mostra "Descrição em breve". Escreva um texto curto
para cada produto.

## 5. Imagens dos produtos
Arquivo: `js/app.js` → `CONFIG.products[].image` (e a imagem do hero,
diretamente em `index.html`, no `<img id="hero-image">`).
Coloque os arquivos de foto em `assets/images/` com os mesmos nomes já
referenciados (`frango-assado.jpg`, `maionese-caseira.jpg`,
`feijao-tropeiro.jpg`, `porcoes-batata.jpg`, `frango-assado-hero.jpg`) ou
ajuste os caminhos no `CONFIG`. Até lá, cada card exibe um ícone ilustrativo
no lugar da foto — o site funciona normalmente sem as imagens.

## Outras alterações centralizadas
- **Desativar um produto temporariamente:** mude `available: false`.
- **Adicionar um novo produto:** copie um bloco dentro de `CONFIG.products`
  e ajuste `id`, `name`, `description`, `price` e `image`.
- **Texto da seção "Nossa Proposta":** editável diretamente em `index.html`,
  na seção `<section class="proposta">`.

## Estrutura do projeto
```
frango-assado-riachuelo/
├── index.html        → estrutura e conteúdo da página
├── css/style.css      → identidade visual, layout e responsividade
├── js/app.js          → CONFIG, carrinho, cálculos e integração com WhatsApp
└── assets/
    ├── images/        → fotos dos produtos (adicionar aqui)
    └── icons/         → reservado para ícones adicionais, se necessário
```

## O que já foi verificado
- Produtos renderizados a partir do `CONFIG`, com preço/descrição pendentes
  tratados de forma elegante.
- Carrinho com quantidade, subtotal e total recalculados em tempo real
  (`Intl.NumberFormat('pt-BR')`, valores internos em centavos).
- Entrega sempre gratuita — nenhuma taxa é somada ao total, em nenhuma
  modalidade.
- Campo de endereço obrigatório apenas na modalidade "Entrega".
- Bloqueio de finalização com carrinho vazio ou com item sem preço
  configurado.
- Mensagem do WhatsApp gerada dinamicamente (acentuação preservada via
  `encodeURIComponent`), abrindo o chat com o texto pronto para envio manual.
- Layout mobile-first, com testes de estrutura em telas pequenas, tablets e
  desktop.
- Modal com fechamento por botão, tecla Esc e clique fora, com foco
  controlado por teclado.
