import { styled } from "styled-components";

type ErrorProps = {
  "data-testid"?: string;
  size?: number;
  children?: React.ReactNode;
};

export const Error = ({
  size,
  children = "Error",
  ...restProps
}: ErrorProps) => {
  return (
    <Container
      data-testid={restProps["data-testid"] || "error"}
      $size={size || 5}
    >
      <h2>Something went wrong, please reload the page</h2>
      <Text>{children}</Text>
    </Container>
  );
};

const Container = styled.div<{ $size: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(5)};
  font-size: ${({ theme }) => theme.typography.fontSizeXl};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.palette.error.main};
`;
