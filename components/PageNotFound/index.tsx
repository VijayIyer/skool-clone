import React, { ReactNode } from "react";
import styles from "./PageNotFound.module.css";

import NextLink from "next/link";
import Image from "next/image";

import skoolLogo from "@/public/skool.svg";

const PageNotFound = () => {
  return (
    <div className={styles.error_page}>
      <div className={styles.error_container}>
        <NextLink href="/" className={styles.logo_container}>
          <Image src={skoolLogo} alt="logo of skool" className={styles.logo} />
        </NextLink>
        <div className={styles.error_title}>
          <span>404 Error</span>
        </div>
        <div className={styles.error_description}>
          <span>Sorry, this page doesn&apos;t exist.</span>
        </div>
        <NextLink href="/" className={styles.btn}>
          <span>Back To Home</span>
        </NextLink>
      </div>
    </div>
  );
};

export default PageNotFound;
