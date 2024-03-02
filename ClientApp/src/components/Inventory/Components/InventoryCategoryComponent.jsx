import React, { useEffect, useState } from 'react'
import APISearchableDropdownComponent from '../../../General/Selection/APISearchableDropdownComponent'
import Inventory from '../../../libs/api/Inventory'

export default function InventoryCategoryComponent({ onSelect }) {
    const [categories, setCategories] = useState([])

    useEffect(() => { _loadCategories() }, [])

    const _loadCategories = () => {
        Inventory
            .ListInventoryCategories()
            .then((r) => setCategories(r))
    }
    return (
        <div>
            <APISearchableDropdownComponent
                multi={false}
                placeholder={'Category'}
                onCreate={Inventory.CreateInventoryCategory}
                onSelect={onSelect}
                dataset={categories} options={{
                    dataset: {
                        primaryKey: 'id',
                        viewFields: [
                            // {
                            //     field: 'id',
                            //     hr: 'Brand Name',
                            //     format: 'Text'
                            // },
                            {
                                field: 'categoryName',
                                hr: 'Category',
                                format: 'Text'
                            }
                        ],
                        searchFields: [
                            {
                                field: 'categoryName',
                                hr: 'Category',
                                format: 'Text'
                            }
                        ],
                        create: {
                            description: 'Add New',
                            createFields: [
                                {
                                    field: 'categoryName',
                                    hr: 'Category',
                                    format: 'Text'
                                }
                            ]
                        }
                    }
                }} />
        </div>
    )
}
