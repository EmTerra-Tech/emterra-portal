import { Select, Tooltip } from "antd";
import {
    HeaderContainer,
    HeaderSubtitle,
    HeaderTitle,
    YearContainer,
} from "./styles";

interface DataCollectionHeaderProps {
  selectedYear: number;
  availableYears: number[];
  onYearChange: (year: number) => void;
}

const DataCollectionHeader = ({ selectedYear, availableYears, onYearChange }: DataCollectionHeaderProps) => {
  const currentYear = new Date().getFullYear();
  const years = availableYears.length > 0 ? availableYears : [currentYear];

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
        <Tooltip
          title={availableYears.length === 0 ? "Add Assessment Year in Company Profile" : ""}
          placement="bottom"
        >
          <Select
            value={selectedYear}
            onChange={onYearChange}
            style={{ width: 140 }}
            suffixIcon={null}
            disabled={availableYears.length === 0}
            options={years.map((year) => ({
              value: year,
              label: year === currentYear ? `${year} (Current)` : `${year}`,
            }))}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DataCollectionHeader;

