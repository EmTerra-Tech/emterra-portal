import AuthActions from "@/service/auth/actions";
import { SignUpFormDataType } from "@/service/auth/types";
import { Form } from "antd";

export default function useSignUpForm() {
  const [form] = Form.useForm();

  const onFinish = async (values: SignUpFormDataType) => {
    console.log(values);
    const res = await AuthActions.signUpAndCreateUser(values);
    console.log("Response from sign up:", res);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return { form, onFinish, onKeyDown, normFile };
}
