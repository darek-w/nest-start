import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Product } from './product.model'
import { ProductsModule } from "./products.model";

@Injectable()
export class ProductsService {
    products: Product[] = []

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct: Model<Product> = new this.productModel({
            title, 
            description, 
            price
        })
        const result = await newProduct.save()
        return result.id as string
    }

    async getProducts() {
        const products = await this.productModel.find().exec()
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price   
        }))
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId)
        return product
    }

    async updateProduct(productId: string, title: string, description: string, price: number) {
        const product = this.findProduct(productId)
        const updatedProduct = new this.productModel({
            ...product
        })
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        const result = await updatedProduct.save()
        return result
    }

    deleteProduct(productId: string) {
        const index = this.findProduct(productId)[1]
        this.products.splice(index, 1)
    }

    private findProduct(id: string): Product {
        const product = this.productModel.findById(id)
        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        return product.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }))
    } 
}