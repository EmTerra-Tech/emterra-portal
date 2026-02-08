import { css } from "@emotion/css"

export const Container = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 80px; 
  position: relative;
`

export const SubmitButton = css`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #0f172a; 
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s;
  z-index: 100;

  &:hover {
    background: #1e293b;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }
`
