import React, { Component } from 'react';

export class Drop extends Component {
  static displayName = Drop.name;
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      total: 0
    }
  }
  _filter(f) {
    var separateLines = f.split(/\r?\n|\r|\n/g);
    var _entries = []
    this.state.total = 0
    for (const entry of separateLines) {
      const l = entry.split(/[\t,]+/);
      _entries.push({
        Date: l[0],
        Description: l[1],
        Debits: l[2],
      })
      if (!isNaN(parseInt(l[2])))
        this.state.total += parseInt(l[2])
    }
    this.setState({
      entries: _entries
    })
  }

  render() {
    return (
      <div>
        <textarea onChange={(e) => this._filter(e.target.value)} className='form-control'>

        </textarea>
        <div>TOTAL: {this.state.total}</div>
        {
          this.state.entries.map((e) => {
            return <div>
              DATE: {e.Date}
              DESCR: {e.Description}
              AMNT: {e.Debits}

            </div>
          })
        }
      </div>
    );
  }
}
