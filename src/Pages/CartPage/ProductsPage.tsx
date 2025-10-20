import { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../types";
import { addToCart, getCart, } from "../../cart";
import { ProductCard } from "../../components/Header/ProductCard";
import { Header } from "../../components/Header/Header";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(getCart().length);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function handleAddToCart(product: Product) {
    const newCart = addToCart(product);
    setCartCount(newCart.length);
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <Container>
        <h2>🛍️ Produtos</h2>
        <ProductsGrid>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
          ))}
        </ProductsGrid>
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
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 25px;
`;
