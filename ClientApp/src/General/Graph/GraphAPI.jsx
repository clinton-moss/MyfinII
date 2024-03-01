import React, { useEffect, useState } from 'react';
import API from '../../libs/api/API';
import GraphLineAPI from './Type/GraphLineAPI';

export default function GraphAPI({ URL, Type }) {
    const [GraphJSData, setGraphJSData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { _load() }, [])

    const _load = async () => {
        setLoading(true)
        await API.process(URL,
            'GET',
            null
        ).catch((err) => {
            setLoading(false)
            throw err
        }).then((r) => { setGraphJSData(r); setLoading(false) })
    }
    if (loading) return <div>Loading</div>
    switch (Type) {
        case 'Line':
        default:
            return <GraphLineAPI data={GraphJSData} />
    }
}
