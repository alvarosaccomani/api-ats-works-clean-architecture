import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación - ATS Works Clean Architecture',
      version: '1.0.0',
      description: 'Documentación de la ATS Works Clean Architecture.',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Cambia esto según tu entorno
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/infrastructure/router/**/*.route.ts'], // Rutas donde están los comentarios JSDoc
};

const specs = swaggerJsDoc(options);

export default specs;