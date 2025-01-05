import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";

@Injectable()
export class RequestsRepository {
    constructor(private prismaService: PrismaService) { }

    async createRequest(data: any) {
        const result = await this.prismaService.rapideRequests.create({ data });
        return result;
    }

    async getRequests() {
        const query = await this.prismaService.$queryRaw<any[]>`
        SELECT 
	        "RapideProducts".*,
	        COUNT("RapideRequests"."requestproductid") AS "total_requests"
        FROM "RapideProducts"
        INNER JOIN "RapideRequests" 
        ON "RapideRequests"."requestproductid" = "RapideProducts"."productid"
        GROUP BY "RapideProducts"."productid"
        HAVING COUNT("RapideRequests"."requestproductid") > 3
        `;

        const result = query.map(row => {
            return Object.fromEntries(
                Object.entries(row).map(([key, value]) =>
                    typeof value === 'bigint' ? [key, value.toString()] : [key, value]
                )
            );
        });

        return result;
    }

}