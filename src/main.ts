import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildGlobalValidationPipe } from './core/http/validation/validation.pipe';
import { HttpExceptionFilter } from './core/http/exceptions/http.exception';
import { ResponseInterceptor } from './core/http/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(buildGlobalValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor)
  app.useGlobalFilters( new HttpExceptionFilter )

  const config = new DocumentBuilder()
    .setTitle('Mon API')
    .setDescription('Documentation de mon projet NestJS')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4002);
}
bootstrap();
