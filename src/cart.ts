import { Product } from "./types";


export function getCart(): Product[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}


export function addToCart(product: Product): Product[] {
  const cart = getCart();
  const newCart = [...cart, product];
  localStorage.setItem("cart", JSON.stringify(newCart));
  return newCart;
}


export function removeFromCart(id: number): Product[] {
  const cart = getCart().filter((p) => p.id !== id);
  const newCart = [...cart];
  localStorage.setItem("cart", JSON.stringify(newCart));
  return newCart;
}
