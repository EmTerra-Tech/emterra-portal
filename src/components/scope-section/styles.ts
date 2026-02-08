import styled from "@emotion/styled";

export const ScopeContainer = styled.div`
  margin-bottom: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

export const ScopeBar = styled.div<{ isExpanded: boolean }>`
  padding: 24px;
  cursor: pointer;
  background: white;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

export const ScopeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ScopeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ScopeIcon = styled.div`
  /* Replaced by inline style */
`;

export const ScopeDetails = styled.div`
  h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
  }
`;

export const CompletionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CompletionText = styled.div`
  /* Replaced by inline style */
`;

export const ProgressBar = styled.div`
  /* Replaced by inline style */
`;

export const ProgressFill = styled.div`
   /* Replaced by inline style */
`;

export const ExpandIcon = styled.div<{ isExpanded: boolean }>`
  font-size: 12px;
  transition: transform 0.3s;
  ${props => props.isExpanded ? 'transform: rotate(90deg);' : ''}
`;

export const ScopeContent = styled.div<{ isExpanded: boolean }>`
  display: ${props => props.isExpanded ? 'block' : 'none'};
  padding: 0 24px 24px 24px;
  border-top: 1px solid #f1f5f9;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-top: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
