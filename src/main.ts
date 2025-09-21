import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Packing System - Seu Manoel')
    .setDescription(`
      API to automate the order packing process for Seu Manoel's game store.
      
      **Available Boxes:**
      - Caixa 1: 30 x 40 x 80 cm
      - Caixa 2: 50 x 50 x 40 cm  
      - Caixa 3: 50 x 80 x 60 cm
      
      **Algorithm:** First Fit Decreasing - optimizes packing by trying to minimize the number of boxes used.
    `)
    .setVersion('1.0')
    .addTag('empacotamento', 'Order packing operations')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application running at: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📖 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
