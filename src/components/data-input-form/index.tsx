"use client"

import DataInputHeader from "../data-input-header"
import FacilityCard from "../facility-card"
import { Content, MainCard, BrowserBar, BrowserDots, Dot, UrlBar, FormContent } from "./styles"

const DataInputForm = () => {
  return (
    <Content>
      <MainCard>
        <BrowserBar>
          <BrowserDots>
            <Dot color="red" />
            <Dot color="yellow" />
            <Dot color="green" />
          </BrowserDots>
          <UrlBar>app.emterra.com/scope-1/stationary-combustion</UrlBar>
        </BrowserBar>

        <FormContent>
          <DataInputHeader />
          <FacilityCard />
        </FormContent>
      </MainCard>
    </Content>
  )
}

export default DataInputForm
