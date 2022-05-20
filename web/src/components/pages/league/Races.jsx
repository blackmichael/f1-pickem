import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import LinkButton from "components/common/LinkButton";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "components/common/StyledTable";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "store/actions/racesActions";

export default function Races(props) {
  const dispatch = useDispatch();
  const racesState = useSelector((state) => state.races);
  const { loading, error, racesBySeason } = racesState;
  let races = (racesBySeason[props.season] || []);

  useEffect(() => {
    if (!racesBySeason[props.season] && props.season !== undefined) {
      dispatch(getRaces(props.season));
    }
  }, [dispatch, props.season]);

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Race</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {races
              .sort((a, b) => a.race_date.localeCompare(b.race_date))
              .map((race) => (
                <StyledTableRow key={race.id}>
                  <StyledTableCell>{race.race_name}</StyledTableCell>
                  <StyledTableCell>{race.race_date}</StyledTableCell>
                  <StyledTableCell>
                    <LinkButton
                      text="View"
                      to={"/leagues/" + props.leagueId + "/races/" + race.id}
                      variant="contained"
                      color="primary"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Grid>
  );
}
