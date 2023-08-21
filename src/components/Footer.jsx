import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <div style={{display:'flex', flexDirection:'column', justifyItems:'center', alignItems:'center', marginTop:'6%'}}>
        <Logo>VMD Medical Community</Logo>
        <Desc>
          <b>VMD Medical Community</b> where we share information related to
          Medical and Comprehensive services. We're dedicated to providing you the very best information
          and knowledge of the above mentioned topics.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
        </div>
      </Left>

      <Right>
      <div style={{display:'flex', flexDirection:'column', justifyItems:'left', alignItems:'left'}}>

        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> NJ/NYC/PA/DE
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +201-244 7390
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> VMDMedicalCommunity@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </div>
      </Right>
    </Container>
  );
};

export default Footer;
