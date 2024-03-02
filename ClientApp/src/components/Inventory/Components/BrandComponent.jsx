import React, { useEffect, useState } from 'react'
import APISearchableDropdownComponent from '../../../General/Selection/APISearchableDropdownComponent'
import Inventory from '../../../libs/api/Inventory'

export default function BrandComponent({ onSelect }) {
    const [brands, setBrands] = useState([])

    useEffect(() => { _loadBrands() }, [])

    const _loadBrands = () => {
        Inventory
            .ListBrands()
            .then((r) => setBrands(r))
    }
    return (
        <div>
            <APISearchableDropdownComponent
                multi={false}
                placeholder={'Brands'}
                onCreate={Inventory.CreateBrand}
                onSelect={onSelect}
                dataset={brands} options={{
                    dataset: {
                        primaryKey: 'id',
                        viewFields: [
                            // {
                            //     field: 'id',
                            //     hr: 'Brand Name',
                            //     format: 'Text'
                            // },
                            {
                                field: 'brandName',
                                hr: 'Brand Name',
                                format: 'Text'
                            }
                        ],
                        searchFields: [
                            {
                                field: 'brandName',
                                hr: 'Brand Name',
                                format: 'Text'
                            }
                        ],
                        create: {
                            description: 'Add New',
                            createFields: [
                                {
                                    field: 'brandName',
                                    hr: 'Brand Name',
                                    format: 'Text'
                                }
                            ]
                        }
                    }
                }} />
        </div>
    )
}
