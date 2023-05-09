import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 셋팅
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
    .setTitle("Flight Visualizator API Docs")
    .setDescription("비행검사 시각화 서버 API")
    .setTermsOfService('MIT')
    .setContact('신희상', 'https://github.com/ramer-dev', 'ramer-dev@kakao.com')
    .setVersion('1.0.0')
    .setBasePath('localhost:3000')
    .build();



    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document);
}