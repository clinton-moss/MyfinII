import React from 'react'
import GraphAPI from '../../../../General/Graph/GraphAPI'


export default function AccountGraph() {
    return (
        <div>
            <GraphAPI URL={'api/Account/Ledger/Graph/Account'} Type={'Line'} />
            {/* <Line options={options} data={data} />; */}
        </div>
    )
}
