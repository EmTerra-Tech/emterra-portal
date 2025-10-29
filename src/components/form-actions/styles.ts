import styled from "@emotion/styled"

export const StyledFormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
`

export const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 14px;
  
  ${(props) =>
    props.variant === "primary"
      ? `
    background: linear-gradient(135deg, #2dd4bf, #059669);
    color: white;
    box-shadow: 0 2px 4px rgba(45, 212, 191, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(45, 212, 191, 0.4);
    }
  `
      : `
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`
