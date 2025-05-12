import { Controller, Get } from '@nestjs/common';
import { SalesforceService } from './salesforce.service';

@Controller('salesforce')
export class SalesforceController {
  constructor(private readonly salesforceService: SalesforceService) {}

  @Get('token')
  getToken() {
    return this.salesforceService.getAccessToken();
  }
}
