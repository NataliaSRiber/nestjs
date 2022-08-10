import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
// import { DataBaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notFound.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // adiciona as configurações para o swagger. Ate a linha 22. Isso é so no fim do projeto
  const config = new DocumentBuilder()
    .setTitle('Simple Blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0')
    // .addTag('cats') - opcional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // o api é um endpoint da aplicação, vc pode mudar

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  // app.useGlobalInterceptors(new DataBaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  await app.listen(3000);
  // await app.listen(process.env.PORT || 3000);
}
bootstrap();
