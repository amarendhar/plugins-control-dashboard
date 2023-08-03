import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import styled, { css } from "styled-components";
import { Sizes } from "themes";

type SwitchProps = {
  size?: Sizes;
  "data-testid"?: string;
  className?: string;
  value?: boolean;
  disabled?: boolean;
  activeText?: React.ReactNode;
  inActiveText?: React.ReactNode;
  onChange?: (value: boolean) => void;
  icon?: React.ReactNode;
};

export const Switch = ({
  size = Sizes.md,
  className = "",
  value = false,
  disabled = false,
  activeText,
  inActiveText,
  onChange = () => {},
  icon,
  ...restProps
}: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      setSelectedValue(e.target.checked);
      onChange(e.target.checked);
    },
    [onChange, disabled]
  );

  const hasText = useMemo(
    () => activeText || inActiveText,
    [activeText, inActiveText]
  );

  return (
    <Label
      data-testid={restProps["data-testid"] || "switchBox"}
      className={`container ${className}`}
      disabled={disabled}
    >
      <Input
        type="checkbox"
        checked={selectedValue}
        onChange={onChangeHandler}
        disabled={disabled}
      />
      <SwitchTrack size={size} checked={selectedValue}>
        <SwitchThumb size={size} checked={selectedValue}>
          {icon && icon}
        </SwitchThumb>
      </SwitchTrack>
      {hasText && (
        <Text checked={selectedValue}>
          {selectedValue ? activeText : inActiveText}
        </Text>
      )}
    </Label>
  );
};

const Label = styled.label<{ disabled: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(1)};

  cursor: pointer;
  ${(props) => (props.disabled ? "pointer-events: none" : "")};

  * {
    cursor: pointer;
  }
`;

const SwitchTrack = styled.span<{ size: Sizes; checked: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-radius: 34px;
  z-index: 1;
  transition: background-color 0.4s, border 0.4s;

  width: ${({ size }) => (size === "md" ? 42 : 50)}px;
  height: ${({ size }) => (size === "md" ? 23 : 30)}px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.palette.success.main : theme.palette.error.main};
  border: 1px solid
    ${({ theme, checked }) =>
      checked ? theme.palette.success.main : theme.palette.error.main};

  &:hover {
    background-color: ${({ theme, checked }) =>
      checked ? theme.palette.success.main : theme.palette.error.dark};
    border: 1px solid
      ${({ theme, checked }) =>
        checked ? theme.palette.success.main : theme.palette.error.dark};
  }

  &:active {
    background-color: ${({ theme, checked }) =>
      checked ? theme.palette.success.main : theme.palette.error.light};
    border: 1px solid
      ${({ theme, checked }) =>
        checked ? theme.palette.success.main : theme.palette.error.light};
  }
`;

const Focus = css`
  outline: none;
  outline-color: rgb(77, 144, 254);
  outline-style: auto;
  outline-offset: 4px;
`;
const Input = styled.input<{ checked: boolean }>`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;

  &:focus-visible + span {
    ${Focus}
  }
`;

const SwitchThumb = styled.span<{ size: Sizes; checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
  transition: 0.4s;

  width: ${({ size }) => (size === "md" ? "17" : "22")}px;
  height: ${({ size }) => (size === "md" ? "17" : "22")}px;
  transform: ${({ checked, size }) =>
    checked
      ? size === "md"
        ? "translateX(21px)"
        : "translateX(24px)"
      : "translateX(2px)"};
`;

const Text = styled.span<{ checked: boolean }>`
  font-size: 12px;
  user-select: none;
  color: ${({ theme, checked }) =>
    checked ? theme.palette.success.main : theme.palette.error.main};
`;
