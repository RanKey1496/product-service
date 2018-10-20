import { preferenceUser, findByCorridor } from '../repository/preferenceRepository';
import { injectable } from 'inversify';

export interface PreferenceService {
    findQualified(token: string): Promise<Array<any>>;
    findByCorridor(token: string, corridorId: number, productId: number): any;
}

@injectable()
export class PreferenceServiceImp implements PreferenceService {

    public async findQualified(token: string): Promise<Array<any>> {
        const likes = JSON.parse(await preferenceUser(token));
        return likes.map((like: any) => like.id);
    }

    public async findByCorridor(token: string, corridorId: number, productId: number) {
        const likes = await findByCorridor(token, corridorId, productId);
        return likes;
    }

}