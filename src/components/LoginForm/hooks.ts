import AuthActions from "@/service/auth/actions";
import { LoginFormDataType } from "@/service/auth/types";
import { Form } from "antd";
import { useRouter } from "next/navigation";

export default function useLoginForm() {
  const [form] = Form.useForm();
  const navigate = useRouter();

  const onFinish = async (values: LoginFormDataType) => {
    console.log(values);
    const res = await AuthActions.loginUser(values);
    console.log("Response from login:", res);
    navigate.push("/dashboard");
  };

  return { form, onFinish };
}
