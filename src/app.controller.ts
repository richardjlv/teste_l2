import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('empacotamento')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna uma mensagem de saudação' })
  @ApiResponse({ status: 200, description: 'Mensagem de saudação retornada com sucesso.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
