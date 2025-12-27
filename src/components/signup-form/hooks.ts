import AuthActions from "@/service/auth/actions";
import { SignUpFormDataType } from "@/service/auth/types";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useSignUpForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Map form values to match backend requirements
      const signupData: SignUpFormDataType = {
        companyName: values.companyName,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        terms: values.terms || false,
        processing: values.processing || false,
        updates: values.updates || false,
        logoUrl: values.logoUrl || "",
        description: values.description || "",
        industry: values.industry || "",
        foundedYear: values.foundedYear || 0,
        headquarters: values.headquarters || "",
        country: values.country || "",
        city: values.city || "",
        address: values.address || "",
        phone: values.phone || "",
        website: values.website || "",
      };

      const res = await AuthActions.signUpAndCreateUser(signupData);

      if (res.success) {
        message.success("Account created successfully! Please log in.");
        router.push("/");
      } else {
        message.error(res.message || "Signup failed");
      }
    } catch (error: any) {
      message.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
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

  return { form, onFinish, onKeyDown, normFile, loading };
}
