import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '100000mb'}));
  app.use(bodyParser.urlencoded({limit: '100000mb', extended: true}));
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CloudHumans API')
    .setDescription('API responsible for allocation of CloudPro.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4500);
}
bootstrap();
