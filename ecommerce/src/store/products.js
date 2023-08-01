import { create } from 'zustand';
import {
  allProducto,
  createProducto,
  allCategories,
  deleteProducto,
  findProductoById,
  updateProduct,
  getCategoriesByCategories,
} from '../utils/axios';

export const useProducts = create(set => ({
  products: [],
  categories: [],

  createProduct: async data => {
    try {
      const response = await createProducto(data);
      console.log(response);
      set({ products: [response] });
    } catch (error) {
      console.log('Error creating product');
      console.log(error);
    }
  },

  getAllProducts: async () => {
    try {
      const response = await allProducto();
      console.log(response);
      set({ products: response });
    } catch (error) {
      console.log('Error getting products', error);
      throw error;
    }
  },

  getByCategory: async category => {
    try {
      const response = await getCategoriesByCategories(category);
      return response;
    } catch (error) {
      console.log('Error getting products', error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await allCategories();
      set({ categories: response });
    } catch (error) {
      console.log('Error getting categories', error);
      throw error;
    }
  },

  getProductBiId: async id => {
    try {
      const response = await findProductoById(id);
      return response;
    } catch (error) {
      console.log('Error getting product', error);
      throw error;
    }
  },

  updateProductById: async (id, data) => {
    try {
      console.log(id, data);
      const response = await updateProduct(id, data);
      console.log(response);
      return response;
    } catch (error) {
      console.log('Error updating product', error);
      throw error;
    }
  },

  deleteProductBiId: async id => {
    try {
      const response = await deleteProducto(id);
      console.log(response);
      return response;
    } catch (error) {
      console.log('Error deleting product', error);
      throw error;
    }
  },
}));
