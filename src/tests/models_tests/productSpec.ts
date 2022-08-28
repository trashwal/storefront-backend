import { Product, ProductsModel } from '../../models/product';

const model = new ProductsModel();

describe('Test Products Model', () => {
  const product = {
    name: 'test product 2',
    price: '123',
  } as unknown as Product;

  it('Creates new product from model', async () => {
    const newProduct = await model.create(product);
    expect(newProduct.name).toEqual('test product 2');
    expect(newProduct.price).toBe(123);
  });

  it('Shows all products from model', async () => {
    const products = await model.index();
    expect(products.length).toBe(2);
  });

  it('Shows a specific product from model', async () => {
    const product = await model.show(2);
    expect(product.name).toEqual('test product 2');
    expect(product.price).toBe(123);
  });
});
