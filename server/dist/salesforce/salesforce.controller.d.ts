import { SalesforceService } from './salesforce.service';
export declare class SalesforceController {
    private readonly salesforceService;
    constructor(salesforceService: SalesforceService);
    getToken(): Promise<{
        accessToken: any;
        instanceUrl: any;
    }>;
}
