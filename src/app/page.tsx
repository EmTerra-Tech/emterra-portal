"use client";
import TextConstants from "@/constants/textConstants";
import * as styles from "./styles";
import Image from "next/image";
import emterra_logo from "@public/emterra_icon.png";
import Loginform from "@/components/login-form";

console.log("styles", styles);

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logoOutline}>
          <Image className={styles.logo} alt="Logo" src={emterra_logo} />
        </div>
        <span className={styles.title}>{TextConstants.title}</span>
        <span className={styles.subtitle}>{TextConstants.signInSubtitle}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.welcome}>{TextConstants.welcome}</span>
        <Loginform />
      </div>
    </div>
  );
}
