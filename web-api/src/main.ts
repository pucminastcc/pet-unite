import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder, SwaggerDocumentOptions} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Documentação')
        .setDescription('descrição da API do projeto')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(config.get('port') || 3000);
}

bootstrap();
