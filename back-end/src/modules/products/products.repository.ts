import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { Product } from "./products.entity";

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) { }

    async createProduct(data: Product) {
        const result = await this.prisma.rapide.create({ data } as never);
        return result;
    };

    async getProducts(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize
        const result = await this.prisma.rapide.findMany({ skip, take });
        return result;
    };

    async getOneProduct(id: number) {
        const result = await this.prisma.rapide.findUnique({ where: { id } });
        return result;
    };

    async deleteProduct(id: number) {
        const result = await this.prisma.rapide.delete({ where: { id } });
        return result;
    };

    async updateProduct(id: number, data: Product) {
        const result = await this.prisma.rapide.update({ where: { id }, data });
        return result;
    };
}