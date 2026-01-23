import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FE-1 Made Simple API',
    version: '1.0.0',
    description: 'Backend API for Irish FE-1 examination preparation platform',
    contact: {
      name: 'FE-1 Made Simple',
      email: 'fe1madesimple@gmail.com',
    },
    license: {
      name: 'Proprietary',
      url: 'https://fe1madesimple.ie',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
    {
      url: 'https://api.fe1madesimple.ie',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
    },
    schemas: {
      UserProfile: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'clp_user_123',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          fullName: {
            type: 'string',
            example: 'John Doe',
          },
          role: {
            type: 'string',
            enum: ['STUDENT', 'HOST', 'ADMIN'],
            example: 'STUDENT',
          },
          profileColor: {
            type: 'string',
            example: '#3B82F6',
          },
          isEmailVerified: {
            type: 'boolean',
            example: true,
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
          statusCode: {
            type: 'integer',
            example: 400,
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
      Success: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Operation successful',
          },
          data: {
            type: 'object',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/modules/**/*.ts', './src/modules/**/*.routes.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
