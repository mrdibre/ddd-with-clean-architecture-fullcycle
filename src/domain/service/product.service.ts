import { Product } from "../entity/product";

export class ProductService {
  static increasePrices(products: Product[], percentage: number) {
    const getPriceWithPercentage = (price: number) => price + (price * percentage / 100);

    products.forEach(p => p.changePrice(getPriceWithPercentage(p.price)));
  }
}
