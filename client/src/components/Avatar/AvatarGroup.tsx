import { ReactNode, ReactElement } from "react";

interface IAvatarGroupProps {
  max?: number;
  children: ReactElement[];
}

const AvatarGroup = ({ max = 3, children }: IAvatarGroupProps) => {
  const items = children.slice(0, max);
  return <div className="flex -space-x-10">{items}</div>;
};

export default AvatarGroup;
