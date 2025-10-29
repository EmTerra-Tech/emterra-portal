"use client"

import { useState } from "react"
import SpendEntry from "../spend-entry"
import { DataSection, AddEntrySection, AddEntryBtn } from "./styles"

interface SpendEntryData {
  id: number
  supplier: string
  amount: string
  currency: string
  category: string
  description: string
}

const SpendDataSection = () => {
  const [entries, setEntries] = useState<SpendEntryData[]>([
    {
      id: 1,
      supplier: "",
      amount: "",
      currency: "USD ($)",
      category: "",
      description: "",
    },
  ])

  const addEntry = () => {
    const newId = Math.max(...entries.map((e) => e.id)) + 1
    setEntries([
      ...entries,
      {
        id: newId,
        supplier: "",
        amount: "",
        currency: "USD ($)",
        category: "",
        description: "",
      },
    ])
  }

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id))
    } else {
      alert("At least one entry is required.")
    }
  }

  const updateEntry = (id: number, field: keyof SpendEntryData, value: string) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))
  }

  return (
    <DataSection>
      {entries.map((entry, index) => (
        <SpendEntry
          key={entry.id}
          entry={entry}
          entryNumber={index + 1}
          onRemove={() => removeEntry(entry.id)}
          onUpdate={(field, value) => updateEntry(entry.id, field, value)}
        />
      ))}

      <AddEntrySection>
        <AddEntryBtn onClick={addEntry}>
          <span>+</span> Add Another Entry
        </AddEntryBtn>
      </AddEntrySection>
    </DataSection>
  )
}

export default SpendDataSection
