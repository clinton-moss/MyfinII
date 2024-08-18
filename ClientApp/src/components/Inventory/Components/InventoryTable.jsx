import React, { useEffect, useState } from 'react'
import APISearchableDropdownComponent from '../../../General/Selection/APISearchableDropdownComponent'
import Inventory from '../../../libs/api/Inventory'
import InventoryCategoryComponent from './InventoryCategoryComponent'

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
                    <tr>
                        <td>{<BrandSearch />}</td>
                        <td>{<InventoryCategoryComponent />}</td>
                        <td><input /></td>
                        <td><input /></td>
                        <td><input /></td>
                    </tr>
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


const BrandSearch = () => {
    const [Brands, setBrands] = useState([])

    useEffect(() => {
        const load = async () => setBrands(await Inventory.ListBrands())
        load()
    }, [])
    return (<APISearchableDropdownComponent
        dataset={Brands}
        placeholder='Select a brand'
        onCreate={Inventory.CreateBrand}
        // onSelect={onSelect}
        options={{
            placeholder: 'Select a brand',
            dataset: {
                primaryKey: 'id',
                viewFields: [{ field: 'brandName' }],
                create: {
                    description: 'Add new brand',
                    createFields: [
                        {
                            field: 'brandName',
                            hr: 'Brand Name',
                            format: 'Text'
                        }
                    ]
                }
            }
        }}
    />)
}