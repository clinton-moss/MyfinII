import { useState } from "react";
import DragAndDropStatement from "./DragAndDropStatement";
import DragAndDropStatementhtml from "./DragAndDropStatementhtml";

export default function DragAndDropStatementModal({ _handleDropComplete, droped, dropedHTML }) {
    const [tab, setTab] = useState()
    return (<div>
        <div className="d-flex text-dark">
            <button className="w-100 text-center" onClick={() => setTab()}>Text</button>
            <button className="w-100 text-center" onClick={() => setTab('html')}>HTML</button>
        </div>
        <div>
            {tab !== 'html' && <DragAndDropStatement droped={droped} onDone={_handleDropComplete} />}
            {tab === 'html' && <DragAndDropStatementhtml droped={dropedHTML} onDone={_handleDropComplete} />}
        </div>
    </div>);

}
