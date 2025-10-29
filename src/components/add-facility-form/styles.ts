/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const Container = css`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  background: #f8fafc;
`

export const HeaderCard = css`
  margin-bottom: 24px;

  .ant-card-body {
    padding: 24px;
  }
`

export const FormCard = css`
  margin-bottom: 24px;

  .ant-card-body {
    padding: 32px;
  }
`

export const StatusCard = css`
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  .ant-card-body {
    padding: 20px;
  }
`

export const StatusItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;

  &:last-child {
    margin-bottom: 0;
  }
`

export const FacilityCard = css`
  .ant-card-body {
    padding: 16px;
  }
`
