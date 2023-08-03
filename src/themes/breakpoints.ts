const breakPointValues = {
  xs: 575,
  sm: 768,
  md: 1024,
  lg: 1200,
};

export const breakpoints = {
  ...breakPointValues,
  up: (val: string) => {
    return `@media (min-width: ${
      breakPointValues[val as keyof typeof breakPointValues]
    }px)`;
  },
  down: (val: string) => {
    return `@media (max-width: ${
      breakPointValues[val as keyof typeof breakPointValues]
    }px)`;
  },
};
