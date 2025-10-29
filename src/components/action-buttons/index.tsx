/** @jsxImportSource @emotion/react */
import { useState } from "react";

import { ActionContainer, exportButton, submitButton } from "./styles";

const ActionButtons = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      alert("Data exported successfully! Download will begin shortly.");
      setIsExporting(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      alert(
        "Data submitted successfully for review! You will receive confirmation within 24 hours.",
      );
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 3000);
  };

  return (
    <div className={ActionContainer}>
      <button className={exportButton} onClick={handleExport} disabled={isExporting}>
        <span>{isExporting ? "⏳" : "📊"}</span>
        {isExporting ? "Exporting..." : "Data Export"}
      </button>
      <button className={submitButton} onClick={handleSubmit} disabled={isSubmitting}>
        <span>{isSubmitting ? "⏳" : isSubmitted ? "✅" : "🚀"}</span>
        {isSubmitting
          ? "Submitting..."
          : isSubmitted
            ? "Submitted"
            : "Submit for Review"}
      </button>
    </div>
  );
};

export default ActionButtons;

