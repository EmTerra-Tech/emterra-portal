"use client"

import { StyledFormActions, ActionGroup, Button } from "./styles"

interface FormActionsProps {
  onBackToOverview: () => void
  onSaveDraft?: () => void
  onSaveAndContinue?: () => void
}

const FormActions = ({ onBackToOverview, onSaveDraft, onSaveAndContinue }: FormActionsProps) => {
  return (
    <StyledFormActions>
      <Button variant="secondary" onClick={onBackToOverview}>
        ← Back to Overview
      </Button>
      <ActionGroup>
        <Button variant="secondary" onClick={onSaveDraft}>Save Draft</Button>
        <Button variant="primary" onClick={onSaveAndContinue}>Save & Continue →</Button>
      </ActionGroup>
    </StyledFormActions>
  )
}

export default FormActions
