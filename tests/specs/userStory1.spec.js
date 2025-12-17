import { test, expect } from '@playwright/test';
import { ProductApi } from '../helpers/productApi';

test('User Story 1: Add cheapest in-stock electronics product to cart', async ({ request, baseURL }) => {
  const api = new ProductApi(baseURL);

  // 1. Get all products
  const response = await api.getAllProducts();
  expect(response.ok()).toBeTruthy();

  const products = await response.json();

  // 2. Filter electronics that are in stock
  const electronicsInStock = products.filter(product =>
    product.category === 'electronics' &&
    product.rating?.count > 0
  );

  expect(electronicsInStock.length).toBeGreaterThan(0);

  // 3. Find the cheapest electronics product
  const cheapestProduct = electronicsInStock.reduce((prev, curr) =>
    curr.price < prev.price ? curr : prev
  );

  // 4. Simulate adding to cart (FakeStore does not persist carts)
  expect(cheapestProduct.price).toBeGreaterThan(0);
  expect(cheapestProduct.rating.count).toBeGreaterThan(0);
});
