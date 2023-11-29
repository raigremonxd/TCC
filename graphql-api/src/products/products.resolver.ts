import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Resolver(of => Product)
export class ProductsResolver {
    constructor(private productsService: ProductsService) { }

    @Query(returns => [Product])
    async getAll(): Promise<Product[]> {
        return this.productsService.getAll();
    }

    @Query(returns => Product, { nullable: true })
    getProductById(@Args('id', { type: () => Int }) id: number): Product | undefined {
        return this.productsService.getById(id);
    }
}