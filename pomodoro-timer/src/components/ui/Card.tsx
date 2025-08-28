import { type FC, type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-primary rounded-2xl border border-stone-700 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
