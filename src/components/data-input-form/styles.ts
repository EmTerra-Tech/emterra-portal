import styled from "@emotion/styled"

export const Content = styled.div`
  padding: 24px;
  background: #f8fafc;
  max-width: 1400px;
  margin: 0 auto;
`

export const MainCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`

export const BrowserBar = styled.div`
  background: #f1f5f9;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #e2e8f0;
`

export const BrowserDots = styled.div`
  display: flex;
  gap: 6px;
`

export const Dot = styled.div<{ color: "red" | "yellow" | "green" }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.color === "red" ? "#ef4444" : props.color === "yellow" ? "#f59e0b" : "#10b981")};
`

export const UrlBar = styled.div`
  background: white;
  margin-left: 20px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  font-size: 12px;
  color: #6b7280;
`

export const FormContent = styled.div`
  padding: 24px;
  background: #f8fafc;
`
