import styled from "styled-components";
import { getCart, removeFromCart, getCartTotal } from "../../cart";
import type { CartItem } from "../../cart";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { subscribeToCartUpdates } from "../../cartEvents";

export function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [itemCount, setItemCount] = useState<number>(0);

  // Função para calcular o total de itens no carrinho
  const calculateItemCount = (cartItems: CartItem[]): number => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  useEffect(() => {
    const loadCart = () => {
      const storedCart = getCart();
      setCart(storedCart);
      setItemCount(calculateItemCount(storedCart));
      const newTotal = storedCart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(Number(newTotal.toFixed(2)));
    };

    loadCart();
    const unsubscribe = subscribeToCartUpdates(loadCart);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(getCartTotal(cart));
      setItemCount(calculateItemCount(cart));
    }
  }, [cart]);

  function handleRemove(productId: number) {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    const newTotal = updatedCart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(Number(newTotal.toFixed(2)));
    setItemCount(calculateItemCount(updatedCart));
  }

  function handleCheckout() {
    if (itemCount === 0) {
      setMessage("Seu carrinho está vazio 😢");
      return;
    }

    setMessage("✅ Compra finalizada com sucesso!");
    localStorage.removeItem("cart");
    setCart([]);
    setItemCount(0);
    setTotal(0);

    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <>
      <Header cartCount={itemCount} />
      <Container>
        <h2>🛒 Seu Carrinho</h2>

        {cart.length === 0 ? (
          <Empty>Seu carrinho está vazio 😢</Empty>
        ) : (
          <>
            <CartList>
              {cart.map((item) => (
                <CartItem key={item.product.id}>
                  <img src={item.product.image} alt={item.product.title} />
                  <Info>
                    <h4>{item.product.title}</h4>
                    <Price>💰 R$ {item.product.price.toFixed(2)}</Price>
                    <Quantity>Quantidade: {item.quantity}</Quantity>
                    <Subtotal>
                      Subtotal:{" "}
                      <PriceHighlight>
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </PriceHighlight>
                    </Subtotal>
                  </Info>
                  <ButtonGroup>
                    <RemoveButton onClick={() => handleRemove(item.product.id)}>
                      Remover 1
                    </RemoveButton>
                  </ButtonGroup>
                </CartItem>
              ))}
            </CartList>

            <Summary>
              <h3>
                Total: <TotalPrice>R$ {total.toFixed(2)}</TotalPrice>
              </h3>
              <CheckoutButton onClick={handleCheckout}>
                Finalizar Compra
              </CheckoutButton>
              {message && <Message>{message}</Message>}
            </Summary>
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 40px;
  text-align: center;

  h2 {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const CartItem = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
`;

const Info = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 20px;

  h4 {
    font-size: 1rem;
    margin-bottom: 5px;
    font-weight: 500;
  }

  p {
    color: #333;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin: 0;
  }
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #a71d2a;
  }
`;

const Summary = styled.div`
  margin-top: 80px;
  padding: 25px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: inline-block;
  text-align: center;
  width: 80%;
  max-width: 400px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TotalPrice = styled.span`
  color: #2ecc71;
  font-weight: bold;
  font-size: 1.5rem;
`;

const CheckoutButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  color: green;
  font-weight: bold;
`;

const Empty = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin-top: 40px;
`;

const Quantity = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Price = styled.p`
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
  margin: 5px 0;
`;

const PriceHighlight = styled.span`
  color: #2ecc71;
  font-weight: bold;
`;

const Subtotal = styled.p`
  color: #34495e;
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 5px;
`;
