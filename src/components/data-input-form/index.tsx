"use client"

import DataInputHeader from "../data-input-header"
import FacilityCard from "../facility-card"
import { Content, MainCard, BrowserBar, BrowserDots, Dot, UrlBar, FormContent } from "./styles"

interface DataInputFormProps {
  scope: string;
}

const DataInputForm = ({ scope }: DataInputFormProps) => {
  return (
    <Content>
      <MainCard>
        <FormContent>
          <DataInputHeader scope={scope} />
          <FacilityCard scope={scope} />
        </FormContent>
      </MainCard>
    </Content>
  )
}

export default DataInputForm
