---
id: brainstorm
title: Brainstorm
---

## Introdução
<p align="justify">
O brainstorm é uma técnica de elicitação de requisitos que consiste em reunir a equipe para discutir tópicos gerais do projeto apresentados no documento problema de negócio. Durante o brainstorm, o diálogo é incentivado e críticas são evitadas, permitindo que todos colaborem com suas próprias ideias de forma livre e criativa.
</p>

## Metodologia
<p align="justify">
A equipe se reuniu via Discord para debater ideias gerais sobre o projeto. A sessão começou às 14:53 e terminou às 17:53. Guilherme Reis atuou como moderador, direcionando a equipe com questões pré-elaboradas e transcrevendo as respostas para o documento.
</p>

## Brainstorm

### Versão 1.0

### Perguntas

#### 1. Qual o objetivo principal da aplicação?
<p align="justify">
<b>1</b> - A plataforma deve fornecer uma solução intuitiva para compra, venda e gestão de ingressos para eventos universitários.<br>
<b>2</b> - O objetivo da aplicação é conectar organizadores e estudantes, facilitando a divulgação e o gerenciamento de eventos.<br>
<b>3</b> - O principal objetivo da aplicação é permitir que qualquer aluno compre ingressos de forma rápida e segura em uma plataforma nichada para universitários.<br>
<b>4</b> - A plataforma deve gerenciar eventos, ingressos e pagamentos de forma automatizada.<br>
<b>5</b> - A aplicação tem como objetivo auxiliar as atléticas na organização financeira e logística dos eventos.
</p>

---

#### 2. Como será o processo para cadastrar um novo cliente ou torneio?
<p align="justify">
<b>1</b> - O usuário poderá preencher um formulário de cadastro salvo em localStorage.<br>
<b>2</b> - O cliente verá um modal de login.<br>
<b>3</b> - O site exibirá um nome de usuário pré-definido após o "login".
</p>

---

#### 3. Como será a forma de adicionar produtos?
<p align="justify">
<b>1</b> - Os eventos e ingressos serão exibidos a partir de um JSON ou arquivo local.<br>
<b>2</b> - O usuário poderá visualizar diferentes tipos de ingressos, mas a compra será apenas simulada.<br>
<b>3</b> - A aplicação incluirá um botão de "Comprar" que exibirá um modal de sucesso.
</p>

---

#### 4. Como seria a forma do cliente adicionar produtos?
<p align="justify">
<b>1</b> - O organizador poderá acessar uma página de cadastro de evento que preencherá um JSON local.
</p>

---

#### 5. Quais informações seriam interessantes para o cliente?
<p align="justify">
<b>1</b> - Informações sobre o evento, local, horário e organizador, além de um sistema de filtro por categoria.<br>
<b>2</b> - O usuário poderá visualizar ingressos disponíveis e preços.<br>
<b>3</b> - O site exibirá QR Codes fictícios para cada ingresso comprado.
</p>

---

## Requisitos elicitados
| ID   | Descrição                                                                 |
|------|---------------------------------------------------------------------------|
| BS01 | O usuário poderá visualizar uma lista de eventos disponíveis.            |
| BS02 | O usuário poderá simular uma compra de ingresso.                         |
| BS03 | A interface deve permitir filtragem de eventos por data, local e categoria. |
| BS04 | O sistema deve ter a funcionalidade de login e registro usando localStorage. |
| BS05 | O site deve exibir detalhes completos de cada evento.                    |
| BS06 | O sistema deve permitir a geração de QR Codes fictícios.                 |
| BS07 | O usuário poderá visualizar ingressos em uma aba "Meus ingressos".       |
| BS08 | A interface deve ser responsiva e funcionar bem em dispositivos móveis.  |
| BS09 | O sistema deve permitir que organizadores criem e editem eventos.        |
| BS10 | O sistema deve oferecer um painel de controle para organizadores com estatísticas de vendas. |
| BS11 | A aplicação deve suportar notificações para lembrar os usuários de eventos futuros. |
| BS12 | O sistema deve permitir integração com redes sociais para compartilhamento de eventos. |
| BS13 | O sistema deve oferecer suporte a múltiplos idiomas.                     |
| BS14 | A aplicação deve garantir a segurança dos dados dos usuários.            |
| BS15 | O sistema deve permitir a exportação de relatórios de vendas em formato PDF ou Excel. |
| BS16 | Os dados de usuários, eventos e ingressos devem ser armazenados em LocalStorage. |
| BS17 | A aplicação deve funcionar totalmente offline após o primeiro carregamento (PWA básica). |
| BS18 | O sistema deve exibir mensagens de erro amigáveis caso haja falha ao salvar dados no LocalStorage. |
| BS19 | O sistema deve exibir um modal de boas-vindas para novos usuários.        |
| BS20 | A aplicação deve permitir que o usuário edite seus dados salvos no LocalStorage. |
| BS21 | O sistema deve apresentar uma interface interativa usando HTML, CSS e JavaScript puro (ou com biblioteca leve como Vue/React, se permitido). |
| BS22 | O sistema deve apresentar um aviso ao tentar sair da página com dados não salvos. |
| BS23 | O sistema deve resetar o LocalStorage com uma opção no painel de controle (modo organizador). |
| BS24 | O sistema deve simular o envio de emails ou confirmações apenas com modais/pop-ups. |
| BS25 | A plataforma deve simular diferentes perfis (organizador e cliente) com base em login salvo localmente. |

## Conclusão
<p align="justify">
A aplicação da técnica de brainstorm permitiu elicitar os primeiros requisitos do projeto, fornecendo uma base sólida para o desenvolvimento inicial.
</p>

## Referências Bibliográficas
> [Cheers.com.br](https://cheers.com.br)  
> [Ingresso.com.br](https://www.ingresso.com)

## Autores
| Data       | Versão | Parte Feita            | Contribuidores                          |
|------------|--------|------------------------|-----------------------------------------|
| 28/03/2025 | 1.0    | Criação do documento   | Enrique Labre                           |
| 29/03/2025 | 2.0    | Debate de Brainstorm   | Anderson Lima, Bernardo Casanovas, Guilherme Reis |
| 29/03/2025 | 2.1    | Adicionar no documento | Guilherme Reis                          |
| 30/03/2025 | 2.2    | Revisão do documento   | Bernardo Casanovas, Enrique Labre       |
