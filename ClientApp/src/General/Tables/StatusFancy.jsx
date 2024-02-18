import React from 'react'
import { Check2, ExclamationCircle, ExclamationTriangle, InfoCircle, QuestionCircle } from 'react-bootstrap-icons'

export default function StatusFancy({ status }) {
    const _dict = [
        {
            type: 'Critical',
            variations: ['Critical', 'CRITICAL_ERROR', 'Danger', 'Alert', 'SENDING_FAILED', 'SENDING FAILED','Failed']
        }, {
            type: 'Warning',
            variations: ['Warning']
        }, {
            type: 'Success',
            variations: ['Success', 'true', 'Ok', 'Complete']
        }, {
            type: 'Info',
            variations: ['Info']
        }
    ]

    const _trnslate = (status) => {
        if (!status) return 'Unkown'
        for (const _d of _dict)
            for (const _v of _d.variations)
                if (_v.toLowerCase() === status.trim().toLowerCase())
                    return _d.type

    }

    const _lookup = (status) => {
        var icon = []
        var textColor = '';
        // var status = []
        switch (_trnslate(status)) {
            case 'Critical':
                icon = <ExclamationCircle />; textColor = 'text-danger'; break;
            case 'Warning':
                icon = <ExclamationTriangle />; textColor = 'text-warning'; break;
            case 'Success':
                icon = <Check2 />; textColor = 'text-success'; break;
            case 'Info':
                icon = <InfoCircle />; textColor = 'text-info'; break;
            default:
                icon = <QuestionCircle />; textColor = 'text-secondary'; break;
        }
        return <div className={textColor.concat(' text-center')}><div>{icon}</div> <small>{status}</small></div>
    }

    return (
        <div>
            {_lookup(status)}
        </div>
    )
}
