"use client";

import DashboardLayout from "../../../../../components/dashboard-layout";
import DataInputForm from "../../../../../components/data-input-form";
import CategoryDataPage from "../../../../../components/category-data-page";
import { CATEGORY_CONFIG, ROUTE_TO_SCOPE } from "@/constants/category-config";

interface PageProps {
  params: {
    scope: string;
    category: string;
  };
}

export default function DataCollectionDetailPage({ params }: PageProps) {
  const { scope: scopeSlug, category: categorySlug } = params;

  const scopeType = ROUTE_TO_SCOPE[scopeSlug]?.[categorySlug];

  if (!scopeType) {
    return (
      <DashboardLayout>
        <div style={{ padding: "2rem" }}>
          <h2>Invalid Route</h2>
          <p>The requested scope and category combination is not valid.</p>
          <p>
            Scope: {scopeSlug}, Category: {categorySlug}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const config = CATEGORY_CONFIG[scopeType];
  if (config) {
    return (
      <DashboardLayout>
        <CategoryDataPage config={config} />
      </DashboardLayout>
    );
  }

  // Scope 3 categories (and any others without a CategoryConfig) keep the
  // simpler legacy entry form for now.
  return (
    <DashboardLayout>
      <DataInputForm scope={scopeType} />
    </DashboardLayout>
  );
}
