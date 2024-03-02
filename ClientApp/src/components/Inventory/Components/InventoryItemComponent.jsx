import React, { useState } from 'react'
import Inventory from '../../../libs/api/Inventory'
import BrandComponent from './BrandComponent'

export default function InventoryItemComponent() {
    const [item, setItem] = useState({
        id: undefined,
        brand: {
            id: 'D5ED8465-2DD2-447E-8AA7-55235E728D79',
            brandName: 'Test'
        },
        category: {
            id: undefined,
            categoryName: ''
        },
        sku: '',
        name: '',
        unit: 'MILLILITRES', // millilitres | grams
        unitCount: 0
    })

    const _handleSave = () => {
        Inventory
            .CreateInventoryItem(item)
            .then((r) => { setItem(r) })
    }
    return (
        <div>
            <div>
                <b>Brand</b>
                <BrandComponent onSelect={(b) => setItem({ ...item, Brand: b[0] })} />
            </div>
            <div>
                <b>SKU</b>
                <input className='form-control' placeholder='SKU' />
            </div>
            <div>
                <b>Name</b>
                <input className='form-control' placeholder='Name' />
            </div>
            <div>
                <b>Unit</b>
                <input className='form-control' placeholder='Name' />
            </div>
            <div>
                <b>Unit Count</b>
                <input className='form-control' placeholder='Name' />
            </div>
            <div>
                <button onClick={() => _handleSave()} className='btn'>Save</button>
            </div>
        </div>
    )
}
