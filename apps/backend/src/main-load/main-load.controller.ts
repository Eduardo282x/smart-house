import { Controller, Get } from '@nestjs/common';
import { MainLoadService } from './main-load.service';

@Controller('main-load')
export class MainLoadController {

    constructor(private readonly mainLoadService: MainLoadService) {
        
    }

    @Get()
    async mainLoad(){
        return await this.mainLoadService.mainLoad();
    }
}
