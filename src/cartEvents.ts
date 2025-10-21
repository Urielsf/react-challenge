type CartEventHandler = () => void;
const handlers: CartEventHandler[] = [];

export function subscribeToCartUpdates(handler: CartEventHandler) {
  // Adiciona o handler à lista
  handlers.push(handler);

  // Executa imediatamente para sincronizar o estado inicial
  handler();

  // Retorna função para remover o handler
  return () => {
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  };
}

export function notifyCartUpdated() {
  // Notifica todos os handlers registrados
  handlers.forEach((handler) => handler());
}
