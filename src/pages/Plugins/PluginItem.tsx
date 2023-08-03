import { useMemo, useCallback } from "react";
import styled from "styled-components";
import { useFetchPluginsQuery, useUpdatePluginMutation } from "store/api";
import { Switch } from "components";
import { toastError, toastSuccess } from "utils";
import { PluginData, PluginStatus } from "types";

type PluginItemProps = {
  plugin: PluginData;
};

export const PluginItem = ({ plugin }: PluginItemProps) => {
  const [updatePlugin, { isLoading }] = useUpdatePluginMutation();
  const { refetch } = useFetchPluginsQuery();

  const { isActive, isDisabled } = useMemo(() => {
    return {
      isActive: plugin.status.includes(PluginStatus.Active),
      isDisabled: plugin.status.includes(PluginStatus.Disabled),
    };
  }, [plugin]);

  const onChange = useCallback(
    async (value: boolean) => {
      const response = await updatePlugin({
        pluginId: plugin.id,
        data: {
          tabId: plugin.tabId,
          status: value ? PluginStatus.Active : PluginStatus.Inactive,
        },
      });

      // @ts-ignore
      response?.data?.success
        ? toastSuccess("Plugin status updated successfully")
        : toastError("Failed to update plugin status, please try again");
      refetch();
    },
    [plugin, refetch, updatePlugin]
  );

  return (
    <Container data-testid="plugin-item" disabled={isDisabled}>
      <Details>
        <Title data-testid="plugin-title">{plugin.title}</Title>
        <Description data-testid="plugin-description">
          {plugin.description}
        </Description>
      </Details>
      <div>
        <Switch
          value={isActive}
          disabled={isDisabled || isLoading}
          onChange={onChange}
          activeText="Allowed"
          inActiveText="Blocked"
        />
      </div>
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  min-height: 200px;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.shape.borderRadiusMd};
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: ${({ theme }) => theme.palette.primary.main};
  transition: all 0.2s ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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

const Title = styled.h3`
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.palette.grey[500]};
`;
