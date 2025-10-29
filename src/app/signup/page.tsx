"use client";

import TextConstants from "@/constants/textConstants";
import * as styles from "./styles";
import Image from "next/image";
import world_logo from "@public/world_logo.png";
import SignUpForm from "@/components/signup-form";
import { CheckSquareFilled } from "@ant-design/icons";
export default function SignUpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logoOutline}>
          <Image className={styles.logo} alt="Logo" src={world_logo} />
        </div>
        <span className={styles.title}>{TextConstants.title}</span>
        <span className={styles.subtitle}>{TextConstants.signUpSubtitle}</span>
        <div className={styles.checkPointsContainer}>
          {TextConstants.signUpCheckPoints.map((point, index) => (
            <div key={index} className={styles.checkPoint}>
              <CheckSquareFilled />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.createAccount}>
          {TextConstants.createAccount}
        </span>
        <span className={styles.createAccountSubtitle}>
          {TextConstants.createAccountSubtitle}
        </span>

        <SignUpForm />
      </div>
    </div>
  );
}
