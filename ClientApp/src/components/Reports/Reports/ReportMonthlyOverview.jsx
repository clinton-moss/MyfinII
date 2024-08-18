import React from 'react'
import GraphAPI from '../../../General/Graph/GraphAPI'

export default function ReportMonthlyOverview() {
    return (
        <div>
            <GraphAPI URL={`api/Account/Ledger/Graph/OverView/Monthly`} Type={'Line'} />
        </div>
    )
}
