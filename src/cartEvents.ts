type CartEventHandler = () => void;
const handlers: CartEventHandler[] = [];

export function subscribeToCartUpdates(handler: CartEventHandler) {
  handlers.push(handler);
  handler(); // Executa o handler imediatamente
  return () => {
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  };
}

export function notifyCartUpdated() {
  handlers.forEach((handler) => handler());
}
