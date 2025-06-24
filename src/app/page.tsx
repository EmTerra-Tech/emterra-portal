"use client";
import TextConstants from "@/constants/textConstants";
import * as styles from "./styles";
import Image from "next/image";
import world_logo from "@public/world_logo.png";
import Loginform from "@/components/LoginForm";

console.log("styles", styles);

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logoOutline}>
          <Image className={styles.logo} alt="Logo" src={world_logo} />
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
