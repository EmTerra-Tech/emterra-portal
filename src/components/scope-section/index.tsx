"use client"

import CategoryCard from "../category-card"
import {
  CategoriesGrid,
  CompletionSection,
  ExpandIcon,
  ScopeBar,
  ScopeContainer,
  ScopeContent,
  ScopeDetails,
  ScopeHeader,
  ScopeInfo
} from "./styles"

interface Category {
  id: string
  title: string
  icon: string
  emissions: string
  dataQuality: string
  coverage: number
  colorClass: string
  headerBg: string
  route: string
}

interface Scope {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  iconBg: string
  categories: Category[]
}

interface ScopeSectionProps {
  scope: Scope
  isExpanded: boolean
  onToggle: () => void
  onCategoryClick: (route: string) => void
}

const ScopeSection = ({ scope, isExpanded, onToggle, onCategoryClick }: ScopeSectionProps) => {
  // Map scope IDs or Titles to specific colors as requested
  const getScopeColor = (scope: Scope) => {
    const id = scope.id.toLowerCase();
    const title = scope.title.toLowerCase();
    
    if (id === "scope-1" || title.includes("scope 1")) return "#014F86"; // Deep blue
    if (id === "scope-2" || title.includes("scope 2")) return "#38A3A5"; // Teal
    if (id === "scope-3" || title.includes("scope 3")) return "#B5E48C"; // Soft lime green
    
    return "#014F86";
  };

  const getScopeBadge = (scope: Scope) => {
    const id = scope.id.toLowerCase();
    const title = scope.title.toLowerCase();

    if (id === "scope-1" || title.includes("scope 1")) return "S1";
    if (id === "scope-2" || title.includes("scope 2")) return "S2";
    if (id === "scope-3" || title.includes("scope 3")) return "S3";

    return "S1";
  };

  const themeColor = getScopeColor(scope);
  const badgeText = getScopeBadge(scope);

  return (
    <ScopeContainer>
      <ScopeBar isExpanded={isExpanded} onClick={onToggle}>
        <ScopeHeader>
          <ScopeInfo>
            <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                backgroundColor: themeColor,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                flexShrink: 0
            }}>
                {badgeText}
            </div>
            <ScopeDetails>
              <h3>{scope.title}</h3>
              <p>{scope.description}</p>
            </ScopeDetails>
          </ScopeInfo>
          
          <CompletionSection>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: 200 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>Completion</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: themeColor }}>{scope.progress}%</span>
                </div>
                <div style={{ width: '100%', height: 8, backgroundColor: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${scope.progress}%`, height: '100%', backgroundColor: themeColor, borderRadius: 4 }} />
                </div>
             </div>
             <ExpandIcon isExpanded={isExpanded} style={{ color: '#9ca3af' }}>▶</ExpandIcon>
          </CompletionSection>
        </ScopeHeader>
      </ScopeBar>
      <ScopeContent isExpanded={isExpanded}>
        <CategoriesGrid>
          {scope.categories.map((category) => (
            <CategoryCard 
                key={category.id} 
                category={category} 
                themeColor={themeColor}
                onDataInput={() => onCategoryClick(category.route)} 
            />
          ))}
        </CategoriesGrid>
      </ScopeContent>
    </ScopeContainer>
  )
}

export default ScopeSection
