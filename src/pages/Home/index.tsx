import { Loading, Error } from "components";
import { useHome } from "./useHome";

export const Home = () => {
  const { error, isLoading } = useHome();

  if (isLoading) {
    return <Loading data-testid="plugins-loading" />;
  }

  if (error) {
    return <Error data-testid="plugins-error">{error}</Error>;
  }

  return null;
};
