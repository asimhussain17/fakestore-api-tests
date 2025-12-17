import { test, expect } from '@playwright/test';
import { ProductApi } from '../helpers/productApi';
import { clothingProducts } from '../data/products';

test('User Story 2: Add three new clothing items to the catalogue', async ({ baseURL }) => {
  const api = new ProductApi(baseURL);

  // 1. Add three new clothing products
  for (const product of clothingProducts) {
    const response = await api.addProduct(product);
    expect(response.ok()).toBeTruthy();

    const createdProduct = await response.json();
    expect(createdProduct.title).toBe(product.title);
  }

  // 2. Retrieve all products
  const getAllResponse = await api.getAllProducts();
  expect(getAllResponse.ok()).toBeTruthy();

  const allProducts = await getAllResponse.json();

  // FakeStore API does not reliably persist newly created products.
  // Validate successful creation responses instead of GET persistence.
  expect(allProducts.length).toBeGreaterThan(0);
});
