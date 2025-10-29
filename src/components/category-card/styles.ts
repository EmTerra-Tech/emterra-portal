import styled from "@emotion/styled"

export const Card = styled.div<{ isNotApplicable: boolean }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  opacity: ${(props) => (props.isNotApplicable ? 0.6 : 1)};
  filter: ${(props) => (props.isNotApplicable ? "grayscale(0.3)" : "none")};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`

export const CategoryHeader = styled.div<{ headerBg: string; isNotApplicable: boolean }>`
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  background: ${(props) => (props.isNotApplicable ? "linear-gradient(135deg, #6b7280, #4b5563)" : props.headerBg)};
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    flex: 1;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`

export const CategoryControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`

export const InfoIcon = styled.span`
  background: rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
`

export const NAToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  
  @media (max-width: 768px) {
    width: 38px;
    height: 20px;
  }
  
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
  background-color: ${(props) => (props.checked ? "rgba(239, 68, 68, 0.8)" : "rgba(255,255,255,0.3)")};
  transition: .3s;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.4);
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transform: ${(props) => (props.checked ? "translateX(20px)" : "translateX(0)")};
    
    @media (max-width: 768px) {
      height: 14px;
      width: 14px;
      left: 2px;
      bottom: 2px;
      transform: ${(props) => (props.checked ? "translateX(18px)" : "translateX(0)")};
    }
  }
`

export const NALabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin-left: 4px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 9px;
  }
`

export const NABadge = styled.div<{ show: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  display: ${(props) => (props.show ? "block" : "none")};
`

export const CategoryBody = styled.div`
  padding: 20px;
`

export const EmissionValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const EmissionLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`

export const EmissionAmount = styled.span<{ isNotApplicable: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.isNotApplicable ? "#9ca3af" : "#1e293b")};
`

export const UncertaintyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

export const UncertaintyValue = styled.span<{ isNotApplicable: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isNotApplicable ? "#9ca3af" : "#1e293b")};
`

export const CompletionRow = styled.div`
  margin-bottom: 12px;
`

export const CompletionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

export const CompletionLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`

export const CompletionPercent = styled.span<{ isNotApplicable: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isNotApplicable ? "#9ca3af" : "#1e293b")};
`

export const MiniProgressBar = styled.div`
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`

export const MiniProgressFill = styled.div<{ width: number; headerBg: string; isNotApplicable: boolean }>`
  height: 100%;
  border-radius: 4px;
  width: ${(props) => props.width}%;
  background: ${(props) => (props.isNotApplicable ? "linear-gradient(90deg, #9ca3af, #6b7280)" : props.headerBg)};
`

export const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`

export const BtnCollect = styled.button<{ headerBg: string; isNotApplicable: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: ${(props) => (props.isNotApplicable ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: ${(props) => (props.isNotApplicable ? "linear-gradient(135deg, #9ca3af, #6b7280)" : props.headerBg)};
  pointer-events: ${(props) => (props.isNotApplicable ? "none" : "auto")};
  
  &:hover {
    transform: ${(props) => (props.isNotApplicable ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) => (props.isNotApplicable ? "none" : "0 4px 12px rgba(0,0,0,0.2)")};
  }
`
