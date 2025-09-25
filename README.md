# n8n Random Node

Um node personalizado para n8n que gera números aleatórios verdadeiros usando a API do Random.org.
Feito para o desafio técnico do processo seletivo Recruta [OnFly](https://www.onfly.com.br/).

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js 22.x (LTS)** - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/)

Para verificar se tudo está instalado corretamente:

```bash
node --version  # Deve mostrar v22.x.x
docker --version # Deve mostrar Docker version 20.x+
git --version    # Deve mostrar git version 2.x+
```

## Instalação das Dependências

### 1. Clonar o Repositório

```bash
git clone https://github.com/AndreMenezes03/n8n-random-node.git
cd n8n-random-node
```

### 2. Instalar Dependências do Custom Node

```bash
npm run install-deps
```

Este comando navega para ```custom-nodes/n8n-nodes-random/``` e executa ```npm install```.

### 3. Compilar TypeScript

```bash
npm run build
```

Compila o código TypeScript para JavaScript na pasta ```dist/```.

## Executar o Serviço Localmente

### Método 1: Setup Automático (Recomendado)

```bash
npm run setup
```

Este comando executa automaticamente: install-deps + build + iniciar containers.

### Método 2: Passo a Passo

```bash
# 1. Build do custom node
npm run build

# 2. Iniciar n8n + PostgreSQL com Docker
npm run dev
```

### Verificar se está rodando

```bash
docker-compose ps
```

Você deve ver dois containers rodando:
- ```n8n-random-node-n8n-1``` (porta 5678)
- ```n8n-random-node-postgres-1``` (porta 5432)

## Configuração do Ambiente

### Variáveis de Ambiente

O projeto usa as seguintes configurações no ```docker-compose.yml```:

| Variável | Valor Padrão | Descrição |
|----------|--------------|-----------|
| ```POSTGRES_USER``` | ```n8n_user``` | Usuário do PostgreSQL |
| ```POSTGRES_PASSWORD``` | ```n8n_password_secure``` | Senha do PostgreSQL |
| ```POSTGRES_DB``` | ```n8n``` | Nome do banco de dados |
| ```N8N_CUSTOM_EXTENSIONS``` | ```/home/node/.n8n/custom``` | Pasta dos custom nodes |

### Configuração do Banco de Dados

- **Tipo:** PostgreSQL 15
- **Host:** ```postgres``` (container Docker)
- **Porta:** 5432
- **Auto-criação:** Banco criado automaticamente


## Executar os Testes

1. Acesse: http://localhost:5678
2. Configure sua conta na primeira execução
3. Crie um novo workflow:
   - Adicione um "Manual Trigger"
   - Adicione o node "Random"
   - Configure: Min=1, Max=1000
4. Execute e verifique o resultado

### Exemplo de Output Esperado

```json
{
  "randomNumber": 329,
  "min": 1,
  "max": 1000,
  "source": "random.org",
  "timestamp": "2025-09-22T20:32:38.785Z"
}
```

## Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Setup Completo** | ```npm run setup``` | Instala deps + build + inicia containers |
| **Instalar Deps** | ```npm run install-deps``` | Instala dependências do custom node |
| **Build** | ```npm run build``` | Compila TypeScript |
| **Iniciar** | ```npm run dev``` | Inicia containers (n8n + PostgreSQL) |
| **Parar** | ```npm run stop``` | Para todos os containers |
| **Reiniciar** | ```npm run restart``` | Reinicia containers |
| **Logs** | ```npm run logs``` | Mostra logs do n8n |

## Solução de Problemas

### Node não aparece na interface

```bash
# Rebuild + restart
npm run build
npm run restart
```

### Containers não iniciam

```bash
# Verificar se Docker Desktop está rodando
docker --version

# Limpar containers antigos
docker-compose down --volumes
docker system prune -f

# Tentar novamente
npm run dev
```

### Erro na API Random.org

```bash
# Testar conectividade manual
curl "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new"
```

## Suporte

- **Issues:** [GitHub Issues](https://github.com/AndreMenezes03/n8n-random-node/issues)
- **Comunidade n8n:** [community.n8n.io](https://community.n8n.io/)
- **Docs n8n:** [docs.n8n.io](https://docs.n8n.io/)

## Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

