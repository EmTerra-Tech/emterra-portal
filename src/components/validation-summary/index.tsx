"use client"

import { Grid } from "antd"
import { ValidationContainer, ValidationHeader, ValidationTitle, ValidationGrid, ValidationItem } from "./styles"

const validationItems: {type: "success" | "warning", icon: string, text: string}[] = [
  { type: "success", icon: "✅", text: "Scope 2 data quality: Excellent" },
  { type: "warning", icon: "⚠️", text: "3 categories need attention" },
  { type: "success", icon: "✅", text: "All required fields completed" },
  { type: "warning", icon: "⚠️", text: "Consider improving Scope 3 coverage" },
]

const ValidationSummary = () => {
  return (
    <div className={ValidationContainer}>
      <div className={ValidationHeader}>
        <span style={{ fontSize: "24px" }}>✅</span>
        <h2 className={ValidationTitle}>Data Validation Summary</h2>
      </div>
      <div className={ValidationGrid}>
        {validationItems.map((item, index) => (
          <div className={ValidationItem(item.type)} key={index}>
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValidationSummary
