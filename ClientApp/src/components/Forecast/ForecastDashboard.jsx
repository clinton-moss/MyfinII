import React from 'react'
import DashboardFilters from './Components/Filters/DashboardFilters'
import AccountGraph from './Components/Graphs/AccountGraph'

export default function ForecastDashboard() {
  return (
    <div>
      <h1>Forecast</h1>
      <DashboardFilters />
      <AccountGraph />
    </div>
  )
}
