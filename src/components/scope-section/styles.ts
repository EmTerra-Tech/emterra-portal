import styled from "@emotion/styled"

export const ScopeContainer = styled.div`
  margin-bottom: 20px;
`

export const ScopeBar = styled.div<{ isExpanded: boolean }>`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
`

export const ScopeHeader = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

export const ScopeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`

export const ScopeIcon = styled.div<{ iconBg: string }>`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
  background: ${(props) => props.iconBg};
`

export const ScopeDetails = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }
  
  p {
    color: #64748b;
    font-size: 14px;
    margin-bottom: 8px;
  }
`

export const CompletionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 200px;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    min-width: auto;
    width: 100%;
  }
`

export const CompletionText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`

export const ProgressBar = styled.div`
  width: 200px;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ProgressFill = styled.div<{ width: number; progressType: string }>`
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
  position: relative;
  width: ${(props) => props.width}%;
  background: ${(props) => {
    if (props.progressType === "high") return "linear-gradient(90deg, #eab308, #22c55e)"
    if (props.progressType === "medium") return "linear-gradient(90deg, #f59e0b, #eab308)"
    return "linear-gradient(90deg, #ef4444, #f59e0b)"
  }};
`

export const ExpandIcon = styled.div<{ isExpanded: boolean }>`
  font-size: 20px;
  color: #64748b;
  transition: transform 0.3s ease;
  margin-left: 16px;
  transform: ${(props) => (props.isExpanded ? "rotate(90deg)" : "rotate(0deg)")};
`

export const ScopeContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8fafc;
`

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  padding: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`
