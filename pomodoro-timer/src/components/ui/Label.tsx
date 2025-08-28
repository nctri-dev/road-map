import type { ComponentProps, FC } from "react";

const Label: FC<ComponentProps<"label">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label className={`brightness-75 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
