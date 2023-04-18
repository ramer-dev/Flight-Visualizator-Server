"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptionsFactory = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mkdir = (directory) => {
    const logger = new common_1.Logger('Mkdir');
    try {
        fs_1.default.readdirSync(path_1.default.join(process.cwd(), directory));
    }
    catch (err) {
        logger.log(`지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`);
        logger.log(process.cwd(), directory);
        fs_1.default.mkdirSync(path_1.default.join(process.cwd(), directory));
    }
};
mkdir('uploads');
const multerOptionsFactory = () => {
    return {
        storage: multer_1.default.diskStorage({
            destination(req, file, done) {
                done(null, path_1.default.join(process.cwd(), 'uploads'));
            },
            filename(req, file, done) {
                const ext = path_1.default.extname(file.originalname);
                const basename = path_1.default.basename(file.originalname, ext);
                done(null, `${basename}_${Date.now()}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    };
};
exports.multerOptionsFactory = multerOptionsFactory;
//# sourceMappingURL=multer.options.factory.js.map