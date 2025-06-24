"use client";

import TextConstants from "@/constants/textConstants";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import useLoginForm from "./hooks";
import * as styles from "./styles";
export default function Loginform() {
  const { form, onFinish } = useLoginForm();
  return (
    <Form
      className={styles.form}
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <div>
        {" "}
        <Form.Item
          label="Email Address"
          name="email"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input the email address!",
            },
          ]}
        >
          <Input placeholder="johndoe@yourcompany.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input the password!",
            },
          ]}
        >
          <Input placeholder="********" type="password" />
        </Form.Item>
        <div className={styles.checkboxStrip}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className={styles.rememberMe}>
              {TextConstants.remember}
            </Checkbox>
          </Form.Item>
          <span className={styles.forgotPassword}>
            {TextConstants.forgotPassword}
          </span>
        </div>
      </div>
      <Button
        className={styles.signIn}
        type="primary"
        size={"large"}
        htmlType="submit"
      >
        {TextConstants.signIn}
      </Button>
      <div className={styles.footer}>
        <span>
          {TextConstants.noAccount}{" "}
          <Link href="/signup">{TextConstants.signUp}</Link>.
        </span>
      </div>
    </Form>
  );
}
