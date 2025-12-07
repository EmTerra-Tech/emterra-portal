import { Select } from "antd";
import {
  HeaderContainer,
  HeaderSubtitle,
  HeaderTitle,
  YearContainer,
} from "./styles";

const { Option } = Select;

const DataCollectionHeader = () => {
  return (
    <div className={HeaderContainer}>
      <div>
        <div className={HeaderTitle}>Scope-Based Data Collection</div>
        <div className={HeaderSubtitle}>
          Track and manage your greenhouse gas emissions across all three scopes
        </div>
      </div>

      <div className={YearContainer}>
        <div className={HeaderSubtitle}>Select Assesment Year</div>
        <Select defaultValue="2024">
          <Option>2024</Option>
          <Option>2023</Option>
          <Option>2022</Option>
        </Select>
      </div>
    </div>
  );
};

export default DataCollectionHeader;

