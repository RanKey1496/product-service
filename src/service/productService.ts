import { inject, injectable } from 'inversify';
import Types from '../config/types';
import { ProductRepository } from '../repository/productRepository';
import { ProductModel } from '../entity/product';

export interface ProductService {
    getById(id: number): Promise<ProductModel>;
    getByCorridorId(id: number): Promise<ProductModel[]>;
    filterPreferences(visited: Array<any>): Promise<ProductModel[]>;
}

@injectable()
export class ProductServiceImp implements ProductService {

    @inject(Types.ProductRepository)
    private productRepository: ProductRepository;

    public async getById(id: number): Promise<ProductModel> {
        return await this.productRepository.findById(id);
    }

    public async getByCorridorId(id: number): Promise<ProductModel[]> {
        return await this.productRepository.findByCorridorId(id);
    }

    public async filterPreferences(visited: Array<any>): Promise<any> {
        return await this.productRepository.findProductNotIn(visited);
    }

}