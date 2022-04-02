import React, { Fragment, useEffect, useState } from "react";
import { Page, Subtitle } from "components/common/Page";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Tab,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { getLeague, getUserById } from "store/defaultStore";
import Scoreboard from "components/pages/league/Scoreboard";
import Races from "components/pages/league/Races";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { getRace, getPicks, getLeagueSummary } from "store/defaultStore";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "components/common/StyledTable";
import { getRaceScores } from "store/actions/raceScoresActions";
import { useDispatch, useSelector } from "react-redux";

export default function Results(props) {
  const dispatch = useDispatch();
  const raceScoresState = useSelector((state) => state.raceScores);
  const { loading, error, raceScoresMap } = raceScoresState;
  const raceScores = raceScoresMap.get(props.raceId, { user_scores: [] });

  useEffect(() => {
    dispatch(getRaceScores(props.leagueId, props.raceId));
  }, [dispatch]);

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Place</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(raceScores.user_scores || [])
              .sort((a, b) => a.total_score < b.total_score)
              .map((score, place) => {
                let user = getUserById(score.user_id);
                let displayName = "";
                if (user === undefined) {
                  displayName = "n/a";
                } else {
                  displayName = user.display_name;
                }
                return (
                  <StyledTableRow key={score.user_id}>
                    <StyledTableCell>{place + 1}</StyledTableCell>
                    <StyledTableCell>{displayName}</StyledTableCell>
                    <StyledTableCell>{score.total_score}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Grid>
  );
}
