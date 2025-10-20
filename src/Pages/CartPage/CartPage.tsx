import styled from "styled-components";
import { getCart, removeFromCart } from "../../cart";
import { useState, useEffect } from "react";
import { Product } from "../../types";
import { Header } from "../../components/Header/Header";

export function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(Number(sum.toFixed(2)));
  }, [cart]); 

  function handleRemove(id: number) {
    const updated = removeFromCart(id);
    setCart(updated);
  }

  function handleCheckout() {
    if (cart.length === 0) {
      setMessage("Seu carrinho está vazio 😢");
      return;
    }

    setMessage("✅ Compra finalizada com sucesso!");
    setCart([]);
    localStorage.removeItem("cart");

    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <Container>
        <h2>🛒 Seu Carrinho</h2>

        {cart.length === 0 ? (
          <Empty>Seu carrinho está vazio 😢</Empty>
        ) : (
          <>
            <CartList>
              {cart.map((p) => (
                <CartItem key={p.id}>
                  <img src={p.image} alt={p.title} />
                  <Info>
                    <h4>{p.title}</h4>
                    <p>💰 R$ {p.price.toFixed(2)}</p>
                  </Info>
                  <RemoveButton onClick={() => handleRemove(p.id)}>
                    Remover
                  </RemoveButton>
                </CartItem>
              ))}
            </CartList>

            <Summary>
              <h3>
                Total: <span>R$ {total.toFixed(2)}</span>
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
  margin-top: 40px;
  padding: 25px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: inline-block;
  text-align: center;
  width: 100%;
  max-width: 400px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;

    span {
      color: #007bff;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
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
