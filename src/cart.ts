import { Product } from "./types";
import { notifyCartUpdated } from "./cartEvents";

export type CartItem = {
  product: Product;
  quantity: number;
};

export function getCart(): CartItem[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingItemIndex !== -1) {
    // Se o produto já existe, cria um novo array com a quantidade atualizada
    const newCart = [...cart];
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: newCart[existingItemIndex].quantity + 1,
    };
    localStorage.setItem("cart", JSON.stringify(newCart));
    notifyCartUpdated();
    return newCart;
  }

  // Se o produto não existe, adiciona ao carrinho
  const newCart = [...cart, { product, quantity: 1 }];
  localStorage.setItem("cart", JSON.stringify(newCart));
  notifyCartUpdated();
  return newCart;
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.product.id === productId
  );

  if (existingItemIndex === -1) return cart;

  const newCart = [...cart];
  const item = newCart[existingItemIndex];

  if (item.quantity > 1) {
    // Se houver mais de uma unidade, apenas diminui a quantidade
    newCart[existingItemIndex] = {
      ...item,
      quantity: item.quantity - 1,
    };
  } else {
    // Se só houver uma unidade, remove o item do carrinho
    newCart.splice(existingItemIndex, 1);
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
  notifyCartUpdated();
  return newCart;
}

export function getCartTotal(cart: CartItem[]): number {
  return Number(
    cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2)
  );
}
