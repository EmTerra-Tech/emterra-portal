import { css } from "@emotion/css";

export const body = css`
  margin: 0;
  padding: 0;
`;

export const page = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: white;
  justify-content: center;
  align-items: center;
`;

export const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 70%;
  height: 70%;
  border-radius: 20px;
  box-shadow: 0px 0px 40px 0px rgba(var(--color-text-rgb), 0.2);
  // box-shadow: 13px 12px 41px -15px rgba(0, 0, 0, 0.1);
  background: var(--color-primary);
`;

export const left = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top left,
    var(--color-secondary),
    var(--color-secondary-light)
  );
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 20px 0px 0px 20px;
`;

export const logoOutline = css`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  background: rgba(var(--color-primary-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const logo = css`
  height: 60px;
  width: 60px;
`;

export const title = css`
  font-size: 3rem;
  font-weight: bold;
`;

export const subtitle = css`
  font-size: 1.2rem;
`;

export const right = css`
  background: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const welcome = css`
  font-size: 2rem;
  font-weight: 900;
`;
