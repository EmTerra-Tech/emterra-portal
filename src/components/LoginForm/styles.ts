import { css } from "@emotion/css";

export const form = css`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;

  label {
    color: var(--color-text) !important;
    font-size: 1rem !important;
    font-weight: bold !important;
  }
  input {
    height: 50px;
    border-radius: 15px;
    background: rgba(var(--color-text-rgb), 0.05);
    color: var(--color-text);
  }
`;

export const textField = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  input {
    height: 50px;
    border-radius: 15px;
    background: rgba(var(--color-text-rgb), 0.05);
    color: var(--color-text);
  }
`;

export const label = css`
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
`;

export const checkboxStrip = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const forgotPassword = css`
  color: var(--color-secondary-light);
  font-size: 1rem;
  font-weight: bold;
`;

export const rememberMe = css`
  color: var(--color-text);
  font-size: 1rem;
`;

export const signIn = css`
  width: 100%;
  background: linear-gradient(
    to top left,
    var(--color-secondary),
    var(--color-secondary-light)
  );
  height: 50px;
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
