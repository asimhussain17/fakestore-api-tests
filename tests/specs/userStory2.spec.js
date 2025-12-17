import { test, expect } from '@playwright/test';
import { ProductApi } from '../helpers/productApi';
import { clothingProducts } from '../data/products';

test('User Story 2: Add three new clothing items to the catalogue', async ({ baseURL }) => {
  const api = new ProductApi(baseURL);
  const createdProductIds = [];

  // 1. Add three new clothing products
  for (const product of clothingProducts) {
    const response = await api.addProduct(product);
    expect(response.ok()).toBeTruthy();

    const createdProduct = await response.json();
    expect(createdProduct.title).toBe(product.title);

    createdProductIds.push(createdProduct.id);
  }

  // 2. Retrieve all products
  const getAllResponse = await api.getAllProducts();
  expect(getAllResponse.ok()).toBeTruthy();

  const allProducts = await getAllResponse.json();

  // 3. Verify newly added products are visible
  for (const product of clothingProducts) {
    const exists = allProducts.some(p => p.title === product.title);
    expect(exists).toBeTruthy();
  }
});
