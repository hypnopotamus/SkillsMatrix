import { useSelector } from "react-redux";
import { InputLabel, MenuItem, Select } from "@mui/material";

import { State } from "./reduxStore";
import { useState } from "react";
import { NavigationMenu } from "./NavigationMenu";

export const pageElementProperty = "elementid";

export const CurrentPage = () => {
    const pageElementId = "the-page";
    const page = useSelector<State, string | undefined>(s => s.pages.find(p => p.selected)?.elementname);

    const [track, setTrack] = useState('');

    console.log('Current Page, page = ', page);

    const handleChange = (value: string): void => {
        setTrack(value);
        console.log('track selected: ', value);
        console.log('track = ', track);
    };

    // TODO: move from hard-coded tracks to dynamically created ones
    return (
        <>
            <InputLabel id="track-select-label">Select Track</InputLabel>
            <Select
                labelId="track-select-label"
                id="track-select"
                value={track}
                label="track"
                onChange={(e) => handleChange(e.target.value)}
            >
                <MenuItem value="Tech">Technical</MenuItem>
                <MenuItem value="Project">Project</MenuItem>
                <MenuItem value="Creative">Creative</MenuItem>
            </Select>
            {page ?
                <>
                    <NavigationMenu />
                    <div id={pageElementId} dangerouslySetInnerHTML={{ __html: `<${page} ${pageElementProperty}='${pageElementId}'/>` }} />
                </>
                :
                <div id={pageElementId}></div>
            }
        </>

    );
};
