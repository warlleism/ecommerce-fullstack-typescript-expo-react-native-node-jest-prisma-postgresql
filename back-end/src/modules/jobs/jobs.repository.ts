import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { Job } from "./jobs.entity";

@Injectable()
export class JobsRepository {
    constructor(private prisma: PrismaService) { }

    async createJob(data: Job) {
        const result = await this.prisma.job.create({ data } as never);
        return result;
    };

    async getJobs(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize
        const result = await this.prisma.job.findMany({ skip, take });
        return result;
    };

    async getOneJob(id: number) {
        const result = await this.prisma.job.findUnique({ where: { id } });
        return result;
    };

    async deleteJob(id: number) {
        const result = await this.prisma.job.delete({ where: { id } });
        return result;
    };

    async updateJob(id: number, data: Job) {
        const result = await this.prisma.job.update({ where: { id }, data });
        return result;
    };
}