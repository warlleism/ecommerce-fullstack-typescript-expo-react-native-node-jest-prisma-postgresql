import { Body, Controller, UploadedFile, Delete, Get, HttpStatus, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Product')
export class ProductsController {
    constructor(private repo: ProductsRepository) { }


    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
        const folderPath = path.join(__dirname, '../../../src/images/products');
        console.log(folderPath)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        if (Object.values(data).some(value => value === '')) {
            return {
                message: 'All fields are required',
                status: HttpStatus.BAD_REQUEST
            };
        }

        try {
            const newFileName = `${Date.now()}-${file.originalname}`;
            const filePath = path.join(folderPath, newFileName);
            fs.writeFileSync(filePath, file.buffer);

            data.image = `src/images/products/${newFileName}`;
            data.price = Number(data.price);

            const result = await this.repo.createProduct(data);

            return {
                message: 'Product created successfully',
                data: result,
                status: HttpStatus.OK
            };
        } catch (error) {
            return {
                message: 'Error creating Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Get('get')
    async getProducts() {
        try {
            const result = await this.repo.getProducts(1, 10);
            const baseUrl = "http://localhost:3000";
            console.log(result)
            const updatedData = result.map(product => ({
                ...product,
                image: `${baseUrl}/${product.image.replace('src/', '')}`,
                img_name: product.image.replace('http://localhost:3000/images/products/', '')
            }))
            return {
                message: 'Products fetched successfully',
                data: updatedData,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Products',
                error: error.message,
                status: HttpStatus.BAD_REQUEST

            };
        }
    };

    @Patch('update')
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
        try {

            if (Object.values(data).some(value => value === '')) {
                return {
                    message: 'All fields are required',
                    status: HttpStatus.BAD_REQUEST
                };
            }

            const newFileName = `${Date.now()}-${file.originalname}`;
            const filePath = path.join(__dirname, `../../../src/images/products/${newFileName}`);
            fs.writeFileSync(filePath, file.buffer);

            const fileToDeletePath = path.join(__dirname, `../../../src/images/products`, data.img_name);

            if (fs.existsSync(fileToDeletePath)) {
                fs.unlinkSync(fileToDeletePath);
            }

            data.image = `src/images/products/${newFileName}`;
            data.price = Number(data.price);
            data.id = Number(data.id);

            const { img_name, ...rest } = data;

            const result = await this.repo.updateProduct(data.id, rest);
            return {
                message: 'Product updated successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error updating Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    };

    @Get('getOne')
    async getOneProduct(@Query('id') id: number) {
        try {
            const result = await this.repo.getOneProduct(id);
            return {
                message: 'Product fetched successfully',
                data: result,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    };

    @Delete('delete')
    async deleteProduct(@Query('id') id: number) {
        try {
            const result = await this.repo.deleteProduct(+id);
            return {
                message: 'Product deleted successfully',
                data: result,
                status: HttpStatus.OK
            };
        } catch (error) {
            return {
                message: 'Error deleting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }
}
