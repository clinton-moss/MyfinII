import React, { useState } from 'react'
import Inventory from '../../../libs/api/Inventory'
import BrandComponent from './BrandComponent'
import InventoryCategoryComponent from './InventoryCategoryComponent'

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
                <b>Category</b>
                <InventoryCategoryComponent onSelect={(b) => setItem({ ...item, Category: b[0] })} />
            </div>
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
                <b>Unit Count</b>
                <div className='d-flex'>
                    <div className='flex-grow-1'><input type='number' className='form-control' placeholder='Units' /></div>
                    <div className='flex-shrink-1'><select className='form-control flex-shrink-1'>
                        <option>GRAMS</option>
                        <option>MILLILITRES</option>
                        <option>ITEM</option>
                    </select></div>

                </div>
            </div>
            <div>
                <button onClick={() => _handleSave()} className='btn'>Save</button>
            </div>
        </div>
    )
}
