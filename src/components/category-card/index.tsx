"use client"

import {
  CarFilled,
  CloudFilled,
  DeleteFilled,
  ExperimentFilled,
  FireFilled,
  RocketFilled,
  ShopFilled,
  ThunderboltFilled
} from "@ant-design/icons"
import { useState } from "react"
import {
  BtnCollect,
  Card,
  CategoryBody,
  CategoryControls,
  CategoryHeader,
  EmissionAmount,
  EmissionLabel,
  EmissionValue,
  NALabel,
  NAToggle,
  ToggleSlider,
  UncertaintyRow
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
  themeColor?: string
  onDataInput: () => void
}

const CategoryCard = ({ category, themeColor = "#014F86", onDataInput }: CategoryCardProps) => {
  const [isNotApplicable, setIsNotApplicable] = useState(false)

  const handleToggleNA = (checked: boolean) => {
    setIsNotApplicable(checked)
  }

  const handleDataInput = () => {
    if (!isNotApplicable) {
      onDataInput()
    }
  }

  // Map category titles to AntD icons
  const getCategoryIcon = (title: string) => {
    const t = title.toLowerCase();
    const style = { fontSize: '20px' };
    
    if (t.includes("stationary")) return <FireFilled style={style} />;
    if (t.includes("mobile")) return <CarFilled style={style} />;
    if (t.includes("refrigerants")) return <ExperimentFilled style={style} />;
    if (t.includes("process")) return <CloudFilled style={style} />;
    if (t.includes("electricity")) return <ThunderboltFilled style={style} />;
    if (t.includes("steam")) return <CloudFilled style={style} />;
    if (t.includes("heating")) return <FireFilled style={style} />;
    if (t.includes("cooling")) return <ExperimentFilled style={style} />;
    if (t.includes("capital")) return <ShopFilled style={style} />;
    if (t.includes("waste")) return <DeleteFilled style={style} />;
    if (t.includes("travel") || t.includes("commuting")) return <RocketFilled style={style} />;
    
    return <FireFilled style={style} />; // Default
  };

  // Determine styles based on themeColor
  // For Scope 1 (blue), we want a specific look.
  // The user asked to "Analyze the icons... and backgrounds".
  // Assuming the user wants uniformity or a specific mismatch fix.
  // I will use a very light opacity background of the theme color, 
  // and the Icon itself will be the theme color.
  
  // However, for Scope 1, maybe they want the specific "Icon in a Box" look from the image.
  // I will use a 10% opacity background of the theme color.
  // We need to convert hex to rgba or just use a hardcoded lookup if we strictly know colors.
  
  let iconBg = "#e0f2fe"; // Default light blue
  if (themeColor === "#38A3A5") iconBg = "#E0F5F6"; // Light Teal
  if (themeColor === "#B5E48C") iconBg = "#F0FBE7"; // Light Lime

  return (
    <Card isNotApplicable={isNotApplicable}>
      <CategoryHeader isNotApplicable={isNotApplicable}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                background: isNotApplicable ? '#f1f5f9' : iconBg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: isNotApplicable ? '#94a3b8' : themeColor // Icon is theme color
            }}>
                {getCategoryIcon(category.title)}
            </div>
            <h4 style={{ color: '#0f172a', margin: 0, fontSize: '15px', fontWeight: 600 }}>{category.title}</h4>
        </div>
        <CategoryControls>
          <NAToggle>
            <input type="checkbox" checked={isNotApplicable} onChange={(e) => handleToggleNA(e.target.checked)} />
            <ToggleSlider checked={isNotApplicable} />
          </NAToggle>
          <NALabel>N/A</NALabel>
        </CategoryControls>
      </CategoryHeader>
      
      <CategoryBody>
        <EmissionValue>
          <EmissionLabel>Total Emissions</EmissionLabel>
          <EmissionAmount isNotApplicable={isNotApplicable}>{category.emissions}</EmissionAmount>
        </EmissionValue>
        
        <UncertaintyRow>
          <EmissionLabel>Data Quality</EmissionLabel>
           <span style={{ 
               background: isNotApplicable ? '#f1f5f9' : iconBg, 
               color: isNotApplicable ? '#94a3b8' : themeColor,
               padding: '4px 12px',
               borderRadius: '6px',
               fontSize: '12px',
               fontWeight: 600
           }}>
             {category.dataQuality || 'High'}
           </span>
        </UncertaintyRow>

        <BtnCollect 
            themeColor={themeColor} 
            isNotApplicable={isNotApplicable} 
            onClick={handleDataInput}
        >
          + Add Data
        </BtnCollect>
      </CategoryBody>
    </Card>
  )
}

export default CategoryCard
