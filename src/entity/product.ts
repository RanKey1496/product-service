import { Document, Schema, Model, model } from 'mongoose';

export interface IProduct {
    product_id: number;
    name: string;
    image: string;
    description: string;
    store_id: number;
    price: number;
    corridors: any;
}

export interface ProductModel extends IProduct, Document { }

export const ProductSchema: Schema = new Schema({
    name: {
        type: String, required: true, trim: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    store_id: {
        type: String
    },
    price: {
        type: Number
    },
    product_id: {
        type: Number
    },
    corridors: [{
        parent_id: {
            type: Number
        },
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }]
}, { timestamps: true, versionKey: false });

export const Product: Model<ProductModel> = model<ProductModel>('Product', ProductSchema);