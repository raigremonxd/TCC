import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private readonly products: Product[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', value: 10, quantity: 10 },
        { id: 2, name: 'Product 2', description: 'Description 2', value: 20, quantity: 20 },
        { id: 3, name: 'Product 3', description: 'Description 3', value: 30, quantity: 30 },
        { id: 4, name: 'Product 4', description: 'Description 4', value: 40, quantity: 40 },
        { id: 5, name: 'Product 5', description: 'Description 5', value: 50, quantity: 50 },
        { id: 6, name: 'Product 6', description: 'Description 6', value: 60, quantity: 60 },
        { id: 7, name: 'Product 7', description: 'Description 7', value: 70, quantity: 70 },
        { id: 8, name: 'Product 8', description: 'Description 8', value: 80, quantity: 80 },
        { id: 9, name: 'Product 9', description: 'Description 9', value: 90, quantity: 90 },
        { id: 10, name: 'Product 10', description: 'Description 10', value: 100, quantity: 100 }
    ];

    getAll(): Product[] {
        return this.products;
    }

    getById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }
}