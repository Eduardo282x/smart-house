import { Controller, Post } from '@nestjs/common';
import { MainLoadService } from './main-load.service';

@Controller('main-load')
export class MainLoadController {
    constructor(private readonly mainLoadService: MainLoadService) { }

    @Post()
    async seed() {
        return this.mainLoadService.run();
    }
}
