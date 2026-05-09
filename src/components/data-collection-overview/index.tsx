/** @jsxImportSource @emotion/react */
import EmissionCollectionActions from "@/service/emission-collection/actions";
import EmissionsActions from "@/service/emissions/actions";
import { Scope } from "@/service/emission-collection/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataCollectionHeader from "../data-collection-header";
import ScopeSection from "../scope-section";
import { Container, SubmitButton } from "./styles";

const DataCollectionOverview = () => {
  const currentYear = new Date().getFullYear();
  const [scopesData, setScopesData] = useState<Scope[]>([]);
  const [expandedScope, setExpandedScope] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const years = await EmissionsActions.getAvailableYears();
      if (cancelled) return;
      const merged = years.length > 0 ? years : [currentYear];
      setAvailableYears(merged);
      setSelectedYear(currentYear);
    })();
    return () => {
      cancelled = true;
    };
  }, [currentYear]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await EmissionCollectionActions.fetchEmissionCollectionData(selectedYear);
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

