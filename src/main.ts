import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildGlobalValidationPipe } from './core/http/validation/validation.pipe';
import { HttpExceptionFilter } from './core/http/exceptions/http.exception';
import { ResponseInterceptor } from './core/http/interceptors/response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(buildGlobalValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor)
  app.useGlobalFilters( new HttpExceptionFilter )
  
  await app.listen(process.env.PORT ?? 4002);
  
}
bootstrap();
