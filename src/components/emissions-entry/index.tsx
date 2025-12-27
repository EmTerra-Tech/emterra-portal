"use client";

import { Form, Input, Select } from "antd";
import { EmissionsEntryData } from "../emissions-data-section";
import {
  EntryContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormRow,
  FormSelect,
  FormTextarea,
  Required,
} from "./styles";

interface EmissionsEntryProps {
  entry: EmissionsEntryData;

  onUpdate: (field: keyof EmissionsEntryData, value: string) => void;
}

const EmissionsEntry = ({
  entry,

  onUpdate,
}: EmissionsEntryProps) => {
  return (
    <Form className={EntryContainer}>
      <div className={FormRow}>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>Direct Emissions Value</label>
          <Input
            className={FormInput}
            type="text"
            placeholder="Energy supplier name"
            value={entry.emissionsValue}
            onChange={(e) => onUpdate("emissionsValue", e.target.value)}
          />
        </Form.Item>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Unit <span className={Required}>*</span>
          </label>
          <Select
            className={FormSelect}
            value={entry.unit}
            onChange={(e) => onUpdate("unit", e)}
          >
            <option value="tCO₂e">tCO₂e (Tonnes CO₂ equivalent)</option>
            <option value="kgCO₂e">kgCO₂e (Kilograms CO₂ equivalent)</option>
          </Select>
        </Form.Item>
      </div>

      <div className={FormRow}>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Spend Category <span className={Required}>*</span>
          </label>
          <Select
            className={FormSelect}
            value={entry.methodology}
            onChange={(e) => onUpdate("methodology", e)}
          >
            <option value="">Select methodology</option>
            <option value="ghg-protocol">GHG Protocol</option>
            <option value="epa">EPA (Environmental Protection Agency)</option>
            <option value="defra">DEFRA (UK Government)</option>
            <option value="ipcc">IPCC Guidelines</option>
            <option value="iso14064">ISO 14064</option>
            <option value="other">Other</option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item className={FormGroup}>
        <label className={FormLabel}>Description</label>
        <Input.TextArea
          className={FormTextarea}
          rows={3}
          placeholder="Description of spending category and any additional details..."
          value={entry.description}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </Form.Item>
    </Form>
  );
};

export default EmissionsEntry;

