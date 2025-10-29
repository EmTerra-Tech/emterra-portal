"use client"

import CategoryCard from "../category-card"
import {
  ScopeContainer,
  ScopeBar,
  ScopeHeader,
  ScopeInfo,
  ScopeIcon,
  ScopeDetails,
  CompletionSection,
  CompletionText,
  ProgressBar,
  ProgressFill,
  ExpandIcon,
  ScopeContent,
  CategoriesGrid,
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
  const getProgressType = (progress: number) => {
    if (progress >= 70) return "high"
    if (progress >= 40) return "medium"
    return "low"
  }

  return (
    <ScopeContainer>
      <ScopeBar isExpanded={isExpanded} onClick={onToggle}>
        <ScopeHeader>
          <ScopeInfo>
            <ScopeIcon iconBg={scope.iconBg}>{scope.icon}</ScopeIcon>
            <ScopeDetails>
              <h3>{scope.title}</h3>
              <p>{scope.description}</p>
            </ScopeDetails>
          </ScopeInfo>
          <CompletionSection>
            <CompletionText>Overall Progress: {scope.progress}%</CompletionText>
            <ProgressBar>
              <ProgressFill width={scope.progress} progressType={getProgressType(scope.progress)} />
            </ProgressBar>
          </CompletionSection>
          <ExpandIcon isExpanded={isExpanded}>▶</ExpandIcon>
        </ScopeHeader>
      </ScopeBar>
      <ScopeContent isExpanded={isExpanded}>
        <CategoriesGrid>
          {scope.categories.map((category) => (
            <CategoryCard key={category.id} category={category} onDataInput={() => onCategoryClick(category.route)} />
          ))}
        </CategoriesGrid>
      </ScopeContent>
    </ScopeContainer>
  )
}

export default ScopeSection
