"use client";
import SignUpConstants from "@/constants/signUpConstants";
import TextConstants from "@/constants/textConstants";
import { BankOutlined, PushpinOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import useSignUpForm from "./hooks";
import * as styles from "./styles";

export default function SignUpForm() {
  const { form, onFinish, onKeyDown, normFile } = useSignUpForm();

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <div>
          <div>
            <div>
              <div className={styles.stepTitle}>
                <BankOutlined />
                <span>{SignUpConstants.companyInformation}</span>
              </div>
              <Divider className={styles.divider} />
            </div>
            <div className={styles.formGrid}>
              <Form.Item
                label="Company Name"
                name="companyName"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input placeholder="Your Company Ltd." />
              </Form.Item>
              <Form.Item
                label="Industry"
                name="industry"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please select your industry!",
                  },
                ]}
              >
                <Select placeholder="Select an industry">
                  {SignUpConstants.industryOptions.map((industry) => (
                    <Select.Option key={industry.value} value={industry.value}>
                      {industry.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Founded Year"
                name="foudnedYear"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the founded year!",
                  },
                ]}
              >
                <InputNumber placeholder="2020" onKeyDown={onKeyDown} />
              </Form.Item>
              <Form.Item
                label="Headquarters Location"
                name="headquarters"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the headquarters location!",
                  },
                ]}
              >
                <Input placeholder="Seattle, US, WA" />
              </Form.Item>
              <Form.Item
                label="Company Description"
                name="description"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the company description!",
                  },
                ]}
              >
                <TextArea
                  placeholder="Brief Description of your company's business and sustainability goals..."
                  rows={4}
                />
              </Form.Item>
              <Form.Item
                label="Company Logo"
                name="companyLogo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please upload the company logo!",
                  },
                ]}
              >
                <Upload listType="picture-card">
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <BankOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div>
            <div>
              <div className={styles.stepTitle}>
                <PushpinOutlined />
                <span>{SignUpConstants.locationAndContact}</span>
              </div>
              <Divider className={styles.divider} />
            </div>
            <div className={styles.formGrid}>
              <Form.Item
                label="Country"
                name="country"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please select a country!",
                  },
                ]}
              >
                <Select placeholder="Select an country">
                  {SignUpConstants.countryOptions.map((country) => (
                    <Select.Option key={country.value} value={country.value}>
                      {country.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the city!",
                  },
                ]}
              >
                <Input placeholder="Seattle" />
              </Form.Item>
              <Form.Item
                className={styles.spanfull}
                label="Business Address"
                name="businessAddress"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the business address!",
                  },
                ]}
              >
                <Input placeholder="123 Business Street, Suite 100" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the phone number!",
                  },
                ]}
              >
                <Input placeholder="+1 (555) 123-4567" onKeyDown={onKeyDown} />
              </Form.Item>
              <Form.Item
                label="Company Website"
                name="companyWebsite"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the company website!",
                  },
                ]}
              >
                <Input placeholder="https://yourcompany.com" />
              </Form.Item>
            </div>
          </div>
          <div>
            <div>
              <div className={styles.stepTitle}>
                <UserOutlined />
                <span>{SignUpConstants.primaryContact}</span>
              </div>
              <Divider className={styles.divider} />
            </div>
            <div className={styles.formGrid}>
              <Form.Item
                label="First Name"
                name="firstName"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the first name!",
                  },
                ]}
              >
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the last name!",
                  },
                ]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
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
                label="Job title"
                name="jobTitle"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input the job title!",
                  },
                ]}
              >
                <Input placeholder="Sustainability Manager" />
              </Form.Item>
              <Form.Item
                className={styles.spanfull}
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
              <Form.Item
                className={styles.spanfull}
                label="Confirm Password"
                name="confirmPassword"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input placeholder="********" type="password" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.mandatoryCheck}>
          <Checkbox className={styles.mandatoryCheckTiles}>
            <span>{SignUpConstants.tcAndPrivacyCheck}</span>{" "}
            <span className={styles.link}>
              {SignUpConstants.termsOfService}
            </span>
            {" and "}
            <span className={styles.link}>{SignUpConstants.privacyPolicy}</span>
          </Checkbox>
          <Checkbox className={styles.mandatoryCheckTiles}>
            {SignUpConstants.featureUpdateCheck}
          </Checkbox>
          <Checkbox className={styles.mandatoryCheckTiles}>
            {SignUpConstants.dataConsentCheck}
          </Checkbox>
        </div>
        <Button
          className={styles.submit}
          type="primary"
          size={"large"}
          onClick={form.submit}
        >
          {SignUpConstants.createAccountAndStartTrial}
        </Button>
        <div className={styles.footer}>
          <span>
            {SignUpConstants.alreadyHaveAccount}{" "}
            <Link href="/">{TextConstants.signIn}</Link>.
          </span>
        </div>
      </Form>
    </div>
  );
}
