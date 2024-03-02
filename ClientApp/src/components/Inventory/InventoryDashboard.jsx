import React from 'react'
import InventoryItemComponent from './Components/InventoryItemComponent'

export default function InventoryDashboard() {
  return (
    <div>
      InventoryDashboard
      <div className='shadow p-2 rounded'>
        <h2>Add A New Inventory Item</h2>
        <InventoryItemComponent />
      </div>
    </div>
  )
}
