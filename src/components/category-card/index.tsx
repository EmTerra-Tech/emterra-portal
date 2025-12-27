"use client"

import { useState } from "react"
import EmissionCollectionActions from "@/service/emissions/actions"
import {
  Card,
  CategoryHeader,
  CategoryControls,
  InfoIcon,
  NAToggle,
  ToggleSlider,
  NALabel,
  NABadge,
  CategoryBody,
  EmissionValue,
  EmissionLabel,
  EmissionAmount,
  UncertaintyRow,
  UncertaintyValue,
  CompletionRow,
  CompletionHeader,
  CompletionLabel,
  CompletionPercent,
  MiniProgressBar,
  MiniProgressFill,
  CategoryActions,
  BtnCollect,
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

interface CategoryCardProps {
  category: Category
  onDataInput: () => void
}

const CategoryCard = ({ category, onDataInput }: CategoryCardProps) => {
  const [isNotApplicable, setIsNotApplicable] = useState(false)

  const handleToggleNA = (checked: boolean) => {
    setIsNotApplicable(checked)
  }

  const handleDataInput = () => {
    if (!isNotApplicable) {
      onDataInput()
    }
  }

  return (
    <Card isNotApplicable={isNotApplicable}>
      <CategoryHeader headerBg={category.headerBg} isNotApplicable={isNotApplicable}>
        <span style={{ fontSize: "20px" }}>{category.icon}</span>
        <h4>{category.title}</h4>
        <CategoryControls>
          <NAToggle>
            <input type="checkbox" checked={isNotApplicable} onChange={(e) => handleToggleNA(e.target.checked)} />
            <ToggleSlider checked={isNotApplicable} />
          </NAToggle>
          <NALabel>N/A</NALabel>
          <InfoIcon>ℹ️</InfoIcon>
        </CategoryControls>
      </CategoryHeader>
      <NABadge show={isNotApplicable}>NOT APPLICABLE</NABadge>
      <CategoryBody>
        <EmissionValue>
          <EmissionLabel>Total Emissions:</EmissionLabel>
          <EmissionAmount isNotApplicable={isNotApplicable}>{category.emissions}</EmissionAmount>
        </EmissionValue>
        <UncertaintyRow>
          <EmissionLabel>Data Quality:</EmissionLabel>
          <UncertaintyValue isNotApplicable={isNotApplicable}>{category.dataQuality}</UncertaintyValue>
        </UncertaintyRow>
        <CompletionRow>
          <CompletionHeader>
            <CompletionLabel>Data Coverage</CompletionLabel>
            <CompletionPercent isNotApplicable={isNotApplicable}>{category.coverage}%</CompletionPercent>
          </CompletionHeader>
          <MiniProgressBar>
            <MiniProgressFill
              width={category.coverage}
              headerBg={category.headerBg}
              isNotApplicable={isNotApplicable}
            />
          </MiniProgressBar>
        </CompletionRow>
        <CategoryActions>
          <BtnCollect headerBg={category.headerBg} isNotApplicable={isNotApplicable} onClick={handleDataInput}>
            <span>📊</span> Data Input
          </BtnCollect>
        </CategoryActions>
      </CategoryBody>
    </Card>
  )
}

export default CategoryCard
