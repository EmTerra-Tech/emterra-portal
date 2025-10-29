import styled from "@emotion/styled"

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

export const ToggleSwitch = styled.div`
  background: #e5e7eb;
  border-radius: 25px;
  padding: 4px;
  display: flex;
`

export const ToggleOption = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.active ? "white" : "#64748b")};
  background: ${(props) => (props.active ? "#2dd4bf" : "transparent")};
  box-shadow: ${(props) => (props.active ? "0 2px 4px rgba(45, 212, 191, 0.3)" : "none")};
`
