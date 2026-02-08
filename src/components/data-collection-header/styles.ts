import { css } from "@emotion/css";

export const HeaderContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

export const HeaderTitle = css`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const HeaderSubtitle = css`
  font-size: 14px;
  color: #6b7280;
`;

export const YearContainer = css`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .ant-select-selector {
    border-radius: 6px !important;
    border-color: #e5e7eb !important;
    height: 36px !important;
    display: flex;
    align-items: center;
  }
`;

export const YearSelect = css`
  /* Unused export but kept for compatibility if imported elsewhere, though mostly handled inline or via class above */
`;
