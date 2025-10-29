"use client"

import { StyledFormActions, ActionGroup, Button } from "./styles"

interface FormActionsProps {
  onBackToOverview: () => void
}

const FormActions = ({ onBackToOverview }: FormActionsProps) => {
  return (
    <StyledFormActions>
      <Button variant="secondary" onClick={onBackToOverview}>
        ← Back to Overview
      </Button>
      <ActionGroup>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="primary">Save & Continue →</Button>
      </ActionGroup>
    </StyledFormActions>
  )
}

export default FormActions
