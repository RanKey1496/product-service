import { GenericRepositoryImp } from './genericRepository';
import { ProductModel, Product } from '../entity/product';
import { injectable } from 'inversify';

@injectable()
export class ProductRepository extends GenericRepositoryImp<ProductModel> {

    public async findAll(): Promise<ProductModel[]> {
        return await Product.find();
    }

    public async findById(id: number): Promise<ProductModel> {
        return await Product.findOne({ product_id: id }, '-_id');
    }

    public async findByCorridorId(id: number): Promise<ProductModel[]> {
        // tslint:disable-next-line:no-null-keyword
        return await Product.find({ 'corridors.id': id }, '-_id');
    }

    public async findProductNotIn(ids: Array<any>): Promise<any> {
        return await Product.find({ product_id: { '$nin': ids } }).limit(10);
    }

}