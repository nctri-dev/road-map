import type { ComponentProps, FC } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "accent";
}

const variants = {
  primary: "bg-stone-600 brightness-75 hover:brightness-100",
  secondary: "brightness-50 hover:bg-stone-600 hover:brightness-75",
  accent: "",
};

const Button: FC<ButtonProps & ComponentProps<"button">> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`cursor-pointer px-4 py-2 rounded-lg  ${variants[variant]} transition-normal duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
