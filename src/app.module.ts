import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './context/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { filmModule } from './context/resource/film/film.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { categoryModule } from './context/resource/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => ({
        
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root2',
        password: '',
        database: 'backend_base',
    
        synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? true,
        logging: config.get<boolean>('DB_LOGGING') ?? false,
    
        autoLoadEntities: true,
    
        charset: 'utf8mb4',
        timezone: 'Z',
    
        // ssl: toBool(dbSsl) ? { rejectUnauthorized: false } : undefined,
    
        migrations: [
          join(process.cwd(), 'dist/core/database/migrations/*.js'),
          join(process.cwd(), 'src/core/database/migrations/*.ts'),
        ],
      })
    }),
    authModule , filmModule, categoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
