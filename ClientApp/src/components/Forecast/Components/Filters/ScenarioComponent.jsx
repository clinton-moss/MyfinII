import React from 'react'

export default function ScenarioComponent() {
    return (
        <div>
            <div className='p-2'>
                <b>Create A New Scenario</b>
                <div className='d-flex'><input className='form-control' placeholder='Scenario Name' /><button className='btn'>Create</button></div>
                <div>
                    <b>Scenario Cases</b>
                    <ul className='list-unstyled'>
                        <li><div>
                            <input className='form-control' placeholder='Item Name' />
                            <input className='form-control' placeholder='Cost' />
                        </div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
