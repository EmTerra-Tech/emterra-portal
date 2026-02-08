/** @jsxImportSource @emotion/react */
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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data =
        await EmissionCollectionActions.fetchEmissionCollectionData();
      setScopesData(data);
    };

    fetchData();
  }, []);

  const toggleScope = (scopeId: string) => {
    setExpandedScope(expandedScope === scopeId ? null : scopeId);
  };

  const handleCategoryClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className={Container}>
      <DataCollectionHeader />

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

