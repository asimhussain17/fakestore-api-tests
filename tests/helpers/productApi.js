import { request } from '@playwright/test';

export class ProductApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getAllProducts() {
    const context = await request.newContext({ baseURL: this.baseURL });
    const response = await context.get('/products');
    return response;
  }

  async getProductById(id) {
    const context = await request.newContext({ baseURL: this.baseURL });
    const response = await context.get(`/products/${id}`);
    return response;
  }

  async addProduct(payload) {
    const context = await request.newContext({ baseURL: this.baseURL });
    const response = await context.post('/products', { data: payload });
    return response;
  }

  async updateProduct(id, payload) {
    const context = await request.newContext({ baseURL: this.baseURL });
    const response = await context.put(`/products/${id}`, { data: payload });
    return response;
  }

  async deleteProduct(id) {
    const context = await request.newContext({ baseURL: this.baseURL });
    const response = await context.delete(`/products/${id}`);
    return response;
  }
}
