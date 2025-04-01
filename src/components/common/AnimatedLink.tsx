// AnimatedLink.jsx
import Link from "next/link";
import { useState } from "react";
import styles from "./AnimatedLink.module.css";

const AnimatedLink = ({ href, children, className = "", ...props }) => {
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
