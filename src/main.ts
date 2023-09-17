import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/swagger.options';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {

  
  // const httpsOptions = {
  //   key: readFileSync('./localCA.pem'),
  //   cert: readFileSync('./localhost.test.pem')

  // }

  const app = await NestFactory.create(AppModule, {}); 
  const cspOptions = {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(), 
      "img-src": ['']
    }
  }



  const xFrameOptions = {

  }
  app.setGlobalPrefix('/v1/api')

  setupSwagger(app);
  
  app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }))
  app.use(helmet.hidePoweredBy())
  app.use(helmet.xssFilter())
  // app.use(helmet.frameguard)
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  await app.listen(7000);
  app.use(csurf())

}
bootstrap();

