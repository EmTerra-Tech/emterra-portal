"use client"

import { Header, Title, Description, YearSelect } from "./styles"

const DataInputHeader = () => {
  return (
    <Header>
      <div>
        <Title>
          <span>🔥</span> Stationary Combustion Data
        </Title>
        <Description>Add emissions data for fuel combustion in stationary equipment</Description>
      </div>
      <YearSelect>
        <option>2024</option>
        <option>2023</option>
        <option>2022</option>
      </YearSelect>
    </Header>
  )
}

export default DataInputHeader
