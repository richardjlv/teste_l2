# Sistema de Empacotamento - Seu Manoel 📦

API para automatizar o processo de embalagem de pedidos da loja de jogos do Seu Manoel.

## 📋 Descrição

Esta API recebe pedidos com produtos e suas dimensões, e calcula a melhor forma de empacotá-los nas caixas disponíveis, utilizando um algoritmo 3D otimizado que minimiza o número de caixas utilizadas.

### 🎯 Funcionalidades

- ✅ Recebe pedidos com produtos e dimensões
- ✅ Calcula empacotamento 3D otimizado
- ✅ Suporta rotações automáticas dos produtos
- ✅ Minimiza o número de caixas utilizadas
- ✅ Identifica produtos que não cabem
- ✅ API documentada com Swagger

### 📦 Caixas Disponíveis

| Caixa   | Dimensões (A x L x C) | Volume    |
|---------|----------------------|-----------|
| Caixa 1 | 30 x 40 x 80 cm     | 96.000 cm³ |
| Caixa 2 | 50 x 50 x 40 cm     | 100.000 cm³ |
| Caixa 3 | 50 x 80 x 60 cm     | 240.000 cm³ |

### 🧠 Algoritmo

O sistema utiliza **First Fit Decreasing** com simulação 3D:
1. Ordena produtos por maior dimensão individual
2. Tenta posicionar em caixas existentes (Best Fit)
3. Simula posicionamento 3D real com verificação de colisão
4. Testa todas as rotações possíveis
5. Cria nova caixa se necessário

## 🚀 Como Executar

### 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker (opcional)

### 🔧 Execução Local (sem Docker)

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em desenvolvimento:**
```bash
npm run start:dev
```

3. **Executar em produção:**
```bash
npm run build
npm run start:prod
```

4. **Acessar a aplicação:**
- API: http://localhost:3000
- Swagger: http://localhost:3000/api

### 🐳 Execução com Docker

1. **Build da imagem:**
```bash
docker build -t packing-api .
```

2. **Executar container:**
```bash
docker run -p 3000:3000 packing-api
```

3. **Acessar a aplicação:**
- API: http://localhost:3000
- Swagger: http://localhost:3000/api

## 📝 API Endpoints

### POST /empacotamento

Processa uma lista de pedidos e retorna o empacotamento otimizado.

#### Exemplo de Entrada:
```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "produtos": [
        {
          "produto_id": "PS5",
          "dimensoes": {
            "altura": 40,
            "largura": 10,
            "comprimento": 25
          }
        }
      ]
    }
  ]
}
```

#### Exemplo de Saída:
```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "caixas": [
        {
          "caixa_id": "Caixa 1",
          "produtos": ["PS5"]
        }
      ]
    }
  ]
}
```

## 🏗️ Arquitetura

```
src/
├── controllers/          # Controladores REST
│   ├── app.controller.ts
│   └── packing.controller.ts
├── services/            # Lógica de negócio
│   ├── app.service.ts
│   └── packing.service.ts
├── models/              # Modelos de domínio
│   ├── product.model.ts
│   ├── box.model.ts
│   └── packed-box.model.ts
├── dto/                 # DTOs de entrada/saída
│   ├── dimensions.dto.ts
│   ├── product.dto.ts
│   ├── packing-input.dto.ts
│   └── packing-output.dto.ts
└── main.ts             # Bootstrap da aplicação
```

## 🔧 Tecnologias

- **Framework:** NestJS
- **Linguagem:** TypeScript
- **Validação:** class-validator, class-transformer
- **Documentação:** Swagger/OpenAPI
- **Container:** Docker

```bash
$ npm install -g @nestjs/mau
## 📊 Exemplo Completo

### Testando com cURL:

```bash
curl -X POST http://localhost:3000/empacotamento \
  -H "Content-Type: application/json" \
  -d '{
    "pedidos": [
      {
        "pedido_id": 1,
        "produtos": [
          {
            "produto_id": "PS5",
            "dimensoes": {
              "altura": 40,
              "largura": 10,
              "comprimento": 25
            }
          },
          {
            "produto_id": "Volante",
            "dimensoes": {
              "altura": 40,
              "largura": 30,
              "comprimento": 30
            }
          }
        ]
      }
    ]
  }'
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
