import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/swagger.options';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cspOptions = {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ['']
    }
  }

  const xFrameOptions = {

  }
  setupSwagger(app);
  app.setGlobalPrefix('/v1/api')
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

