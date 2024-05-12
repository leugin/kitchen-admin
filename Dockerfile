# Usa una imagen base con Node.js
FROM node:lts-alpine3.18

# Establece el directorio de trabajo en /app
WORKDIR /app

RUN npm install -g @vue/cli


