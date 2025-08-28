import type { ComponentProps, FC } from "react";

const Input: FC<ComponentProps<"input">> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`bg-primary px-4 py-2 rounded-lg outline-0 ${className}`}
    />
  );
};

export default Input;
