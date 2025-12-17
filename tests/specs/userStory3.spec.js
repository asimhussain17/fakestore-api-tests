import { test, expect } from '@playwright/test';
import { ProductApi } from '../helpers/productApi';

test('User Story 3: Delete the product with the lowest rating', async ({ baseURL }) => {
  const api = new ProductApi(baseURL);

  // 1. Get all products
  const response = await api.getAllProducts();
  expect(response.ok()).toBeTruthy();

  const products = await response.json();
  expect(products.length).toBeGreaterThan(0);

  // 2. Find product with the lowest rating
  const productWithLowestRating = products.reduce((lowest, current) => {
    if (!lowest.rating) return current;
    if (!current.rating) return lowest;
    return current.rating.rate < lowest.rating.rate ? current : lowest;
  });

  // 3. Delete the product
  const deleteResponse = await api.deleteProduct(productWithLowestRating.id);
  expect(deleteResponse.ok()).toBeTruthy();

  // NOTE:
  // FakeStore API delete is mocked and does not reliably persist deletion.
  // Therefore, we validate the delete response rather than GET persistence.
});
