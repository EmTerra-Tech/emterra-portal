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
        <div className={HeaderTitle}>Data Collection Overview</div>
        <div className={HeaderSubtitle}>
          Track and manage greenhouse gas emissions across all scopes
        </div>
      </div>

      <div className={YearContainer}>
        <div className={HeaderSubtitle}>Assessment Year</div>
        <Select 
            defaultValue="2024" 
            style={{ width: 140 }}
            suffixIcon={null}
            options={[
                { value: '2024', label: '2024 (Current)' },
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
            ]}
        />
      </div>
    </div>
  );
};

export default DataCollectionHeader;

