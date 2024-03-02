import React from 'react'
import InventoryItemComponent from './Components/InventoryItemComponent'
import InventoryTable from './Components/InventoryTable'

export default function InventoryDashboard() {
  return (
    <div>
      InventoryDashboard
      <div className='shadow p-2 rounded'>
        <h2 className=' text-center'>Add A New Inventory Item</h2>
        <InventoryItemComponent />
      </div>
      <InventoryTable />
    </div>
  )
}
