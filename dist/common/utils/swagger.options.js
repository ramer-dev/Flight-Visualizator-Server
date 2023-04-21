"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Flight Visualizator API Docs")
        .setDescription("비행검사 시각화 서버 API")
        .setVersion('2.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.options.js.map