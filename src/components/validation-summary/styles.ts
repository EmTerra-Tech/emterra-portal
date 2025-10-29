/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css"

export const ValidationContainer = css`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
`

export const ValidationHeader = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

export const ValidationTitle = css`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
`

export const ValidationGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const ValidationItem = (variant: "success" | "warning") => css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${variant === "success" ? "#e6fffa" : "#fffbea"};
  color: ${variant === "success" ? "#059669" : "#b45309"};
`
