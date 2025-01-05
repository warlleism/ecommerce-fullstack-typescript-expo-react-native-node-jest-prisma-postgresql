import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { Product } from "./products.entity";

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) { }

    async createProduct(data: Product) {
        const result = await this.prisma.rapideProducts.create({ data } as never);
        return result;
    };

    async getProducts(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize
        const result = await this.prisma.rapideProducts.findMany({ skip, take });
        return result;
    };

    async getOneProduct(productid: number) {
        const result = await this.prisma.rapideProducts.findUnique({ where: { productid } });
        return result;
    };

    async deleteProduct(productid: number) {
        const result = await this.prisma.rapideProducts.delete({ where: { productid } });
        return result;
    };

    async updateProduct(productid: number, data: Product) {
        const result = await this.prisma.rapideProducts.update({ where: { productid }, data });
        return result;
    };
}