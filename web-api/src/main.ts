import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {json} from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(json({limit: '3mb'}));

    const options = new DocumentBuilder()
        .setTitle('Pet Unite')
        .setDescription('descrição da API do projeto')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(config.get('port') || 3000);
}

bootstrap();
