import styled from "@emotion/styled"

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

export const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="radio"] {
    width: 16px;
    height: 16px;
    accent-color: #2dd4bf;
  }
  
  label {
    font-size: 14px;
    color: #374151;
    cursor: pointer;
  }
`
