"use client";

import { Select } from "antd";
import { Description, Header, Title, YearSelect } from "./styles";

const DataInputHeader = () => {
  return (
    <div className={Header}>
      <div>
        <h2 className={Title}>
          <span>🔥</span> Stationary Combustion Data
        </h2>
        <p className={Description}>
          Add emissions data for fuel combustion in stationary equipment
        </p>
      </div>
      <Select className={YearSelect} defaultValue="2025">
        <option>2025</option>
        <option>2023</option>
        <option>2022</option>
      </Select>
    </div>
  );
};

export default DataInputHeader;

