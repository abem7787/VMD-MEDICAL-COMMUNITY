import styled from "styled-components";

import Announcement from "./Announcement";
import Products from "./Products";

import Footer from "./Footer";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      {/* <Navbar /> */}
      <Announcement />
      <Title>Dresses</Title>
     
      <Products />
    
      <Footer />
    </Container>
  );
};

export default ProductList;



