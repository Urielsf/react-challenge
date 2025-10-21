import styled from "styled-components";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleClick = () => {
    if (product && product.id && product.price) {
      onAddToCart(product);
    }
  };

  return (
    <Card>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>💰 R$ {product.price.toFixed(2)}</p>
      <Button onClick={handleClick}>Adicionar ao Carrinho</Button>
    </Card>
  );
}

const Button = styled.button`
  background: #2e60ccff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: #27ae60;
  }
`;

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

  ${Button} {
    margin-top: auto;
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
