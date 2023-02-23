import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import classnames from "classnames";

type A = InputHTMLAttributes<HTMLInputElement>;

type InputProps = VariantProps<typeof inputClasses> & {
  icon?: ReactNode;
  label?: ReactNode;
  labelProps?: InputHTMLAttributes<HTMLLabelElement>;
} & Omit<A, "size">;

const inputClasses = cva("outline-none w-full", {
  variants: {
    variant: {
      primary: "border border-placeholder rounded-md text-dark",
      rounded: "rounded-full bg-white",
    },
    size: {
      small: "text-sm px-2 h-10 shadow-sm",
      medium: "text-md px-4 h-14",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant,
    size,
    className = "",
    id,
    label,
    labelProps = {},
    ...rest
  } = props;
  const { className: labelClassName = "" } = labelProps;
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={classnames(
            "block text-dark text-md font-medium mb-2",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={classnames(inputClasses({ variant, size }), className)}
          id={id}
          {...rest}
          ref={ref || null}
        />
      </div>
    </>
  );
});

export default Input;
