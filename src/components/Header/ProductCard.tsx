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
      <Button onClick={() => onAddToCart(product)}>
        Adicionar ao Carrinho
      </Button>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  padding: 5px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  h3 {
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 500;
    min-height: 45px;
    line-height: 1.4;
    margin: 10px 0;
  }

  p {
    color: #3498db;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 5px 0;
  }
`;

const Button = styled.button`
  background: #2e60ccff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: auto;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: #27ae60;
  }
`;
