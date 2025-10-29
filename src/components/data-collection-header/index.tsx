/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const headerContainer = css`
  /* your styles here */
`;

const headerTitle = css`
  /* your styles here */
`;

const headerSubtitle = css`
  /* your styles here */
`;

const DataCollectionHeader = () => {
  return (
    <div css={headerContainer}>
      <div css={headerTitle}>
        <span>🔥</span>
        Scope-Based Data Collection
      </div>
      <div css={headerSubtitle}>
        Track and manage your greenhouse gas emissions across all three scopes
      </div>
    </div>
  );
};

export default DataCollectionHeader;

