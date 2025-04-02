// AnimatedLink.tsx
import React from "react";
import Link from "next/link";
import { LinkProps } from "next/link";
import styles from "./AnimatedLink.module.css";

// Define the props interface for AnimatedLink
interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = "",
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`${styles.animatedLink} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
