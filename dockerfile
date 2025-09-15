# Usa una imagen de Node oficial
FROM node:18

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "src/app.js"]
