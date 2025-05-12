"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let SalesforceService = class SalesforceService {
    CLIENT_ID = process.env.SF_CLIENT_ID;
    CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
    USERNAME = process.env.SF_USERNAME;
    PASSWORD = process.env.SF_PASSWORD;
    AUTH_URL = 'https://login.salesforce.com/services/oauth2/token';
    async getAccessToken() {
        const payload = new URLSearchParams({
            grant_type: 'password',
            client_id: this.CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            username: this.USERNAME,
            password: this.PASSWORD,
        });
        try {
            console.log(this.AUTH_URL);
            console.log(payload);
            const response = await axios_1.default.post(this.AUTH_URL, payload);
            console.log(response);
            return {
                accessToken: response.data.access_token,
                instanceUrl: response.data.instance_url,
            };
        }
        catch (error) {
            console.error('Salesforce auth failed:', error.response?.data || error.message);
            throw new common_1.HttpException('Failed to authenticate with Salesforce', 500);
        }
    }
};
exports.SalesforceService = SalesforceService;
exports.SalesforceService = SalesforceService = __decorate([
    (0, common_1.Injectable)()
], SalesforceService);
//# sourceMappingURL=salesforce.service.js.map