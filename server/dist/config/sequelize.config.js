"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeConfig = void 0;
const getSequelizeConfig = (configService) => ({
    dialect: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    autoLoadModels: true,
    synchronize: true,
});
exports.getSequelizeConfig = getSequelizeConfig;
//# sourceMappingURL=sequelize.config.js.map