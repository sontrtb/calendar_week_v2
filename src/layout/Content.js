import SelectDay from "../component/SelectDay";
import ListItem from "../component/ListItem";
import { useState } from 'react';

function Content() {

    const d = new Date();
    const dayNow = d.getDay();

    const [daySelect, setDaySelect] = useState(dayNow);

    return (
        <div>
            <SelectDay
                daySelect={daySelect}
                setDaySelect={setDaySelect}
            />
            <ListItem
                daySelect={daySelect}
            />
        </div>
    )
}

export default Content;