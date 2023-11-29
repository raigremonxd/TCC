import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAll(): Product[] {
        return this.productsService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Product {
        const numericId = parseInt(id);
        return this.productsService.getById(numericId);
    }
}