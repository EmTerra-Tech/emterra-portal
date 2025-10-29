import { HeaderContainer, HeaderSubtitle, HeaderTitle } from "./styles";

const DataCollectionHeader = () => {
  return (
    <div className={HeaderContainer}>
      <div className={HeaderTitle}>
        <span>🔥</span>
        Scope-Based Data Collection
      </div>
      <div className={HeaderSubtitle}>
        Track and manage your greenhouse gas emissions across all three scopes
      </div>
    </div>
  );
};

export default DataCollectionHeader;

