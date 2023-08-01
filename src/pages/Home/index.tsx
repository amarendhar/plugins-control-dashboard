import { Loading, Error } from "components";
import { useHome } from "./useHome";
import { STATUS } from "types";

export const Home = () => {
  const { data, error, status } = useHome();

  if (status === STATUS.PENDING) {
    return <Loading data-testid="plugins-loading" />;
  }

  if (error) {
    return <Error data-testid="plugins-error">{error}</Error>;
  }

  return (
    <div>
      <div>Home</div>
    </div>
  );
};
