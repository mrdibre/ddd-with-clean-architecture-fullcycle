import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async find(id: string): Promise<Product> {
    const model = await ProductModel.findOne({ where: { id } });

    return new Product(model.id, model.name, model.price);
  }

  async findAll(): Promise<Product[]> {
    const models = await ProductModel.findAll()

    return models.map(model => new Product(model.id, model.name, model.price))
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {  where: { id: entity.id } })
  }
}
