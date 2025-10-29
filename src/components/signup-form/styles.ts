import { css } from "@emotion/css";

export const container = css`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  gap: 20px;
`;

export const form = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const stepTitle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-secondary);
  svg {
    font-size: 2rem;
  }
`;

export const divider = css`
  width: 100%;
  height: 1px;
  background: rgba(var(--color-text-rgb), 0.1);
`;

export const formGrid = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  row-gap: 0px;
  box-sizing: border-box;
  label {
    color: var(--color-text) !important;
    font-size: 1rem !important;
    font-weight: bold !important;
  }
  input {
    height: 40px;
    color: var(--color-text);
  }

  .ant-input-number {
    width: 100% !important;
  }

  .ant-select.ant-select-in-form-item {
    height: 40px;
    .ant-select-selection-item {
      color: var(--color-text) !important;
    }
  }
`;

export const submit = css`
  width: 50%;
  align-self: center;
  background: linear-gradient(
    to top left,
    var(--color-secondary),
    var(--color-secondary-light)
  );
  height: 100px;
  padding: 10px;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.1rem;
  &:hover {
    background: linear-gradient(
      to top left,
      var(--color-secondary),
      var(--color-secondary-light)
    ) !important;
    scale: 1.01;
  }
`;

export const nextContainer = (step: number) => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${step === 0 ? "flex-end" : "space-between"};
  align-items: center;
`;

export const spanfull = css`
  grid-column: 1 / -1;
`;

export const mandatoryCheck = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const mandatoryCheckTiles = css`
  color: var(--color-text);
  font-size: 1rem;
  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: var(--color-secondary-light);
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
  }
`;

export const link = css`
  color: var(--color-secondary-light);
  font-size: 1rem;
  font-weight: bold;
`;

export const footer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--color-text);
    font-size: 1rem;

    a {
      color: var(--color-secondary);
      font-weight: bold;
      text-decoration: none;
    }
  }
`;
