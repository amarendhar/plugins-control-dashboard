import styled, { keyframes } from "styled-components";

type LoadingProps = {
  "data-testid"?: string;
  size?: number;
};

export const Loading = ({ size, ...restProps }: LoadingProps) => {
  return (
    <Container
      data-testid={restProps["data-testid"] || "loading"}
      $size={size || 5}
    >
      <Loader />
    </Container>
  );
};

const Container = styled.div<{ $size: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => theme.spacing($size)};
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.palette.grey[300]};
  border-top: 5px solid #000;
  animation: ${spin} 1s linear infinite;
`;
