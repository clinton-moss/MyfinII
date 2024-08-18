import React from 'react'
import DashboardFilters from './Components/Filters/DashboardFilters'
import AccountGraph from './Components/Graphs/AccountGraph'

export default function ForecastDashboard() {
  return (
    <div>
      <h1>Forecast</h1>
      <iframe src="http://192.168.0.106:5601/app/dashboards?auth_provider_hint=anonymous1#/view/01468f30-5d46-11ef-8971-ef853c4f7805?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-query-input=true&show-time-filter=true" height="800" width="100%"></iframe>
      <DashboardFilters />
      <AccountGraph />
    </div>
  )
}
