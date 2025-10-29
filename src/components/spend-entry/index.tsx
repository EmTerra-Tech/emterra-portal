"use client"

import {
  EntryContainer,
  EntryHeader,
  EntryTitle,
  RemoveBtn,
  FormRow,
  FormGroup,
  FormLabel,
  Required,
  FormInput,
  FormSelect,
  FormTextarea,
} from "./styles"

interface SpendEntryData {
  id: number
  supplier: string
  amount: string
  currency: string
  category: string
  description: string
}

interface SpendEntryProps {
  entry: SpendEntryData
  entryNumber: number
  onRemove: () => void
  onUpdate: (field: keyof SpendEntryData, value: string) => void
}

const SpendEntry = ({ entry, entryNumber, onRemove, onUpdate }: SpendEntryProps) => {
  return (
    <EntryContainer>
      <EntryHeader>
        <EntryTitle>Entry {entryNumber}</EntryTitle>
        <RemoveBtn onClick={onRemove} title="Remove Entry">
          ✕
        </RemoveBtn>
      </EntryHeader>

      <FormRow>
        <FormGroup>
          <FormLabel>Supplier/Vendor</FormLabel>
          <FormInput
            type="text"
            placeholder="Energy supplier name"
            value={entry.supplier}
            onChange={(e) => onUpdate("supplier", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Total Spend Amount <Required>*</Required>
          </FormLabel>
          <FormInput
            type="number"
            placeholder="0.00"
            step="0.01"
            value={entry.amount}
            onChange={(e) => onUpdate("amount", e.target.value)}
            required
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>
            Currency <Required>*</Required>
          </FormLabel>
          <FormSelect value={entry.currency} onChange={(e) => onUpdate("currency", e.target.value)} required>
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
            <option value="CAD ($)">CAD ($)</option>
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Spend Category <Required>*</Required>
          </FormLabel>
          <FormSelect value={entry.category} onChange={(e) => onUpdate("category", e.target.value)} required>
            <option value="">Select category</option>
            <option value="Natural Gas">Natural Gas</option>
            <option value="Heating Oil">Heating Oil</option>
            <option value="Propane">Propane</option>
            <option value="Other Fuels">Other Fuels</option>
          </FormSelect>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>Description</FormLabel>
        <FormTextarea
          rows={3}
          placeholder="Description of spending category and any additional details..."
          value={entry.description}
          onChange={(e) => onUpdate("description", e.target.value)}
        />
      </FormGroup>
    </EntryContainer>
  )
}

export default SpendEntry
