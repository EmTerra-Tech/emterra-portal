import styled from "@emotion/styled"

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 2px solid #2dd4bf;
  padding: 24px;
`

export const FacilityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const FacilityInfo = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
  
  p {
    font-size: 14px;
    color: #64748b;
  }
`

export const StatusBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`

export const ReasoningSection = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
`

export const SaveNaSection = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
`

export const FormGroup = styled.div`
  margin-bottom: 20px;
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`

export const FormTextarea = styled.textarea`
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
