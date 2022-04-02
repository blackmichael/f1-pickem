import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "components/common/StyledTable";
import React from "react";

export default function Scoreboard(props) {
  const scores = props.data || [];

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell size="small">Place</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores
              .sort((a, b) => a.score < b.score)
              .map((score, idx) => (
                <StyledTableRow key={score.name + idx}>
                  <StyledTableCell>{idx + 1}.</StyledTableCell>
                  <StyledTableCell>{score.name}</StyledTableCell>
                  <StyledTableCell>{score.score}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Grid>
  );
}
