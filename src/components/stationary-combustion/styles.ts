import styled from "@emotion/styled";

// Colors from the design system (approximated from Tailwind slate/emerald palette)
const colors = {
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate900: "#0f172a",
  
  emerald50: "#ecfdf5",
  emerald100: "#d1fae5",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  emerald700: "#047857",
  
  amber50: "#fffbeb",
  amber500: "#f59e0b",
  amber700: "#b45309",
  
  rose50: "#fff1f2",
  rose500: "#f43f5e",
  rose700: "#be123c",
  
  white: "#ffffff",
};

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.slate50};
  padding-bottom: 5rem;
`;

export const HeaderWrapper = styled.div`
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.slate200};
  padding: 0.75rem 1.5rem;
`;

export const InnerContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.slate500};
  
  span {
    &.link {
      cursor: pointer;
      &:hover { color: ${colors.emerald600}; }
    }
    &.active {
      color: ${colors.slate900};
      font-weight: 500;
    }
  }
`;

export const MainContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .icon {
    font-size: 1.875rem;
    color: #f97316; // Orange-500
  }
  
  .text {
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: ${colors.slate900};
      margin: 0;
    }
    p {
      color: ${colors.slate500};
      margin-top: 0.25rem;
      margin-bottom: 0;
    }
  }
`;

export const YearBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.slate200};
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  
  span.label {
    color: ${colors.slate500};
    font-size: 0.875rem;
  }
  span.value {
    font-weight: 600;
  }
`;

export const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 0.75rem;
  border: 1px solid ${colors.slate200};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${colors.slate100};
`;

export const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .icon-box {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: ${colors.emerald50};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.emerald600};
    font-size: 1.25rem;
  }
  
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${colors.slate900};
    margin: 0;
  }
  
  p {
    font-size: 0.875rem;
    color: ${colors.slate500};
    margin: 0;
  }
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .bar-bg {
    width: 12rem;
    height: 0.5rem;
    background-color: ${colors.slate100};
    border-radius: 9999px;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    background: linear-gradient(to right, ${colors.emerald400}, ${colors.emerald600});
    border-radius: 9999px; // ensure nested radius
    transition: width 0.5s ease-in-out;
  }
  
  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.emerald600};
  }
`;

export const FacilityList = styled.div`
  & > div:not(:last-child) {
    border-bottom: 1px solid ${colors.slate100};
  }
`;

export const FacilityRow = styled.div`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.slate50};
  }
`;

export const RowContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  
  button.toggle {
    color: ${colors.slate400};
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .details {
    span.name {
      font-weight: 500;
      color: ${colors.slate900};
    }
    span.divider {
      color: ${colors.slate400};
      margin: 0 0.5rem;
    }
    span.location {
      font-size: 0.875rem;
      color: ${colors.slate500};
    }
  }
`;

export const Badge = styled.span<{ variant?: 'default' | 'success' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem; // py-0.5 px-2
  border-radius: 9999px; // rounded-full
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => props.variant === 'success' ? `
    background-color: ${colors.emerald50};
    color: ${colors.emerald700};
  ` : `
    background-color: ${colors.slate100};
    color: ${colors.slate700};
  `}
`;

export const EditButton = styled.button`
  color: ${colors.slate500};
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${colors.emerald600};
  }
`;

export const ExpandedContent = styled.div`
  background-color: ${colors.slate50};
  border-top: 1px solid ${colors.slate100};
  padding: 1rem;
  padding-left: 3rem; // pl-12
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${colors.slate500};
    text-transform: uppercase;
    padding-bottom: 0.5rem;
  }
  
  td {
    padding: 0.5rem 0;
    font-size: 0.875rem;
    border-bottom: 1px solid transparent; // prevent layout shift
    
    &.mono {
      font-family: monospace;
    }
  }
`;

export const MethodBadge = styled.span<{ method: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.method) {
      case 'activity': return `background-color: ${colors.emerald50}; color: ${colors.emerald700};`;
      case 'spend': return `background-color: ${colors.amber50}; color: ${colors.amber700};`;
      case 'direct': return `background-color: ${colors.rose50}; color: ${colors.rose700};`;
      default: return `background-color: ${colors.slate100}; color: ${colors.slate600};`;
    }
  }}
`;

// Form Styles
export const FormSection = styled.div`
  padding: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  margin-top: 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${colors.slate700};
    margin-bottom: 0.5rem;
  }
  
  .input-row {
    display: flex;
    gap: 1rem;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid ${colors.slate200};
    border-radius: 0.5rem;
    outline: none;
    
    &:focus {
      border-color: ${colors.emerald500};
      box-shadow: 0 0 0 2px ${colors.emerald100};
    }
  }
`;

export const ToggleGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ToggleButton = styled.button<{ active?: boolean; variant?: 'success' | 'warning' | 'error' | 'default' }>`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 2px solid ${props => props.active ? 'currentColor' : colors.slate200};
  background-color: ${props => props.active ? 'var(--bg-active)' : colors.white};
  color: ${props => props.active ? 'var(--text-active)' : colors.slate600};
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => {
    let activeColor = colors.emerald500;
    let activeBg = colors.emerald50;
    let activeText = colors.emerald700;
    
    if (props.variant === 'warning') {
       activeColor = colors.amber500;
       activeBg = colors.amber50;
       activeText = colors.amber700;
    } else if (props.variant === 'error') {
       activeColor = colors.rose500;
       activeBg = colors.rose50;
       activeText = colors.rose700;
    }
    
    return `
      ${props.active ? `border-color: ${activeColor};` : ''}
      --bg-active: ${activeBg};
      --text-active: ${activeText};
    `;
  }}
`;

export const EntryCard = styled.div`
  border: 1px solid ${colors.slate200};
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background-color: ${colors.white};
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h4 { margin: 0; font-weight: 600; font-size: 1rem; color: ${colors.slate900}; }
    button {
      color: ${colors.slate400};
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      &:hover { color: ${colors.rose500}; }
    }
  }
`;

export const AddEntryButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px dashed ${colors.slate300};
  border-radius: 0.75rem;
  color: ${colors.slate600};
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${colors.emerald400};
    color: ${colors.emerald600};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${colors.white};
  border: 1px dashed ${colors.slate300};
  border-radius: 0.75rem;
  
  .icon { font-size: 2.5rem; color: ${colors.emerald500}; margin-bottom: 1rem; }
  h3 { font-size: 1.25rem; font-weight: 600; color: ${colors.slate900}; margin: 0 0 0.5rem 0; }
  p { color: ${colors.slate500}; margin: 0; }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
