export declare class SalesforceService {
    private readonly CLIENT_ID;
    private readonly CLIENT_SECRET;
    private readonly USERNAME;
    private readonly PASSWORD;
    private readonly AUTH_URL;
    getAccessToken(): Promise<{
        accessToken: any;
        instanceUrl: any;
    }>;
}
