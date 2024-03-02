import React, { useEffect, useState } from 'react'
import Inventory from '../../../libs/api/Inventory'

export default function InventoryTable() {
    const [inventory, setInventory] = useState([])

    useEffect(() => { _load() }, [])

    const _load = () => {
        Inventory
            .ListInventory()
            .then((r) => setInventory(r))
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Qty</th>
                </thead>
                <tbody>
                    {inventory.map((r) => <tr>
                        <td>{r.brand ? r.brand.brandName : 'Unkown'}</td>
                        <td>{r.category ? r.category.categoryName : 'Unkown'}</td>
                        <td>{r.sku}</td>
                        <td>{r.name}</td>
                        <td>{r.unitCount}{r.unit}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
