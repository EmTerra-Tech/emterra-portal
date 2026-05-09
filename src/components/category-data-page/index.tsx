"use client";

import BranchActions from "@/service/branch/actions";
import EmissionCollectionActions, {
  CombustionEntry,
  CombustionEntryData,
} from "@/service/emissions/actions";
import SchemaActions, { SchemaField } from "@/service/schema/actions";
import { CheckCircleFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Select, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import DynamicFormSection from "../dynamic-form-section";
import {
  AddEntryButton,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  EditButton,
  EmptyState,
  EntryCard,
  ExpandedContent,
  FacilityList,
  FacilityRow,
  FormGroup,
  FormSection,
  HeaderWrapper,
  InnerContainer,
  MainContent,
  MethodBadge,
  PageHeader,
  ProgressBarWrapper,
  ProgressHeader,
  ProgressInfo,
  RowContent,
  SectionTitle,
  Table,
  TitleSection,
  ToggleButton,
  ToggleGroup,
} from "../stationary-combustion/styles";
import { CategoryColumn, CategoryConfig } from "@/constants/category-config";

interface TableEntry extends CombustionEntryData {
  entryId: number | string;
  facilityId: number;
  facilityName: string;
  location: string;
}

// Stable, module-scoped EntryForm so React keeps the same input instances across
// keystrokes — declaring it inside the parent caused focus loss on every render.
interface EntryFormProps<T extends CombustionEntryData & { id: number }> {
  entries: T[];
  setEntries: (entries: T[]) => void;
  getNewEntry: () => T;
  schemas: Record<string, SchemaField[]>;
  readOnly?: boolean;
}

function EntryForm<T extends CombustionEntryData & { id: number }>({
  entries,
  setEntries,
  getNewEntry,
  schemas,
  readOnly,
}: EntryFormProps<T>) {
  const handleUpdateEntry = (idx: number, field: string, value: any) => {
    const newEntries = entries.map((e, i) => (i === idx ? { ...e, [field]: value } : e));
    setEntries(newEntries);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {entries.map((entry, index) => (
        <EntryCard key={entry.id}>
          <div className="header">
            <h4>Entry {index + 1}</h4>
            {!readOnly && entries.length > 1 && (
              <button onClick={() => setEntries(entries.filter((e) => e.id !== entry.id))}>×</button>
            )}
          </div>

          <FormGroup>
            <label>Calculation Method</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {["activity", "spend", "direct"].map((method) => {
                let variant: any = "default";
                if (method === "spend") variant = "warning";
                if (method === "direct") variant = "error";
                return (
                  <ToggleButton
                    key={method}
                    type="button"
                    active={entry.calculationMethod === method}
                    variant={variant}
                    disabled={readOnly}
                    onClick={() => {
                      if (readOnly) return;
                      const newEntries = entries.map((e, i) =>
                        i === index ? { ...e, calculationMethod: method } : e,
                      );
                      setEntries(newEntries);
                    }}
                  >
                    {method === "activity" ? "📊 Activity" : method === "spend" ? "💰 Spend" : "🎯 Direct"}
                  </ToggleButton>
                );
              })}
            </div>
          </FormGroup>

          <div style={{ marginTop: "1rem" }}>
            <DynamicFormSection
              schema={schemas[entry.calculationMethod || "activity"] || []}
              data={entry}
              onUpdateEntry={handleUpdateEntry}
              entryIndex={index}
              readOnly={readOnly}
            />
          </div>
        </EntryCard>
      ))}
      {!readOnly && (
        <AddEntryButton onClick={() => setEntries([...entries, getNewEntry()])}>
          <PlusOutlined /> Add Another Entry
        </AddEntryButton>
      )}
    </div>
  );
}

const CategoryDataPage = ({ config }: { config: CategoryConfig }) => {
  const { scope } = config;
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const [allFacilities, setAllFacilities] = useState<any[]>([]);
  const [tableEntries, setTableEntries] = useState<TableEntry[]>([]);
  const [noDataFacilities, setNoDataFacilities] = useState<any[]>([]);
  const [expandedFacilities, setExpandedFacilities] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const [schemas, setSchemas] = useState<Record<string, SchemaField[]>>({
    activity: [],
    spend: [],
    direct: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFacilityId, setModalFacilityId] = useState<number | null>(null);
  const [modalEntries, setModalEntries] = useState<(TableEntry & { id: number })[]>([]);

  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [dataAvailability, setDataAvailability] = useState<string>("yes");
  const [notAvailableReason, setNotAvailableReason] = useState<string>("");
  const [formEntries, setFormEntries] = useState<(CombustionEntryData & { id: number })[]>([
    { id: 1, calculationMethod: "activity" },
  ]);

  // Year dropdown is sourced from the backend's distinct emission-data years
  // for this company+scope. Current year is guaranteed by the BE.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const years = await EmissionCollectionActions.getAvailableYears(scope);
      if (cancelled) return;
      const merged = years.length > 0 ? years : [currentYear];
      setAvailableYears(merged);
      setSelectedYear(currentYear);
    })();
    return () => {
      cancelled = true;
    };
  }, [currentYear, scope]);

  const isReadOnly = selectedYear !== currentYear;

  // Fetch entries + branches + per-method schemas whenever scope or year changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [branches, emissions, activitySchema, spendSchema, directSchema] = await Promise.all([
          BranchActions.getAllBranches(),
          EmissionCollectionActions.getCombustionEntries(scope, selectedYear),
          SchemaActions.getSchema(scope, "YES", "activity"),
          SchemaActions.getSchema(scope, "YES", "spend"),
          SchemaActions.getSchema(scope, "YES", "direct"),
        ]);
        if (cancelled) return;

        setAllFacilities(branches);
        setSchemas({
          activity: activitySchema || [],
          spend: spendSchema || [],
          direct: directSchema || [],
        });

        const existingEntries: TableEntry[] = [];
        const existingNoData: any[] = [];

        (emissions as CombustionEntry[]).forEach((emission) => {
          const branch = branches.find((b: any) => b.id === emission.branchId);
          if (emission.availability === "YES" && emission.data) {
            const method = emission.data.calculationMethod || "activity";
            existingEntries.push({
              entryId: emission.id,
              facilityId: emission.branchId,
              facilityName: emission.branchName || branch?.name || "Unknown",
              location: branch?.city || "Unknown",
              ...emission.data,
              calculationMethod: method,
            } as TableEntry);
          } else if (emission.availability !== "YES") {
            existingNoData.push({
              facilityId: emission.branchId,
              facilityName: emission.branchName || branch?.name || "Unknown",
              location: branch?.city || "Unknown",
              status: emission.availability === "NOT_AVAILABLE" ? "not_available" : "not_applicable",
              reason: (emission.data as any)?.reason || (emission.data as any)?.description || "",
            });
          }
        });

        setTableEntries(existingEntries);
        setNoDataFacilities(existingNoData);

        const completedIds = new Set([
          ...existingEntries.map((e) => e.facilityId),
          ...existingNoData.map((e) => e.facilityId),
        ]);
        const firstPending = branches.find((b: any) => !completedIds.has(b.id));
        setSelectedFacilityId(firstPending ? firstPending.id : null);
      } catch (error) {
        console.error("Error fetching category data:", error);
        message.error("Failed to load facility data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [scope, selectedYear]);

  const toggleExpanded = (facilityId: number) => {
    setExpandedFacilities((prev) => {
      const next = new Set(prev);
      if (next.has(facilityId)) next.delete(facilityId);
      else next.add(facilityId);
      return next;
    });
  };

  const renderCell = (col: CategoryColumn, entry: TableEntry): React.ReactNode => {
    const value = col.fields.map((f) => (entry as any)[f]).find((v) => v !== undefined && v !== null && v !== "");
    if (col.render === "method") return getMethodBadge(String(value || "activity"));
    if (col.render === "number") {
      const n = Number(value || 0);
      return <span className="mono">{Number.isFinite(n) ? n.toLocaleString() : "-"}</span>;
    }
    return value !== undefined ? String(value) : "-";
  };

  const getMethodBadge = (method: string) => {
    const cfg: Record<string, { label: string; icon: string }> = {
      activity: { label: "Activity", icon: "📊" },
      spend: { label: "Spend", icon: "💰" },
      direct: { label: "Direct", icon: "🎯" },
    };
    const c = cfg[method] || cfg.activity;
    return (
      <MethodBadge method={method}>
        {c.icon} {c.label}
      </MethodBadge>
    );
  };

  const openModal = (facilityId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const entries = tableEntries.filter((x) => x.facilityId === facilityId);
    setModalFacilityId(facilityId);
    setModalEntries(entries.map((entry, idx) => ({ id: idx + 1, ...entry })));
    setIsModalOpen(true);
  };

  const saveModalChanges = async () => {
    if (!modalFacilityId) return;
    try {
      await EmissionCollectionActions.postCombustionEntry(
        modalEntries,
        scope,
        selectedYear,
        "yes",
        "SUBMITTED",
        modalFacilityId,
      );
      message.success("Entries updated successfully");

      const otherEntries = tableEntries.filter((e) => e.facilityId !== modalFacilityId);
      const facility = allFacilities.find((f) => f.id === modalFacilityId);
      const updatedEntries = modalEntries.map((entry, idx) => ({
        ...entry,
        entryId: entry.entryId || `e-${Date.now()}-${idx}`,
        facilityId: modalFacilityId,
        facilityName: facility?.name,
        location: facility?.city,
      }));

      setTableEntries([...otherEntries, ...updatedEntries]);
      setIsModalOpen(false);
    } catch {
      message.error("Failed to update entries");
    }
  };

  const handleSaveData = async () => {
    if (!selectedFacilityId) return;

    try {
      if (dataAvailability === "not_available") {
        if (!notAvailableReason.trim()) {
          message.warning("Please provide a reason");
          return;
        }
        await EmissionCollectionActions.saveAvailability(scope, selectedYear, "not_available", selectedFacilityId);
        const facility = allFacilities.find((f) => f.id === selectedFacilityId);
        setNoDataFacilities([
          ...noDataFacilities,
          {
            facilityId: selectedFacilityId,
            facilityName: facility?.name,
            location: facility?.city,
            status: "not_available",
            reason: notAvailableReason,
          },
        ]);
      } else if (dataAvailability === "not_applicable") {
        await EmissionCollectionActions.saveAvailability(scope, selectedYear, "not_applicable", selectedFacilityId);
        const facility = allFacilities.find((f) => f.id === selectedFacilityId);
        setNoDataFacilities([
          ...noDataFacilities,
          {
            facilityId: selectedFacilityId,
            facilityName: facility?.name,
            location: facility?.city,
            status: "not_applicable",
            reason: "",
          },
        ]);
      } else {
        if (formEntries.length === 0) {
          message.warning("Please add at least one entry");
          return;
        }
        await EmissionCollectionActions.postCombustionEntry(
          formEntries,
          scope,
          selectedYear,
          "yes",
          "SUBMITTED",
          selectedFacilityId,
        );
        const facility = allFacilities.find((f) => f.id === selectedFacilityId);
        const newTableEntries = formEntries.map((entry, idx) => ({
          ...entry,
          entryId: `new-${Date.now()}-${idx}`,
          facilityId: selectedFacilityId,
          facilityName: facility?.name,
          location: facility?.city,
        })) as TableEntry[];
        setTableEntries([...tableEntries, ...newTableEntries]);
      }

      message.success("Data saved successfully");
      moveToNextFacility();
    } catch {
      message.error("Failed to save data");
    }
  };

  const moveToNextFacility = () => {
    const completedIds = new Set([
      ...tableEntries.map((e) => e.facilityId),
      ...noDataFacilities.map((e) => e.facilityId),
      selectedFacilityId,
    ]);
    const next = allFacilities.find((f) => !completedIds.has(f.id));
    setSelectedFacilityId(next ? next.id : null);
    setFormEntries([{ id: 1, calculationMethod: "activity" }]);
    setDataAvailability("yes");
    setNotAvailableReason("");
  };

  const facilitiesWithEntries = useMemo(
    () => Array.from(new Set(tableEntries.map((e) => e.facilityId))),
    [tableEntries],
  );
  const allCompletedFacilityIds = useMemo(
    () => [...facilitiesWithEntries, ...noDataFacilities.map((f) => f.facilityId)],
    [facilitiesWithEntries, noDataFacilities],
  );
  const completionPercentage =
    allFacilities.length > 0 ? Math.round((allCompletedFacilityIds.length / allFacilities.length) * 100) : 0;

  const groupedEntries = facilitiesWithEntries.map((facilityId) => {
    const entries = tableEntries.filter((e) => e.facilityId === facilityId);
    return {
      facilityId,
      facilityName: entries[0]?.facilityName,
      location: entries[0]?.location,
      entries,
      totalEntries: entries.length,
    };
  });

  if (loading && allFacilities.length === 0) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading Data...</div>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <InnerContainer>
          <Breadcrumb>
            <span className="link" onClick={() => router.push("/data-collection")}>
              Data Collection
            </span>
            <span>/</span>
            <span className="active">{config.breadcrumbLabel}</span>
          </Breadcrumb>
        </InnerContainer>
      </HeaderWrapper>

      <MainContent>
        <PageHeader>
          <TitleSection>
            <div className="icon" style={{ color: config.iconColor }}>
              {config.icon}
            </div>
            <div className="text">
              <h1>{config.title}</h1>
              <p>{config.description}</p>
            </div>
          </TitleSection>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#64748b", fontSize: 14 }}>Year:</span>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              style={{ width: 140 }}
              options={availableYears.map((y) => ({
                value: y,
                label: y === currentYear ? `${y} (Current)` : `${y}`,
              }))}
            />
          </div>
        </PageHeader>

        <Card>
          <CardHeader>
            <ProgressHeader>
              <ProgressInfo>
                <div className="icon-box">
                  <CheckCircleFilled />
                </div>
                <div>
                  <h2>Completed Facilities</h2>
                  <p>
                    {allCompletedFacilityIds.length} of {allFacilities.length} facilities completed
                  </p>
                </div>
              </ProgressInfo>
              <ProgressBarWrapper>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${completionPercentage}%` }} />
                </div>
                <span>{completionPercentage}%</span>
              </ProgressBarWrapper>
            </ProgressHeader>
          </CardHeader>

          {groupedEntries.length > 0 && (
            <FacilityList>
              {groupedEntries.map((group) => {
                const isExpanded = expandedFacilities.has(group.facilityId);
                return (
                  <div key={group.facilityId}>
                    <FacilityRow onClick={() => toggleExpanded(group.facilityId)}>
                      <RowContent>
                        <button className="toggle">{isExpanded ? "▼" : "▶"}</button>
                        <div className="details">
                          <span className="name">{group.facilityName}</span>
                          <span className="divider">•</span>
                          <span className="location">{group.location}</span>
                        </div>
                        <Badge>{group.totalEntries} entries</Badge>
                        <Badge variant="success">
                          <CheckCircleFilled /> Complete
                        </Badge>
                      </RowContent>
                      {!isReadOnly && (
                        <EditButton onClick={(e) => openModal(group.facilityId, e)}>
                          <EditOutlined /> Edit
                        </EditButton>
                      )}
                    </FacilityRow>
                    {isExpanded && (
                      <ExpandedContent>
                        <Table>
                          <thead>
                            <tr>
                              {config.columns.map((col) => (
                                <th key={col.label} style={{ width: col.width }}>
                                  {col.label.toUpperCase()}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {group.entries.map((e) => (
                              <tr key={e.entryId}>
                                {config.columns.map((col) => (
                                  <td key={col.label}>{renderCell(col, e)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </ExpandedContent>
                    )}
                  </div>
                );
              })}
            </FacilityList>
          )}
        </Card>

        {allFacilities.length === 0 ? (
          <EmptyState>
            <div className="icon">🏢</div>
            <h3>No facilities yet</h3>
            <p>
              Add a facility from <a onClick={() => router.push("/company-profile")} style={{ color: "#10b981", cursor: "pointer" }}>Company Profile</a> to start collecting emissions data.
            </p>
          </EmptyState>
        ) : isReadOnly ? (
          groupedEntries.length === 0 && noDataFacilities.length === 0 ? (
            <EmptyState>
              <div className="icon">📅</div>
              <h3>No data found for {selectedYear}</h3>
              <p>
                Switch to {currentYear} (Current) to add data, or pick a year that has historical entries.
              </p>
            </EmptyState>
          ) : (
            <Card>
              <FormSection>
                <SectionTitle>Viewing {selectedYear} (read-only)</SectionTitle>
                <p style={{ color: "#64748b", margin: 0 }}>
                  Data for past assessment years can only be viewed. Switch to {currentYear} (Current) to add or edit entries.
                </p>
              </FormSection>
            </Card>
          )
        ) : selectedFacilityId ? (
          <Card>
            <FormSection>
              <SectionTitle>Add Data for Pending Facility</SectionTitle>

              <FormGroup>
                <label>Select Facility</label>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={selectedFacilityId}
                  onChange={setSelectedFacilityId}
                  options={allFacilities
                    .filter((f) => !allCompletedFacilityIds.includes(f.id))
                    .map((f) => ({ label: f.name, value: f.id }))}
                />
              </FormGroup>

              <FormGroup>
                <label>{config.availabilityQuestion}</label>
                <ToggleGroup>
                  {["yes", "not_available", "not_applicable"].map((status) => (
                    <ToggleButton key={status} active={dataAvailability === status} onClick={() => setDataAvailability(status)}>
                      {status === "yes"
                        ? "Yes, I have the data"
                        : status === "not_available"
                          ? "Data not available"
                          : "Data not applicable"}
                    </ToggleButton>
                  ))}
                </ToggleGroup>
              </FormGroup>

              {dataAvailability === "yes" ? (
                <>
                  <EntryForm
                    entries={formEntries}
                    setEntries={setFormEntries}
                    getNewEntry={() => ({ id: Date.now(), calculationMethod: "activity" })}
                    schemas={schemas}
                  />
                  <ButtonGroup>
                    <Button type="primary" size="large" onClick={handleSaveData} style={{ backgroundColor: "#10b981" }}>
                      Save & Continue
                    </Button>
                  </ButtonGroup>
                </>
              ) : (
                <div style={{ backgroundColor: "#f8fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                  {dataAvailability === "not_available" && (
                    <FormGroup>
                      <label>Reason</label>
                      <textarea
                        rows={3}
                        placeholder="Why is data not available?"
                        value={notAvailableReason}
                        onChange={(e) => setNotAvailableReason(e.target.value)}
                      />
                    </FormGroup>
                  )}
                  <ButtonGroup>
                    <Button type="primary" size="large" onClick={handleSaveData}>
                      Save Status
                    </Button>
                  </ButtonGroup>
                </div>
              )}
            </FormSection>
          </Card>
        ) : (
          <EmptyState>
            <div className="icon">
              <CheckCircleFilled />
            </div>
            <h3>All Facilities Completed!</h3>
            <p>You have provided data for all facilities.</p>
          </EmptyState>
        )}
      </MainContent>

      <Modal title="Edit Facility Data" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={saveModalChanges} width={800}>
        <div style={{ padding: "1rem 0" }}>
          <EntryForm
            entries={modalEntries}
            setEntries={setModalEntries}
            schemas={schemas}
            getNewEntry={() => {
              const facility = allFacilities.find((f) => f.id === modalFacilityId);
              return {
                id: Date.now(),
                calculationMethod: "activity",
                entryId: `new-${Date.now()}`,
                facilityId: modalFacilityId!,
                facilityName: facility?.name || "",
                location: facility?.city || "",
              };
            }}
          />
        </div>
      </Modal>
    </Container>
  );
};

export default CategoryDataPage;
