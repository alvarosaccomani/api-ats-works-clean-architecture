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
    components: {
      schemas: {
        UserEntity: {
          type: 'object',
          properties: {
            usr_uuid: { type: 'string' },
            usr_name: { type: 'string' },
            usr_surname: { type: 'string' },
            usr_password: { type: 'string' },
            usr_image: { type: 'string' },
            usr_email: { type: 'string' },
            usr_nick: { type: 'string' },
            usr_bio: { type: 'string' },
            usr_registered: { type: 'string', format: 'date-time' },
            usr_socket: { type: 'string' },
            usr_online: { type: 'boolean' },
            usr_confirmed: { type: 'boolean' },
            usr_confirmationtoken: { type: 'string' },
            usr_resetpasswordtoken: { type: 'string' },
            usr_resetpasswordexpires: { type: 'string', format: 'date-time' },
            usr_createdat: { type: 'string', format: 'date-time' },
            usr_updatedat: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/router/**/*.route.ts'], // Rutas donde están los comentarios JSDoc
};

const specs = swaggerJsDoc(options);

export default specs;