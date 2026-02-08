"use client";

import BranchActions from '@/service/branch/actions';
import EmissionCollectionActions, { CombustionEntry, CombustionEntryData } from '@/service/emissions/actions';
import SchemaActions, { SchemaField } from '@/service/schema/actions';
import {
    CheckCircleFilled,
    EditOutlined,
    FireFilled,
    PlusOutlined
} from '@ant-design/icons';
import { Button, message, Modal, Select } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DynamicFormSection from '../dynamic-form-section';
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
    ToggleGroup
} from './styles';

interface StationaryCombustionProps {
  scope: string;
}

interface TableEntry extends CombustionEntryData {
  entryId: number | string;
  facilityId: number;
  facilityName: string;
  location: string;
}

const StationaryCombustion = ({ scope }: StationaryCombustionProps) => {
  const router = useRouter();
  const [allFacilities, setAllFacilities] = useState<any[]>([]);
  const [tableEntries, setTableEntries] = useState<TableEntry[]>([]);
  const [noDataFacilities, setNoDataFacilities] = useState<any[]>([]);
  const [expandedFacilities, setExpandedFacilities] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Schema State
  const [schemas, setSchemas] = useState<Record<string, SchemaField[]>>({
    activity: [],
    spend: [],
    direct: []
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFacilityId, setModalFacilityId] = useState<number | null>(null);
  const [modalEntries, setModalEntries] = useState<(TableEntry & { id: number })[]>([]);

  // Selected Facility for New Entry
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [dataAvailability, setDataAvailability] = useState<string>('yes');
  const [notAvailableReason, setNotAvailableReason] = useState<string>('');
  const [formEntries, setFormEntries] = useState<(CombustionEntryData & { id: number })[]>([
    { id: 1, calculationMethod: 'activity' } // Initial entry with just ID and method
  ]);

  // Fetch initial data and schemas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [branches, emissions, activitySchema, spendSchema, directSchema] = await Promise.all([
          BranchActions.getAllBranches(),
          EmissionCollectionActions.getCombustionEntries(scope),
          SchemaActions.getSchema(scope, 'YES', 'activity'),
          SchemaActions.getSchema(scope, 'YES', 'spend'),
          SchemaActions.getSchema(scope, 'YES', 'direct')
        ]);

        setAllFacilities(branches);
        setSchemas({
            activity: activitySchema || [],
            spend: spendSchema || [],
            direct: directSchema || []
        });
        
        const existingEntries: TableEntry[] = [];
        const existingNoData: any[] = [];

        (emissions as CombustionEntry[]).forEach((emission) => {
            if (emission.availability === 'YES' && emission.data) {
                // Determine calculation method from data keys if not explicitly stored
                const method = emission.data.calculationMethod || 'activity'; 
                
                // Map API fields to UI fields if necessary
                // The API returns 'consumptionAmount', but UI/Schema might use 'amount'
                const uiData = {
                    ...emission.data,
                    amount: emission.data.amount || emission.data.consumptionAmount,
                    calculationMethod: method
                };

                existingEntries.push({
                    entryId: emission.id,
                    facilityId: emission.branchId,
                    facilityName: emission.branchName || branches.find((b: any) => b.id === emission.branchId)?.name || 'Unknown',
                    location: branches.find((b: any) => b.id === emission.branchId)?.city || 'Unknown',
                    ...uiData
                });
            } else if (emission.availability !== 'YES') {
                existingNoData.push({
                    facilityId: emission.branchId,
                    facilityName: emission.branchName || branches.find((b: any) => b.id === emission.branchId)?.name || 'Unknown',
                    location: branches.find((b: any) => b.id === emission.branchId)?.city || 'Unknown',
                    status: emission.availability === 'NOT_AVAILABLE' ? 'not_available' : 'not_applicable',
                    reason: emission.data?.description || '' // 'reason' might be in description or data
                });
            }
        });

        setTableEntries(existingEntries);
        setNoDataFacilities(existingNoData);

        const completedIds = new Set([...existingEntries.map(e => e.facilityId), ...existingNoData.map(e => e.facilityId)]);
        const firstPending = branches.find((b: any) => !completedIds.has(b.id));
        if (firstPending) setSelectedFacilityId(firstPending.id);

      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load facility data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [scope]);

  // --- Helper Functions ---

  const toggleExpanded = (facilityId: number) => {
    const newExpanded = new Set(expandedFacilities);
    if (newExpanded.has(facilityId)) {
      newExpanded.delete(facilityId);
    } else {
      newExpanded.add(facilityId);
    }
    setExpandedFacilities(newExpanded);
  };

  const getMethodBadge = (method: string) => {
    const config: any = {
      activity: { label: 'Activity', icon: '📊' },
      spend: { label: 'Spend', icon: '💰' },
      direct: { label: 'Direct', icon: '🎯' },
    };
    const c = config[method] || config.activity;
    return (
      <MethodBadge method={method}>
        {c.icon} {c.label}
      </MethodBadge>
    );
  };

  // --- Modal Logic ---

  const openModal = (facilityId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const facility = allFacilities.find(f => f.id === facilityId);
    const entries = tableEntries.filter(e => e.facilityId === facilityId);
    setModalFacilityId(facilityId);
    setModalEntries(entries.map((entry, idx) => ({
      id: idx + 1,
      ...entry
    })));
    setIsModalOpen(true);
  };

  const saveModalChanges = async () => {
    if (!modalFacilityId) return;
    try {
        await EmissionCollectionActions.postCombustionEntry(
            modalEntries,
            scope,
            2025,
            "yes",
            "SUBMITTED",
            modalFacilityId
        );
        message.success("Entries updated successfully");

        const otherEntries = tableEntries.filter(e => e.facilityId !== modalFacilityId);
        const facility = allFacilities.find(f => f.id === modalFacilityId);
        
        const updatedEntries = modalEntries.map((entry, idx) => ({
             ...entry,
             entryId: entry.entryId || `e-${Date.now()}-${idx}`,
             facilityId: modalFacilityId,
             facilityName: facility?.name,
             location: facility?.city
        }));

        setTableEntries([...otherEntries, ...updatedEntries]);
        setIsModalOpen(false);
    } catch (error) {
        message.error("Failed to update entries");
    }
  };

  // --- Main Form Logic ---

  const handleSaveData = async () => {
    if (!selectedFacilityId) return;

    try {
        if (dataAvailability === 'not_available') {
            if (!notAvailableReason.trim()) {
                message.warning("Please provide a reason");
                return;
            }
             await EmissionCollectionActions.saveAvailability(
                scope,
                2025,
                "not_available",
                selectedFacilityId
            );
            const facility = allFacilities.find(f => f.id === selectedFacilityId);
            setNoDataFacilities([...noDataFacilities, {
                facilityId: selectedFacilityId,
                facilityName: facility?.name,
                location: facility?.city,
                status: 'not_available',
                reason: notAvailableReason
            }]);

        } else if (dataAvailability === 'not_applicable') {
             await EmissionCollectionActions.saveAvailability(
                scope,
                2025,
                "not_applicable",
                selectedFacilityId
            );
            const facility = allFacilities.find(f => f.id === selectedFacilityId);
            setNoDataFacilities([...noDataFacilities, {
                facilityId: selectedFacilityId,
                facilityName: facility?.name,
                location: facility?.city,
                status: 'not_applicable',
                reason: ''
            }]);

        } else {
            // Check validation
            // Ideally should validate against schema required fields
            if (formEntries.length === 0) {
                 message.warning("Please add at least one entry");
                 return;
            }

            await EmissionCollectionActions.postCombustionEntry(
                formEntries,
                scope,
                2025,
                "yes",
                "SUBMITTED",
                selectedFacilityId
            );

             const facility = allFacilities.find(f => f.id === selectedFacilityId);
             const newTableEntries = formEntries.map((entry, idx) => ({
                 ...entry,
                 entryId: `new-${Date.now()}-${idx}`,
                 facilityId: selectedFacilityId,
                 facilityName: facility?.name,
                 location: facility?.city
             }));
             setTableEntries([...tableEntries, ...newTableEntries]);
        }

        message.success("Data saved successfully");
        moveToNextFacility();

    } catch (error) {
        message.error("Failed to save data");
    }
  };

  const moveToNextFacility = () => {
    const completedIds = new Set([
        ...tableEntries.map(e => e.facilityId), 
        ...noDataFacilities.map(e => e.facilityId),
        selectedFacilityId // Include current one as completed
    ]);
    const nextFacility = allFacilities.find(f => !completedIds.has(f.id));
    if (nextFacility) {
        setSelectedFacilityId(nextFacility.id);
    } else {
        setSelectedFacilityId(null);
    }
    setFormEntries([{ id: 1, calculationMethod: 'activity' }]);
    setDataAvailability('yes');
    setNotAvailableReason('');
  };

  // --- Render Helpers ---

  const facilitiesWithEntries = [...new Set(tableEntries.map(e => e.facilityId))];
  const allCompletedFacilityIds = [...facilitiesWithEntries, ...noDataFacilities.map(f => f.facilityId)];
  const completionPercentage = allFacilities.length > 0 
    ? Math.round((allCompletedFacilityIds.length / allFacilities.length) * 100) 
    : 0;

  const groupedEntries = facilitiesWithEntries.map(facilityId => {
    const entries = tableEntries.filter(e => e.facilityId === facilityId);
    return {
      facilityId,
      facilityName: entries[0]?.facilityName,
      location: entries[0]?.location,
      entries,
      totalEntries: entries.length
    };
  });

  const EntryForm = <T extends CombustionEntryData & { id: number }>({ 
    entries, 
    setEntries, 
    isModal = false,
    getNewEntry
  }: { 
    entries: T[]; 
    setEntries: (entries: T[]) => void; 
    isModal?: boolean;
    getNewEntry: () => T;
  }) => {
    
    const handleUpdateEntry = (idx: number, field: string, value: any) => {
        const newEntries = [...entries];
        newEntries[idx] = { ...newEntries[idx], [field]: value };
        setEntries(newEntries);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.map((entry, index) => (
            <EntryCard key={entry.id}>
            <div className="header">
                <h4>Entry {index + 1}</h4>
                {entries.length > 1 && (
                <button
                    onClick={() => setEntries(entries.filter((e) => e.id !== entry.id))}
                >
                    ×
                </button>
                )}
            </div>

            <FormGroup>
                <label>Calculation Method</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['activity', 'spend', 'direct'].map((method) => {
                        let variant: any = 'default';
                        if (method === 'spend') variant = 'warning';
                        if (method === 'direct') variant = 'error';

                        return (
                            <ToggleButton
                                key={method}
                                type="button"
                                active={entry.calculationMethod === method}
                                variant={variant}
                                onClick={() => {
                                    const newEntries = [...entries];
                                    newEntries[index] = { 
                                        ...newEntries[index], // Preserve current fields
                                        calculationMethod: method 
                                    };
                                    setEntries(newEntries);
                                }}
                            >
                                {method === 'activity' ? '📊 Activity' : method === 'spend' ? '💰 Spend' : '🎯 Direct'}
                            </ToggleButton>
                        )
                    })}
                </div>
            </FormGroup>

            {/* Dynamic Form Section based on Schema */}
            <div style={{ marginTop: '1rem' }}>
                <DynamicFormSection
                    schema={schemas[entry.calculationMethod || 'activity'] || []}
                    data={entry}
                    onUpdateEntry={handleUpdateEntry}
                    entryIndex={index}
                />
            </div>

            </EntryCard>
        ))}
        <AddEntryButton
            onClick={() => setEntries([...entries, getNewEntry()])}
        >
            <PlusOutlined /> Add Another Entry
        </AddEntryButton>
        </div>
    );
  };

  if (loading && allFacilities.length === 0) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Data...</div>;

  return (
    <Container>
      <HeaderWrapper>
        <InnerContainer>
            <Breadcrumb>
                <span className="link" onClick={() => router.push('/data-collection')}>Data Collection</span>
                <span>/</span>
                <span className="active">Stationary Combustion</span>
            </Breadcrumb>
        </InnerContainer>
      </HeaderWrapper>

      <MainContent>
         <PageHeader>
             <TitleSection>
                 <div className="icon"><FireFilled /></div>
                 <div className="text">
                     <h1>Stationary Combustion Data</h1>
                     <p>Add emissions data for fuel combustion in stationary equipment</p>
                 </div>
             </TitleSection>
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
                             <p>{allCompletedFacilityIds.length} of {allFacilities.length} facilities completed</p>
                         </div>
                     </ProgressInfo>
                     <ProgressBarWrapper>
                         <div className="bar-bg">
                             <div 
                                className="bar-fill"
                                style={{ width: `${completionPercentage}%` }} 
                             />
                         </div>
                         <span>{completionPercentage}%</span>
                     </ProgressBarWrapper>
                 </ProgressHeader>
            </CardHeader>

            {groupedEntries.length > 0 && (
                <FacilityList>
                    {groupedEntries.map(group => {
                        const isExpanded = expandedFacilities.has(group.facilityId);
                        return (
                            <div key={group.facilityId}>
                                <FacilityRow onClick={() => toggleExpanded(group.facilityId)}>
                                    <RowContent>
                                        <button className="toggle">
                                            {isExpanded ? '▼' : '▶'}
                                        </button>
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
                                    <EditButton onClick={(e) => openModal(group.facilityId, e)}>
                                        <EditOutlined /> Edit
                                    </EditButton>
                                </FacilityRow>
                                {isExpanded && (
                                    <ExpandedContent>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '20%' }}>FUEL TYPE</th>
                                                    <th style={{ width: '15%' }}>AMOUNT</th>
                                                    <th style={{ width: '15%' }}>UNIT</th>
                                                    <th style={{ width: '30%' }}>EQUIPMENT</th>
                                                    <th style={{ width: '20%' }}>METHOD</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {group.entries.map((e: TableEntry) => (
                                                    <tr key={e.entryId}>
                                                        <td>{e.fuelType || e.fuel_type || e.item || '-'}</td>
                                                        <td className="mono">{Number(e.amount || e.total_amount || e.consumptionAmount || 0).toLocaleString()}</td>
                                                        <td>{e.unit || '-'}</td>
                                                        <td>{e.equipmentType || e.equipment || '-'}</td>
                                                        <td>{getMethodBadge(e.calculationMethod)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </ExpandedContent>
                                )}
                            </div>
                        )
                    })}
                </FacilityList>
            )}
         </Card>

         {selectedFacilityId ? (
             <Card>
                 <FormSection>
                     <SectionTitle>Add Data for Pending Facility</SectionTitle>
                     
                     <FormGroup>
                         <label>Select Facility</label>
                         <Select
                            style={{ width: '100%' }}
                            size="large"
                            value={selectedFacilityId}
                            onChange={setSelectedFacilityId}
                            options={allFacilities
                                .filter(f => !allCompletedFacilityIds.includes(f.id))
                                .map(f => ({ label: f.name, value: f.id }))
                            }
                         />
                     </FormGroup>

                     <FormGroup>
                         <label>Data Availability</label>
                         <ToggleGroup>
                            {['yes', 'not_available', 'not_applicable'].map(status => (
                                <ToggleButton
                                    key={status}
                                    active={dataAvailability === status}
                                    onClick={() => setDataAvailability(status)}
                                >
                                    {status === 'yes' ? 'Available' : status === 'not_available' ? 'Not Available' : 'Not Applicable'}
                                </ToggleButton>
                            ))}
                         </ToggleGroup>
                     </FormGroup>

                     {dataAvailability === 'yes' ? (
                         <>
                            <EntryForm
                                entries={formEntries}
                                setEntries={setFormEntries}
                                getNewEntry={() => ({ id: Date.now(), calculationMethod: 'activity' })}
                            />
                            <ButtonGroup>
                                <Button type="primary" size="large" onClick={handleSaveData} style={{ backgroundColor: '#10b981' }}>
                                    Save & Continue
                                </Button>
                            </ButtonGroup>
                         </>
                     ) : (
                         <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem' }}>
                            {dataAvailability === 'not_available' && (
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
                 <div className="icon"><CheckCircleFilled /></div>
                 <h3>All Facilities Completed!</h3>
                 <p>You have provided data for all facilities.</p>
             </EmptyState>
         )}
      </MainContent>

       <Modal
          title="Edit Facility Data"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={saveModalChanges}
          width={800}
       >
          <div style={{ padding: '1rem 0' }}>
              <EntryForm 
                entries={modalEntries} 
                setEntries={setModalEntries} 
                isModal={true} 
                getNewEntry={() => {
                   const facility = allFacilities.find(f => f.id === modalFacilityId);
                   return {
                       id: Date.now(),
                       calculationMethod: 'activity', 
                       entryId: `new-${Date.now()}`,
                       facilityId: modalFacilityId!,
                       facilityName: facility?.name || '',
                       location: facility?.city || ''
                   };
                }}
              />
          </div>
       </Modal>
    </Container>
  );
};

export default StationaryCombustion;
