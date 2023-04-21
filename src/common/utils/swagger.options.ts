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
    .setVersion('2.0.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document);
}