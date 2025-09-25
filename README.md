
# n8n Random Node

Um node personalizado para n8n que gera **números aleatórios verdadeiros** usando a API do Random.org.
Feito para o desafio técnico do processo seletivo Recruta [OnFly](https://www.onfly.com.br/).

![n8n Version](https://img.shields.io/badge/n8n-1.85.4-orange)
![Node.js](https://img.shields.io/badge/node.js-22.x-green)
![Docker](https://img.shields.io/badge/docker-compose-blue)
![License](https://img.shields.io/badge/license-MIT-green)


## Quick Start

### Pré-requisitos
- **Node.js 22.x (LTS)**
- **Docker Desktop** 

### Instalação 
```bash
# 1. Clone o repositório
git clone https://github.com/AndreMenezes03/n8n-random-node.git
cd n8n-random-node

# 2. Instalar dependências do custom node
npm run install-deps

# 3. Build do TypeScript
npm run build

# 4. Iniciar n8n com Docker
npm run dev
```

### Verificação
1. Abra seu navegador
2. Acesse: http://localhost:5678
3. Configure sua conta na primeira execução
4. Crie um novo workflow
5. Adicione um node "Manual Trigger"
6. Procure e adicione o node "Random"
7. Configure os parâmetros:
    -    Min Value: 1
    -    Max Value: 100
8. Execute o workflow clicando em "Execute Workflow"

### Exemplo de Output
```json
{
  "randomNumber": 42,
  "min": 1,
  "max": 100,
  "source": "random.org",
  "timestamp": "2025-09-22T20:32:38.785Z"
}
```
## Se o Node não aparece na interface
```bash
# Rebuild + restart
npm run build
npm run restart
```

## Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.
