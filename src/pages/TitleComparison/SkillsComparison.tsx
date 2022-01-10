import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, List, ListItem, ListItemText } from "@mui/material";
import { SkillLevel } from "../../core/skills/SkillLevel";
import { Skills, Title } from "../../core/titles/Title";

interface props {
  titleSelected?: Title;
  titleComparison?: Title;
}

const isSkillLevel = (o: any): o is SkillLevel => Array.isArray(o.skills) && o.category;

const tableHeaders = (skills: Skills): string[] => Object.values(skills)
  .filter(isSkillLevel)
  .map(s => s.category!.title);

const tableRowContent = (skills: Skills): readonly SkillLevel[] => Object.values(skills)
  .filter(isSkillLevel);

const tableCell = (skill: SkillLevel) => <TableCell style={{ verticalAlign: "top" }}>
  <List dense disablePadding>
    {skill.skills.map((s, i) => <ListItem key={i} dense disablePadding alignItems="flex-start">
      <ListItemText primary={`- ${s}`} primaryTypographyProps={{ variant: "caption" }} />
    </ListItem>)}
  </List>
</TableCell>;

const tableRow = (title: Title) => <TableRow key={title.title}>
  {tableRowContent(title.skills).map(tableCell)}
</TableRow>;

export const SkillsComparison = ({ titleSelected, titleComparison }: props) => {
  if (!titleSelected) return null;

  return <TableContainer component={Paper}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {tableHeaders(titleSelected.skills).map(h => <TableCell align="center">{h}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableRow(titleSelected)}
        {titleComparison && tableRow(titleComparison)}
      </TableBody>
    </Table>
  </TableContainer>;
}

export default SkillsComparison;