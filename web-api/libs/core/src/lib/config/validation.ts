import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    PORT: Joi.number().default(3000),
    API_URL: Joi.string().required().default('http://localhost:3000/api'),
    APP_URL: Joi.string().required().default('http://localhost:4200'),
    DB_CONN: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number(),
    SMTP_USER: Joi.string().required(),
    SMTP_PASS: Joi.string().required(),
});
