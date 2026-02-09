/** @jsxImportSource @emotion/react */
import CompanyActions from "@/service/company-profile/actions";
import EmissionCollectionActions from "@/service/emission-collection/actions";
import { Scope } from "@/service/emission-collection/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataCollectionHeader from "../data-collection-header";
import ScopeSection from "../scope-section";
import { Container, SubmitButton } from "./styles";

const DataCollectionOverview = () => {
  const [scopesData, setScopesData] = useState<Scope[]>([]);
  const [expandedScope, setExpandedScope] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const router = useRouter();

  // Fetch assessment years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await CompanyActions.fetchCompanyProfileWithDetails();
        const years = response.annualData.map((item: any) => parseInt(item.year));
        setAvailableYears(years);
        if (years.length > 0) {
          setSelectedYear(years[0]); // Select first (most recent) year
        }
      } catch (error) {
        console.error("Error fetching assessment years:", error);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear === null) return;

    const fetchData = async () => {
      const data =
        await EmissionCollectionActions.fetchEmissionCollectionData(selectedYear);
      setScopesData(data);
    };

    fetchData();
  }, [selectedYear]);

  const toggleScope = (scopeId: string) => {
    setExpandedScope(expandedScope === scopeId ? null : scopeId);
  };

  const handleCategoryClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className={Container}>
      <DataCollectionHeader
        selectedYear={selectedYear}
        availableYears={availableYears}
        onYearChange={setSelectedYear}
      />

      {scopesData.map((scope) => (
        <ScopeSection
          key={scope.id}
          scope={scope}
          isExpanded={expandedScope === scope.id}
          onToggle={() => toggleScope(scope.id)}
          onCategoryClick={handleCategoryClick}
        />
      ))}

      <button className={SubmitButton}>
        Submit for Review
      </button>
    </div>
  );
};

export default DataCollectionOverview;

