import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  HTMLProps,
  ReactNode,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import classnames from "classnames";
import Spinner from "../Spinner";

type A = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = VariantProps<typeof buttonClasses> &
  A & {
    icon?: ReactNode;
    loading?: boolean;
  };

// lassName="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

const buttonClasses = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      primary: "bg-success text-white rounded-sm active:scale-[0.98]",
      rounded: "rounded-full bg-white",
    },
    size: {
      small: "text-sm px-6 h-10",
      medium: "text-md px-8 h-14 font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant,
    size,
    icon,
    children,
    className = "",
    loading = false,
    ...rest
  } = props;
  return (
    <button
      className={classnames(buttonClasses({ variant, size }), className)}
      ref={ref}
      {...rest}
    >
      <>
        {children}
        {loading && <Spinner className="ml-2" size={size} />}
      </>
    </button>
  );
});

export default Button;
