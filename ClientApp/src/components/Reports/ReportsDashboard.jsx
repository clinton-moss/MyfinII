import React, { useState } from 'react'
import ReportMonthlyOverview from './Reports/ReportMonthlyOverview'

const REPORT_TYPE = [
    {
        name: 'Monthly Overview',
        location: 'Reports/Overview/Monthly',
        component: <ReportMonthlyOverview />
    }
]

export default function ReportsDashboard() {
    const [report, setReport] = useState()

    return (
        <>
            {
                report ?
                    <div>
                        <h1>{report.name}</h1>
                        {report.component}
                    </div>
                    :
                    <div>
                        {REPORT_TYPE.map((r) => <div
                            onClick={() => setReport(r)}
                            className='card'>
                            <div className='card-heading'>{r.name}</div>
                        </div>)}
                    </div>
            }
        </>
    )
}
