import styled from "styled-components";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>💰 R$ {product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Adicionar</button>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }

  h3 {
    font-size: 1rem;
    margin: 10px 0;
    min-height: 45px;
  }

  p {
    color: black;
    margin: 5px 0;
  }

  button {
    margin-top: auto;
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background: #0056b3;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 100px;
      height: 100px;
    }

    h3 {
      font-size: 0.9rem;
    }

    button {
      padding: 8px 10px;
    }
  }
`;
  