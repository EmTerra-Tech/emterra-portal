import { css } from "@emotion/css"

export const TopBarContainer = css`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Breadcrumb = css`
  color: #64748b;
  font-size: 14px;
`

export const UserMenu = css`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const NotificationIcon = css`
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
  }
`

export const UserAvatar = css`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #2dd4bf, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`
