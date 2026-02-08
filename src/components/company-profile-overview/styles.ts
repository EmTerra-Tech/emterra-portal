import styled from "@emotion/styled";
import { Card, Modal } from "antd";

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 24px;
  background: white; // Main page background from mockup
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 15px;
    color: #64748b;
    margin: 0;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  margin-bottom: 24px;

  .ant-card-body {
    padding: 0;
  }
`;

export const CardHeader = styled.div`
  padding: 20px 28px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, #f8fafc, white);

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }
`;

export const IconBox = styled.div<{ gradient: string; shadowColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${props => props.shadowColor};
  color: white;
  font-size: 20px;
`;

export const ActionButton = styled.button`
  margin-left: auto;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1E6091;
  background: rgba(30, 96, 145, 0.1);
  border: 1px solid rgba(30, 96, 145, 0.2);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);

  &:hover {
    background: rgba(30, 96, 145, 0.2);
    border-color: rgba(30, 96, 145, 0.3);
  }
`;

export const PrimaryButton = styled.button`
  margin-left: auto;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #1E6091;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
  }
`;

export const InfoGrid = styled.div`
  padding: 28px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
`;

export const InfoItem = styled.div<{ span?: number }>`
  grid-column: span ${props => props.span || 1};

  label {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
    line-height: 1.6;
  }

  .description {
    font-size: 15px;
    color: #475569;
    font-weight: 400;
  }
`;

export const Tag = styled.span<{ type: 'success' | 'error' | 'default' }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  ${props => props.type === 'success' && `
    background: #f0fdf4;
    color: #15803d;
  `}

  ${props => props.type === 'error' && `
    background: #fef2f2;
    color: #dc2626;
  `}

  ${props => props.type === 'default' && `
    background: #f1f5f9;
    color: #475569;
  `}
`;

export const FacilitiesGrid = styled.div`
  padding: 24px 28px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const AddFacilityCard = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafbfc;

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: #1E6091;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    color: white;
    font-size: 28px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 4px 0;
  }

  p {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }
`;

export const FacilityItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  background: white;
  transition: all 0.2s;
  position: relative;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .type {
    font-size: 13px;
    color: #64748b;
    margin: 0 0 12px 0;
    font-weight: 500;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    color: #64748b;
    font-size: 14px;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f1f5f9;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    padding: 0;
    overflow: hidden;
  }

  .ant-modal-header {
    padding: 24px 28px;
    border-bottom: 1px solid #e2e8f0;
    margin: 0;
  }

  .ant-modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
  }

  .ant-modal-body {
    padding: 28px;
  }

  .ant-modal-footer {
    padding: 20px 28px;
    border-top: 1px solid #e2e8f0;
    margin: 0;
    background: #f8fafc;
  }

  input, select {
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: #3b82f6;
    }
  }

  label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    display: block;
    margin-bottom: 8px;
  }
`;
