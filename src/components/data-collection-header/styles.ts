import { css } from "@emotion/css"

export const HeaderContainer = css`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const HeaderTitle = css`
  color: #1e293b;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const HeaderSubtitle = css`
  color: #64748b;
  font-size: 16px;
`

export const YearSelect = css`
  border-radius: 8px;
  padding: 8px 12px;
  background: white;

  .ant-select-selector {
    padding: 10px !important;
  }
`

export const YearContainer = css`
  display: flex;
  align-items: center;
  border: 1px solid rgba(var(--color-grey-rgb));
  background: var(--color-grey);
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  font-weight: bold;
  color: var(--color-text);
`
