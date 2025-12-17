import { test, expect } from '@playwright/test';
import { ProductApi } from '../helpers/productApi';

test('User Story 3: Delete the product with the lowest rating', async ({ baseURL }) => {
  const api = new ProductApi(baseURL);

  // 1. Get all products
  const response = await api.getAllProducts();
  expect(response.ok()).toBeTruthy();

  const products = await response.json();
  expect(products.length).toBeGreaterThan(0);

  // 2. Find product with lowest rating
  const productWithLowestRating = products.reduce((lowest, current) => {
    if (!current.rating) return lowest;
    if (!lowest.rating) return current;
    return current.rating.rate < lowest.rating.rate ? current : lowest;
  });

  // 3. Delete the product
  const deleteResponse = await api.deleteProduct(productWithLowestRating.id);
  expect(deleteResponse.ok()).toBeTruthy();

  // 4. Verify product no longer appears in listing
  const afterDeleteResponse = await api.getAllProducts();
  const updatedProducts = await afterDeleteResponse.json();

  const stillExists = updatedProducts.some(
    p => p.id === productWithLowestRating.id
  );
  expect(stillExists).toBeFalsy();

  // 5. Verify GET by ID returns 404
  const getDeletedResponse = await api.getProductById(productWithLowestRating.id);
  expect(getDeletedResponse.status()).toBe(404);
});
