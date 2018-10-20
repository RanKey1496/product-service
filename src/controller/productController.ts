import { RegistrableController } from './RegistrableController';
import { Application, Request, NextFunction, Response } from 'express';
import { injectable, inject } from 'inversify';
import { dataResponse } from '../utils/responses';
import Types from '../config/types';
import { ProductService } from '../service/productService';
import { authenticate } from '../service/authService';
import { PreferenceService } from '../service/preferenceService';

@injectable()
export class ProductController implements RegistrableController {

    @inject(Types.ProductService)
    private productService: ProductService;

    @inject(Types.PreferenceService)
    private preferenceService: PreferenceService;

    public register(app: Application): void {

        app.route('/product/:id')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const id = req.params.id;
                    const result = await this.productService.getById(id);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/product/corridor/:id')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const id = req.params.id;
                    const result = await this.productService.getByCorridorId(id);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/product/preference/recommended')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const userLikes = await this.preferenceService.findQualified(req.body.token);
                        const result = await this.productService.filterPreferences(userLikes);
                        return dataResponse(res, result);
                    } catch (error) {
                        return next(error);
                    }
                });

        app.route('/product/corridor/ids')
            .post(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        console.log(req.body.ids);
                        const result = await this.productService.getCorridorsIdByIds(req.body.ids);
                        return dataResponse(res, result);
                    } catch (error) {
                        return next(error);
                    }
                });
    }

}