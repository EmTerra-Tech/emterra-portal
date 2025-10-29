import { css } from "@emotion/css"

export const DataSection = css`
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
`

export const AddEntrySection = css`
  text-align: center;
  margin-bottom: 16px;
`

export const AddEntryBtn = css`
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  &:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
`
