import React from 'react'
import AccountsFilter from './AccountsFilter'
import ScenarioComponent from './ScenarioComponent'

export default function DashboardFilters() {
  return (
    <div className='shadow'>
      <AccountsFilter />
      <ScenarioComponent />
    </div>
  )
}
