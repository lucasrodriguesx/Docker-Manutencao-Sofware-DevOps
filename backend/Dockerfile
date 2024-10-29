# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do conteúdo da pasta 'backend' para o diretório de trabalho do container
COPY . .

# Expõe a porta 3000 para permitir acesso ao container
EXPOSE 3000

# Define o comando para iniciar a API
CMD ["node", "server.mjs"]
