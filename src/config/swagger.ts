import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'products',
        description: 'API operations related to products',
      },
    ],
    info: {
      title: 'REST API NodeJS/Express/TS',
      version: '1.0.0',
      description: 'API Docs for Products',
    },
  },
  apis: ['./src/routes/productsRouter.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
