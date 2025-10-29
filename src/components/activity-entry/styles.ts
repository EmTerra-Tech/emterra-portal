import { css } from "@emotion/css"

export const EntryContainer = css`
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`

export const EntryHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const EntryTitle = css`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`

export const RemoveBtn = css`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  &:hover {
    background: #fef2f2;
    transform: scale(1.1);
  }
`

export const FormRow = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

export const FormGroup = css`
  margin-bottom: 20px;
`

export const FormLabel = css`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`

export const Required = css`
  color: #ef4444;
  margin-left: 2px;
`

export const FormInput = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
`

export const FormSelect = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
`

export const FormTextarea = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
`
