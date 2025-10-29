/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css"

export const ActionContainer = css`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  padding: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`

export const exportButton = css`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: 2px solid transparent;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.3);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

export const submitButton = css`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: 2px solid transparent;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(16, 185, 129, 0.3);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`
