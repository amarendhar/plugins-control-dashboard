import styled from "styled-components";
import { Link } from "react-router-dom";

export const Notfound = () => (
  <Container>
    <h2>Page Not Found</h2>
    <Link to="/">Back to Homepage</Link>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(5)};
`;
