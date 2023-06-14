import React from "react";
import { Link } from "expo-router";

interface LinkButtonProps {
  route: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ route, children }) => {
  return <Link href={route}>{children}</Link>;
};

export default LinkButton;
