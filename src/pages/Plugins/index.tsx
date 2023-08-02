import styled from "styled-components";
import { Loading, Error } from "components";
import { usePlugins } from "./usePlugins";
import { PluginItem } from "./PluginItem";
import { STATUS } from "types";

export const Plugins = () => {
  const { error, status, plugins, title } = usePlugins();

  if (status === STATUS.PENDING) {
    return <Loading data-testid="plugins-loading" />;
  }

  if (error) {
    return <Error data-testid="plugins-error">{error}</Error>;
  }

  return (
    <PluginsContainer data-testid="plugins-container">
      <Title data-testid="plugins-title">{title}</Title>
      {plugins.length > 0 ? (
        <PluginsList data-testid="plugins-list">
          {plugins.map((plugin) => (
            <PluginItem key={plugin.id} plugin={plugin} />
          ))}
        </PluginsList>
      ) : (
        <NoResults data-testid="plugins-not-found">
          No plugins available at the moment, please try again later
        </NoResults>
      )}
    </PluginsContainer>
  );
};

const PluginsContainer = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 100%;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 960px;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 1144px;
  }
`;

const Title = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(5)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    font-size: 20px;
  }
`;

const PluginsList = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  padding: ${({ theme }) => theme.spacing(4)} 0;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const NoResults = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
