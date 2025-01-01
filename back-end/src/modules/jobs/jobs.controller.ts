import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { Job } from './jobs.entity';

@Controller('jobs')
export class JobsController {
    constructor(private repo: JobsRepository) { }

    @Post('create')
    async createJob(@Body() data: Job) {

        if (Object.values(data).some(value => value === '')) {
            return {
                message: 'All fields are required',
                status: HttpStatus.BAD_REQUEST
            }
        };

        try {
            const result = await this.repo.createJob(data);
            return {
                message: 'Job created successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error creating job',
                error: error.message,
                status: HttpStatus.BAD_REQUEST

            };
        }
    };

    @Get('get')
    async getJobs() {
        try {
            const result = await this.repo.getJobs(1, 10);
            return {
                message: 'Jobs fetched successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting jobs',
                error: error.message,
                status: HttpStatus.BAD_REQUEST

            };
        }
    };

    @Patch('update')
    async updateJob(@Body() data: Job) {
        try {
            const result = await this.repo.updateJob(data.id, data);
            return {
                message: 'Job updated successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error updating job',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    };

    @Get('get/id')
    async getOneJob(@Query('id') id: number) {
        try {
            const result = await this.repo.getOneJob(id);
            return {
                message: 'Job fetched successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting job',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    };

    @Delete('delete')
    async deleteJob(@Query('id') id: number) {
        try {
            const result = await this.repo.deleteJob(+id);
            return {
                message: 'Job deleted successfully',
                data: result,
                status: HttpStatus.OK
            };
        } catch (error) {
            return {
                message: 'Error deleting job',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }
}
