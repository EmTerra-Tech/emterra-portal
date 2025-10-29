import styled from "@emotion/styled"

export const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
`

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`

export const ChartSelect = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
`

export const ScopeBreakdownChart = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 12px;
`

export const PieChart = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #ef4444 0deg 162deg,
    #f59e0b 162deg 288deg,
    #8b5cf6 288deg 360deg
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PieCenter = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

export const PieTotal = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
`

export const PieLabel = styled.div`
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ScopeLegend = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

export const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`

export const LegendLabel = styled.div`
  font-size: 12px;
  color: #374151;
  font-weight: 500;
`

export const LegendValue = styled.div`
  font-size: 12px;
  color: #1e293b;
  font-weight: 600;
  margin-left: auto;
`

export const TotalSummary = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

export const SummaryLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
`

export const SummaryValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
`

export const SummaryChange = styled.div`
  font-size: 10px;
  color: #dc2626;
  font-weight: 600;
`
