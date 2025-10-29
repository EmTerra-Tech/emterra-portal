import styled from "@emotion/styled"
import { Card } from "antd"

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  background: #f8fafc;
`

export const HeaderCard = styled(Card)`
  margin-bottom: 24px;
  
  .ant-card-body {
    padding: 24px;
  }
`

export const StatsCard = styled(Card)`
  .ant-statistic-content {
    color: #1e293b;
  }
  
  .ant-statistic-content-value {
    font-weight: 700;
  }
`

export const FacilityCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  }
  
  .ant-card-body {
    padding: 16px;
  }
`

export const MetricChange = styled.div<{ positive?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.positive ? "#52c41a" : "#8c8c8c")};
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`
