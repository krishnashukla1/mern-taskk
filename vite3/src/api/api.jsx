import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getProducts = (filters) => axios.get(API_URL, { params: filters });
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const addProduct = (product) => axios.post(API_URL, { ...product, colors: product.colors.split(",") });
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
