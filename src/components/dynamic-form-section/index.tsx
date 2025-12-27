"use client";

import { Input, InputNumber, Select } from "antd";
import { SchemaField } from "@/service/schema/actions";

const { TextArea } = Input;
const { Option } = Select;

interface DynamicFormSectionProps {
  schema: SchemaField[];
  data: Record<string, any>;
  onUpdateEntry: (idx: number, field: string, value: any) => void;
  entryIndex: number;
}

const DynamicFormSection = ({
  schema,
  data,
  onUpdateEntry,
  entryIndex,
}: DynamicFormSectionProps) => {
  const handleChange = (field: string, value: any) => {
    onUpdateEntry(entryIndex, field, value);
  };

  const renderField = (field: SchemaField) => {
    const value = data[field.inputKey] || "";

    switch (field.inputType) {
      case "select":
        return (
          <Select
            placeholder={field.placeholder || `Select ${field.inputLabel}`}
            value={value || undefined}
            onChange={(val) => handleChange(field.inputKey, val)}
            style={{ width: "100%" }}
          >
            {field.inputValues?.map((option: any) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );

      case "number":
        return (
          <InputNumber
            placeholder={field.placeholder || "0.00"}
            value={value}
            onChange={(val) => handleChange(field.inputKey, val)}
            style={{ width: "100%" }}
            min={0}
          />
        );

      case "textarea":
        return (
          <TextArea
            placeholder={field.placeholder || ""}
            value={value}
            onChange={(e) => handleChange(field.inputKey, e.target.value)}
            rows={3}
          />
        );

      case "text":
      default:
        return (
          <Input
            placeholder={field.placeholder || ""}
            value={value}
            onChange={(e) => handleChange(field.inputKey, e.target.value)}
          />
        );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {schema.map((field) => (
        <div key={field.inputKey}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 500,
              color: "#333",
            }}
          >
            {field.inputLabel}
            {field.required && <span style={{ color: "red" }}> *</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default DynamicFormSection;
