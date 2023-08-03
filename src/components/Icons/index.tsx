import { useMemo } from "react";
import {
  faList,
  faUser,
  faCoins,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconsProps = {
  title: string;
};

export const Icons = ({ title }: IconsProps) => {
  const name = useMemo(() => {
    return title.toLowerCase();
  }, [title]);

  let icon = faList;

  switch (true) {
    case ["marketing"].includes(name):
      icon = faChartSimple;
      break;
    case ["finance"].includes(name):
      icon = faCoins;
      break;
    case ["personnel", "user"].includes(name):
      icon = faUser;
      break;
    default:
      break;
  }

  return <FontAwesomeIcon icon={icon} />;
};
