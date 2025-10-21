import { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../types";
import { addToCart, getCartItemCount } from "../../cart";
import { ProductCard } from "../../components/Header/ProductCard";
import { Header } from "../../components/Header/Header";
import { subscribeToCartUpdates } from "../../cartEvents";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(getCartItemCount());

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const unsubscribe = subscribeToCartUpdates(() => {
      setCartCount(getCartItemCount());
    });

    return () => unsubscribe();
  }, []);

  function handleAddToCart(product: Product) {
    addToCart(product);
    setCartCount(getCartItemCount());
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 50px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
`;
