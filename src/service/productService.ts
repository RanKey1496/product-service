import { inject, injectable } from 'inversify';
import Types from '../config/types';
import { ProductRepository } from '../repository/productRepository';
import { ProductModel } from '../entity/product';

export interface ProductService {
    getById(id: number): Promise<ProductModel>;
    getByCorridorId(id: number): Promise<ProductModel[]>;
    getBySubCorridorId(id: number): Promise<ProductModel[]>;
    filterPreferences(visited: Array<any>): Promise<ProductModel[]>;
    getCorridorsIdByIds(ids: Array<number>): Promise<Array<string>>;
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

    public async getBySubCorridorId(id: number): Promise<ProductModel[]> {
        return await this.productRepository.findBySubCorridor(id);
    }

    public async filterPreferences(visited: Array<any>): Promise<any> {
        console.log(visited);
        return await this.productRepository.findProductNotIn(visited);
    }

    public async getCorridorsIdByIds(ids: Array<number>): Promise<Array<string>> {
        const result = await this.productRepository.findCorridorsIdByIds(ids);
        return result.map((r: any) => {
            return { productId: r.product_id, corridorId: r.corridors[0].id };
        });
    }

}