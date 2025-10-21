import { Product } from "./types";
import { notifyCartUpdated } from "./cartEvents";

export type CartItem = {
  product: Product;
  quantity: number;
};

export function getCart(): CartItem[] {
  try {
    const cart = localStorage.getItem("cart");
    if (!cart) return [];
    const parsed = JSON.parse(cart);
    // Normaliza formatos antigos: se for array de Products (sem quantity), converte
    if (Array.isArray(parsed)) {
      // Detecta se cada item tem 'product' e 'quantity'
      const looksLikeCartItem = parsed.every(
        (it) =>
          it && typeof it === "object" && "product" in it && "quantity" in it
      );

      if (looksLikeCartItem) {
        return parsed as CartItem[];
      }

      // Se for array de products (cada item tem id/title/price/image), converte
      const looksLikeProduct = parsed.every(
        (p) => p && typeof p === "object" && "id" in p && "price" in p
      );

      if (looksLikeProduct) {
        return (parsed as Product[]).map((p) => ({ product: p, quantity: 1 }));
      }
    }

    return [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage:", e);
    return [];
  }
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    const newCart = cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    notifyCartUpdated();
    return newCart;
  }

  const newCart = [...cart, { product, quantity: 1 }];
  localStorage.setItem("cart", JSON.stringify(newCart));
  notifyCartUpdated();
  return newCart;
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === productId);

  if (!existingItem) return cart;

  if (existingItem.quantity > 1) {
    const newCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    notifyCartUpdated();
    return newCart;
  }

  const newCart = cart.filter((item) => item.product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  notifyCartUpdated();
  return newCart;
}

export function getCartTotal(cart: CartItem[]): number {
  return Number(
    cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2)
  );
}
