# 🍰 SnackFOOD - Sistema Completo de Delivery

Sistema completo de delivery de bolos, doces e salgados com app React Native e painel administrativo web.

## 📱 Componentes do Sistema

### 1. **App Mobile (React Native + Expo)**
- Interface moderna e intuitiva
- Catálogo de produtos por categoria
- Carrinho de compras
- Sistema de pedidos em tempo real
- Suporte para diferentes formas de pagamento

### 2. **Servidor Backend (Node.js + Express)**
- API REST completa
- Controle de estoque em tempo real
- Gerenciamento de pedidos
- Endpoints para integração

### 3. **Painel Administrativo (Web)**
- Dashboard com estatísticas
- Controle de estoque
- Gestão de pedidos
- Interface responsiva

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI (`npm install -g @expo/cli`)
- Navegador web moderno

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Iniciando o Servidor Backend
```bash
# Opção 1: Via npm script
npm run server

# Opção 2: Via arquivo batch (Windows)
start-server.bat

# Opção 3: Direto
node server.js
```

O servidor estará disponível em: `http://localhost:3000`

### 3. Iniciando o App Mobile
```bash
# Em outro terminal
npm start
# ou
npx expo start
```

### 4. Acessando o Painel Administrativo

Abra o arquivo `painel-admin.html` no seu navegador ou acesse via servidor web.

**⚠️ Importante:** Ajuste o IP no arquivo `api.js` e no `painel-admin.html` para o IP da sua máquina se for testar em dispositivos físicos.

## 📋 Endpoints da API

### Cardápios
- `GET /bolos` - Lista de bolos
- `GET /doces` - Lista de doces  
- `GET /salgados` - Lista de salgados

### Estoque
- `GET /estoque` - Consultar estoque
- `PUT /estoque/:nome` - Atualizar quantidade do produto

### Pedidos
- `GET /pedidos` - Listar todos os pedidos
- `POST /pedidos` - Criar novo pedido
- `PUT /pedidos/:id/concluir` - Marcar pedido como concluído

## 📊 Estrutura de Dados

### Pedido
```json
{
  "nomeCliente": "Nome do Cliente",
  "endereco": "Endereço de entrega",
  "telefone": "11999999999",
  "formaPagamento": "Pix",
  "itens": [
    {
      "nome": "Bolo de 15cm",
      "quantidade": 1,
      "price": "110,00",
      "recheio": "chocolate"
    }
  ],
  "total": 110.00
}
```

### Produto do Estoque
```json
{
  "nome": "Bolo de 15cm",
  "quantidade": 10
}
```

## 🔧 Configurações

### Alterar IP do Servidor
1. **Para o app**: Edite o arquivo `api.js`
2. **Para o painel**: Edite a variável `API_URL` no `painel-admin.html`

```javascript
export const API_URL = "http://SEU_IP:3000";
```

### Personalizar Produtos
Edite o array `cardapios` no arquivo `server.js` para adicionar/remover produtos.

## 📱 Funcionalidades do App

- ✅ Navegação por categorias (Bolos, Doces, Salgados)
- ✅ Adicionar produtos ao carrinho
- ✅ Finalizar pedido com dados do cliente
- ✅ Múltiplas formas de pagamento
- ✅ Chave PIX para pagamento
- ✅ Validação de formulários
- ✅ Feedback visual de carregamento

## 🖥️ Funcionalidades do Painel

- ✅ Dashboard com métricas em tempo real
- ✅ Controle de estoque com alertas
- ✅ Visualização de todos os pedidos
- ✅ Marcar pedidos como concluídos
- ✅ Atualização automática de dados
- ✅ Interface responsiva para mobile

## 🎨 Customização

### Cores e Tema
- Edite os estilos nos arquivos `.jsx` para o app
- Modifique o CSS no `painel-admin.html` para o painel

### Imagens
- Adicione novas imagens na pasta `assets/images/`
- Atualize o `imageMap` no `MenuScreen.jsx`

## 📞 Suporte

O sistema está totalmente funcional e integrado. Para dúvidas ou problemas:

1. Verifique se o servidor está rodando na porta 3000
2. Confirme se o IP está correto nos arquivos de configuração
3. Teste os endpoints diretamente no navegador

## 🔄 Atualizações Automáticas

- O painel administrativo atualiza automaticamente a cada 30 segundos
- O app sincroniza com o servidor a cada busca de dados
- O estoque é atualizado em tempo real com cada pedido

---

**Sistema desenvolvido para a SnackFOOD** 🍰

## Estrutura de Pastas
```
SnackFOOD_ExpoApp vscode/
├── App.js
├── app.json
├── eas.json
├── index.jsx
├── assets/
│   └── images/
│       └── (imagens dos produtos)
├── components/
│   ├── Layout.jsx
│   └── ProductCard.jsx
├── screens/
│   ├── HomeScreen.jsx
│   ├── MenuScreen.jsx
```


## Dependências principais
- react-native
- expo
- react-navigation


---
Desenvolvido por Fredson Maikon
