import { cva, VariantProps } from "class-variance-authority";
import cn from "classnames";
import { ReactNode, ImgHTMLAttributes } from "react";

type A = ImgHTMLAttributes<HTMLImageElement>;

type AvatarProps = VariantProps<typeof avatarClasses> &
  A & {
    wrapperClassName?: string;
    children?: ReactNode;
  };

const avatarClasses = cva("relative", {
  variants: {
    variant: {
      rounded: "[&_img]:rounded-full",
    },
    size: {
      medium: "w-14 h-14",
      small: "w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "rounded",
    size: "medium",
  },
});

const Avatar = ({
  size,
  variant,
  children,
  className = "",
  wrapperClassName = "",
  ...rest
}: AvatarProps) => {
  return (
    <div className={cn(avatarClasses({ size, variant }), wrapperClassName)}>
      <img
        className={cn("absolute w-full h-full object-cover", className)}
        {...rest}
      />
      {children}
    </div>
  );
};

export default Avatar;
