# Backlog - Cuencos

## Tema 1. Web App para Cliente

### Épico 1.1. Página Inicial

#### Feature 1.1.1. Tela Inicial Agradável e Responsiva
**Histórias de Usuário:**
- US08 - Acesso fácil em computador e celular (responsividade)
- US18 - Interface interativa e responsiva

**Tarefas:**
- Criar estrutura básica da página inicial (HTML, CSS, JS)
- Implementar layout responsivo usando media queries
- Adicionar animações/interatividade básica (hover effects, transições)
- Testar compatibilidade em dispositivos móveis

#### Feature 1.1.2. Modal de Boas-Vindas
**História de Usuário:**
- US12 - Modal explicativo ao primeiro acesso

**Tarefas:**
- Criar modal de boas-vindas (HTML/CSS/JS)
- Detectar primeiro acesso do usuário (localStorage)
- Permitir fechar o modal e não exibi-lo novamente

---

### Épico 1.2. Registro/Login

#### Feature 1.2.1. Sistema de Registro e Login
**História de Usuário:**
- US04 - Registro e login de usuários

**Tarefas:**
- Criar formulários de registro e login
- Implementar validação de formulário (campos obrigatórios, senha segura)
- Conectar sistema de autenticação (pode ser simulado/local)
- Redirecionar usuário após login

#### Feature 1.2.2. Alternância de Perfis
**História de Usuário:**
- US17 - Alternar entre visualização de cliente e organizador

**Tarefas:**
- Adicionar botão para alternar perfil
- Controlar visualização de acordo com o tipo de usuário
- Atualizar interface ao alternar

---

### Épico 1.3. Página de Compras

#### Feature 1.3.1. Comprar Ingressos
**Histórias de Usuário:**
- US02 - Compra de ingressos na plataforma
- US19 - Geração de QR Codes fictícios
- US11 - Sair da página sem perder os dados

**Tarefas:**
- Implementar carrinho de compras
- Criar página de checkout
- Gerar QR Code fictício após compra (pode usar libs JS como qrcode.js)
- Aviso de confirmação para fechar a tela

#### Feature 1.3.2. Compartilhamento de Eventos
**História de Usuário:**
- US07 - Compartilhar eventos em redes sociais

**Tarefas:**
- Adicionar botões de compartilhamento (WhatsApp, Instagram, etc.)
- Integrar links dos eventos para compartilhamento

---

### Épico 1.4. Perfil de Usuário

#### Feature 1.4.1. Gerenciar Perfil
**Histórias de Usuário:**
- US06 - Acessar aba "Meus ingressos"
- US10 - Editar dados do perfil

**Tarefas:**
- Criar página "Meu Perfil"
- Listar ingressos comprados
- Implementar edição de informações do usuário

---

### Épico 1.5. Buscar Eventos

#### Feature 1.5.1. Listar e Filtrar Eventos
**Histórias de Usuário:**
- US01 - Visualizar lista de eventos
- US03 - Filtrar eventos por data, local e categoria

**Tarefas:**
- Criar página com listagem de eventos
- Implementar sistema de filtros dinâmicos
- Conectar filtros à busca em tempo real

---

### Épico 1.6. Páginas dos Eventos

#### Feature 1.6.1. Detalhes dos Eventos
**História de Usuário:**
- US05 - Ver detalhes completos dos eventos

**Tarefas:**
- Criar página de detalhes de evento
- Incluir informações como data, local, descrição, preço, categorias
- Adicionar botão de "Comprar ingresso"

#### Feature 1.6.2. Notificações de Eventos Salvos
**História de Usuário:**
- US09 - Receber notificações sobre eventos salvos

**Tarefas:**
- Permitir salvar eventos em "favoritos"
- Criar sistema de lembretes (pode ser uma notificação local ou um alerta no site)

---

## Tema 2. Web App para Organizadores

### Épico 2.1. Página Inicial

#### Feature 2.1.1. Tela Inicial para Organizadores
**História de Usuário:**
- US18 - Interface interativa e responsiva

**Tarefas:**
- Exibir eventos organizados pelo usuário
- Mostrar alertas de vendas recentes

---

### Épico 2.2. Registro/Login

#### Feature 2.2.1. Registro e Login de Organizadores
**História de Usuário:**
- US04 - Registro e login

**Tarefas:**
- Criar formulário de cadastro para organizador
- Implementar autenticação diferenciada

---

### Épico 2.3. Página para Criar Eventos

#### Feature 2.3.1. Criação e Edição de Eventos
**História de Usuário:**
- US13 - Criar e editar eventos

**Tarefas:**
- Criar formulário de criação de eventos
- Permitir editar eventos existentes
- Validar campos obrigatórios (nome, data, local, etc.)

---

### Épico 2.4. Página de Gerenciamento

#### Feature 2.4.1. Controle de Eventos
**História de Usuário:**
- US15 - Envio de confirmações via pop-ups

**Tarefas:**
- Listar eventos criados pelo organizador
- Mostrar status (ativos, esgotados, etc.)
- Implementar sistema de confirmação de ações com pop-ups/modais

---

### Épico 2.5. Página de Estatísticas

#### Feature 2.5.1. Estatísticas de Vendas
**Histórias de Usuário:**
- US14 - Painel com estatísticas de vendas
- US16 - Exportar relatórios em PDF ou Excel

**Tarefas:**
- Exibir gráficos de vendas por evento (pode usar Chart.js)
- Implementar exportação de relatórios (gerar PDF ou Excel)
- Permitir selecionar período de análise (ex: últimos 30 dias)

---

### Épico 2.6. Perfil de Usuário

#### Feature 2.6.1. Gerenciar Perfil de Organizador
**Histórias de Usuário:**
- US10 - Editar dados do perfil
- US20 - Visualizar os eventos do perfil
- US21 - Acessar as páginas de estatísticas e gerenciamento

**Tarefas:**
- Criar página de Perfil do Organizador
- Exibir informações cadastradas do organizador (nome, CNPJ, email)
- Adicionar botão de Editar Dados (opcional para futura edição)
- Garantir que os dados sejam carregados automaticamente após login
- Estilizar a página para ficar consistente com o restante do sistema
- Adicionar botões/links de acesso rápido no Dashboard do Organizador:
  - Link para página de gerenciamento de eventos
  - Link para página de estatísticas de vendas
- Garantir que o menu de navegação destaque opções rápidas ao ser organizador
- Criar atalhos visuais (ex: cards, ícones ou botões grandes)
- Validar se o redirecionamento está funcionando corretamente
