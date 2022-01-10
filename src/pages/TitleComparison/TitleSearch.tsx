import { Autocomplete, TextField } from "@mui/material";

interface props {
    readonly title?: string;
    readonly titles: readonly string[];
    readonly titleSelected: (title: string) => void;
}
export const TitleSearch = ({ title, titles, titleSelected }: props) => <Autocomplete
    value={title ?? null}
    options={titles}
    onChange={(_, selected) => selected && titleSelected(selected)}
    renderInput={(params) =>
        <TextField {...params} label={"title"} />
    }
/>;

export default TitleSearch;