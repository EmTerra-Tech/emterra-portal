import AuthActions from "@/service/auth/actions";
import { LoginFormDataType } from "@/service/auth/types";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLoginForm() {
  const [form] = Form.useForm();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormDataType) => {
    try {
      setLoading(true);
      const res = await AuthActions.loginUser(values);

      if (res.success) {
        message.success("Login successful!");
        navigate.push("/dashboard");
      } else {
        message.error(res.message || "Login failed");
      }
    } catch (error: any) {
      message.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { form, onFinish, loading };
}
