import styled, { keyframes } from "styled-components";
import { PluginData, PluginStatus } from "types";

type PluginItemProps = {
  plugin: PluginData;
};

export const PluginItem = ({ plugin }: PluginItemProps) => {
  return (
    <Container data-testid="plugin-item">
      <Details>
        <div data-testid="plugin-title">{plugin.title}</div>
        <div data-testid="plugin-description">{plugin.description}</div>
      </Details>
      <Control>
        <input
          data-testid="plugin-control"
          type="checkbox"
          checked={plugin.status.includes(PluginStatus.Active)}
          onChange={() => {}}
        />
      </Control>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.shape.borderRadiusMd};
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: ${({ theme }) => theme.palette.primary.main};
  animation: ${fadeIn} 0.2s ease-in;
  transition: all 0.2s ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.spacing(6)};
`;

const Control = styled.div``;
