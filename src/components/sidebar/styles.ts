import { css } from "@emotion/css"

export const SidebarContainer = css`
  width: 250px;
  background: #1e293b;
  color: white;
  // padding: 20px 0;
  overflow-y: auto;
`

export const SidebarLogo = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  height: 64px;
  margin-bottom: 30px;
  background: #FFFFFF;
`

export const SidebarLogoIcon = css`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #2dd4bf, #059669);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`

export const NavSection = css`
  margin-bottom: 25px;
`

export const NavTitle = css`
  padding: 0 20px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`

export const NavItem = (active: boolean) =>
  css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    color: #cbd5e1;
    text-decoration: none;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
    ${active && `
      background: rgba(45, 212, 191, 0.15);
      color: #2dd4bf;
      border-left-color: #2dd4bf;
      font-weight: 600;
    `}
    &:hover {
      background: rgba(45, 212, 191, 0.1);
      color: #2dd4bf;
      border-left-color: #2dd4bf;
      cursor: ${active ? "default" :"pointer"};
    }
  `

  export const logo = css`
  height: 60px;
  width: 60px;
`;


export const NavIcon = css`
  width: 20px;
  height: 20px;
  background: currentColor;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0.8;
`
