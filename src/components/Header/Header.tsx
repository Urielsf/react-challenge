import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>

      <Logo to="/">🛍️ My Shop</Logo>
  
      <MenuButton onClick={() => setOpen(!open)}>
        {open ? <X size={26} /> : <Menu size={26} />}
      </MenuButton>

      <Nav $open={open}>
        <StyledLink to="/" onClick={() => setOpen(false)}>
          Produtos
        </StyledLink>

        <CartLink to="/cart" onClick={() => setOpen(false)}>
          <ShoppingCart size={20} />
          <span>Carrinho</span>
          {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
        </CartLink>
      </Nav>
    </HeaderContainer>
  );
}



const HeaderContainer = styled.header`
  display:flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #007bff, #0062cc);
  color: white;
  padding: 18px 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.3s ease;
  width: 95%;

  @media (max-width: 768px) {
    padding: 15px 25px;
  }
`;



const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  letter-spacing: 0.5px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
    background: #005ed1;
    position: absolute;
    top: 65px;
    right: 0;
    width: 100%;
    padding: 25px 0;
    text-align: center;
    transform: ${({ $open }) =>
      $open ? "translateY(0)" : "translateY(-120%)"};
    transition: transform 0.3s ease-in-out;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  transition: color 0.2s;

  &:hover {
    color: #dbeafe;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 1.05rem;

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    color: #dbeafe;
  }
`;

const CartBadge = styled.span`
  background: #ff3b3b;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -6px;
  right: -10px;
  animation: pop 0.3s ease;

  @keyframes pop {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
