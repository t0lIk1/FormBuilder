import { ConfigModule, ConfigService } from '@nestjs/config';
export declare const databaseConfig: {
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => {
        dialect: string;
        host: string | undefined;
        port: number | undefined;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        autoLoadModels: boolean;
        synchronize: boolean;
    };
};
