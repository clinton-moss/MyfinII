import React from 'react'

export default function StatusFilter({ statuses, onFilter }) {
  return (
    <select onChange={(e) => onFilter(e.target.value)} className='form-control form-control-sm'>
      <option></option>
      {
        statuses ?
          statuses.map((s) =>
            <option key={s}>{s}</option>
          )
          :
          <></>
      }
    </select>
  )
}
