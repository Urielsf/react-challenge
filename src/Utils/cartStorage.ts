import { Product } from "../types";

export function getCart(): Product[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(product: Product): Product[] {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function removeFromCart(id: number): Product[] {
  const cart = getCart().filter((p) => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}