import { css } from "@emotion/css"

export const StatsContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

export const StatCard = css`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2dd4bf, #059669);
  }
`

export const StatValue = css`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`

export const StatLabel = css`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
`

export const StatChange = (variant: "positive" | "negative") => css`
  font-size: 12px;
  font-weight: 600;
  color: ${variant === "positive" ? "#059669" : "#dc2626"};
`
