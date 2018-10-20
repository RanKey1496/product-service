import { Container } from 'inversify';
import { RegistrableController } from '../controller/RegistrableController';
import Types from './types';
import { ProductController } from '../controller/productController';
import { ProductService, ProductServiceImp } from '../service/productService';
import { ProductRepository } from '../repository/productRepository';
import { PreferenceService, PreferenceServiceImp } from '../service/preferenceService';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(ProductController);

// Services
container.bind<ProductService>(Types.ProductService).to(ProductServiceImp).inSingletonScope();
container.bind<PreferenceService>(Types.PreferenceService).to(PreferenceServiceImp).inSingletonScope();

// Repositories
container.bind<ProductRepository>(Types.ProductRepository).to(ProductRepository).inSingletonScope();


export { container };