"use client"

import DataInputHeader from "../data-input-header"
import FacilityCard from "../facility-card"
import { Content, MainCard, BrowserBar, BrowserDots, Dot, UrlBar, FormContent } from "./styles"

const DataInputForm = () => {
  return (
    <Content>
      <MainCard>
        <FormContent>
          <DataInputHeader />
          <FacilityCard />
        </FormContent>
      </MainCard>
    </Content>
  )
}

export default DataInputForm
