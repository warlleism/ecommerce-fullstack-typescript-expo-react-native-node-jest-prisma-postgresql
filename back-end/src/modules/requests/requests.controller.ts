import { Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';

@Controller('requests')
export class RequestsController {
    constructor(private repo: RequestsRepository) { }

    @Post('create')
    async createRequest(@Query('id') id: number) {
        try {
            const Request = { requestproductid: +id }
            const result = await this.repo.createRequest(Request);
            return {
                message: 'Request created successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error creating request',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }

    @Get('get')
    async getRequests() {
        const result = await this.repo.getRequests();
        return {
            message: 'Requests fetched successfully',
            data: result,
            status: HttpStatus.OK
        }
    }
}
