"use client";

import { Button, Form, Input, Select } from "antd";
import {
  EntryContainer,
  EntryHeader,
  EntryTitle,
  FormGroup,
  FormInput,
  FormLabel,
  FormRow,
  FormSelect,
  FormTextarea,
  RemoveBtn,
  Required,
} from "./styles";

interface SpendEntryData {
  id: number;
  supplier: string;
  amount: string;
  currency: string;
  category: string;
  description: string;
}

interface SpendEntryProps {
  entry: SpendEntryData;
  entryNumber: number;
  onRemove: () => void;
  onUpdate: (field: keyof SpendEntryData, value: string) => void;
}

const SpendEntry = ({
  entry,
  entryNumber,
  onRemove,
  onUpdate,
}: SpendEntryProps) => {
  return (
    <Form className={EntryContainer}>
      <div className={EntryHeader}>
        <h2 className={EntryTitle}>Entry {entryNumber}</h2>
        <Button className={RemoveBtn} onClick={onRemove} title="Remove Entry">
          ✕
        </Button>
      </div>

      <div className={FormRow}>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>Supplier/Vendor</label>
          <Input
            className={FormInput}
            type="text"
            placeholder="Energy supplier name"
            value={entry.supplier}
            onChange={(e) => onUpdate("supplier", e.target.value)}
          />
        </Form.Item>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Total Spend Amount <span className={Required}>*</span>
          </label>
          <Input
            className={FormInput}
            type="number"
            placeholder="0.00"
            step="0.01"
            value={entry.amount}
            onChange={(e) => onUpdate("amount", e.target.value)}
            required
          />
        </Form.Item>
      </div>

      <div className={FormRow}>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Currency <span className={Required}>*</span>
          </label>
          <Select
            value={entry.currency}
            onChange={(e) => onUpdate("currency", e)}
          >
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
            <option value="CAD ($)">CAD ($)</option>
          </Select>
        </Form.Item>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Spend Category <span className={Required}>*</span>
          </label>
          <Select
            className={FormSelect}  
            value={entry.category}
            onChange={(e) => onUpdate("category", e)}
          >
            <option value="">Select category</option>
            <option value="Natural Gas">Natural Gas</option>
            <option value="Heating Oil">Heating Oil</option>
            <option value="Propane">Propane</option>
            <option value="Other Fuels">Other Fuels</option>
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

export default SpendEntry;

