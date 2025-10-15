# api-node-typescript-ddd
Template para una API NodeJs con Clean Architecture

# Construir la imagen
docker build -t api-ats-works-node-ddd .

# Construir una red si no existe
docker network create api-ats-works-network

# Si la red ya existe, conectar el contenedor a la red
docker network connect api-ats-works-network api-ats-works-node-ddd

# Ejecutar el contenedor 

# (Linux)
docker run -d --name api-ats-works-node-ddd --network api-ats-works-network -p 3001:3001 -v $(pwd)/.env:/app/.env api-ats-works-node-ddd

# (Windows PowerShell)
docker run -d --name api-ats-works-node-ddd --network api-ats-works-network -p 3001:3001 -v ${PWD}/.env:/app/.env api-ats-works-node-ddd

# (Windows CMD)
docker run -d --name api-ats-works-node-ddd --network api-ats-works-network -p 3001:3001 -v "%cd%\.env:/app/.env" api-ats-works-node-ddd