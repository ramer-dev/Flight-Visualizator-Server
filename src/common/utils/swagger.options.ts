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
    .setContact('신희상', 'https://github.com/ramer-dev', 'ramer-dev@kakao.com')
    .setVersion('1.1.5')
    .setBasePath('/v1/api')
    .addBearerAuth({
        type: 'http',
        scheme:'bearer',
        name: 'jwt',
        in: 'header'
    }, 'access-token')
    .build();



    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('v1/api/swagger', app, document);
}