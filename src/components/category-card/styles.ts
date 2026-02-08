import styled from "@emotion/styled"

export const Card = styled.div<{ isNotApplicable: boolean }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  opacity: ${(props) => (props.isNotApplicable ? 0.7 : 1)};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
`

export const CategoryHeader = styled.div<{ isNotApplicable: boolean }>`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  background: white;
`

export const CategoryControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const NAToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

export const ToggleSlider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.checked ? "#cbd5e1" : "#e2e8f0")};
  transition: .3s;
  border-radius: 22px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
    transform: ${(props) => (props.checked ? "translateX(18px)" : "translateX(0)")};
  }
`

export const NALabel = styled.span`
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
`

export const CategoryBody = styled.div`
  padding: 20px;
`

export const EmissionValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const EmissionLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`

export const EmissionAmount = styled.span<{ isNotApplicable: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
`

export const UncertaintyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const BtnCollect = styled.button<{ themeColor: string; isNotApplicable: boolean }>`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.isNotApplicable ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.isNotApplicable ? "#94a3b8" : props.themeColor)};
  
  &:hover {
    background: ${(props) => (props.isNotApplicable ? "#94a3b8" : props.themeColor)};
    opacity: ${(props) => (props.isNotApplicable ? 1 : 0.9)};
  }
`

// Unused styled components kept to prevent export errors if imported elsewhere, though likely safe to remove.
export const InfoIcon = styled.span`display: none;`
export const NABadge = styled.div<{ show: boolean }>`display: none;`
export const UncertaintyValue = styled.span`display: none;`
export const CompletionRow = styled.div`display: none;`
export const CompletionHeader = styled.div`display: none;`
export const CompletionLabel = styled.span`display: none;`
export const CompletionPercent = styled.span`display: none;`
export const MiniProgressBar = styled.div`display: none;`
export const MiniProgressFill = styled.div`display: none;`
export const CategoryActions = styled.div`display: none;`
