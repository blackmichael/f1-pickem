import React, { useEffect } from "react";
import {
  FormControl,
  Grid,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "components/common/StyledTable";
import { getRaceScores } from "store/actions/raceScoresActions";
import { useDispatch, useSelector } from "react-redux";
import { Loadable } from "components/common/Loadable";
import { Subtitle } from "components/common/Subtitle";

export default function Results(props) {
  const dispatch = useDispatch();
  const raceScoresState = useSelector((state) => state.raceScores);
  const { loading, error, raceScoresMap } = raceScoresState;
  const raceScores = raceScoresMap.get(props.raceId, { user_scores: [] });

  useEffect(() => {
    // todo - only fetch if data doesn't exist, but only after we track race scores per league
    dispatch(getRaceScores(props.leagueId, props.raceId));
  }, [dispatch]);

  return (
    <Grid item xs={12}>
      <Loadable loading={loading} error={error}>
        { raceScores.pending_results ? (
          <Subtitle variant="caption">Check back later for race results.</Subtitle>
        ) : null}
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Points</StyledTableCell>
                <StyledTableCell>Correct Picks</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(raceScores.user_scores || [])
                .sort((a, b) => a.total_score < b.total_score)
                .map((score, place) => {
                  let displayName = score.user_name;
                  if (displayName === undefined) {
                    displayName = "n/a";
                  }

                  if (raceScores.pending_results) {
                    return (
                      <StyledTableRow key={score.user_id}>
                        <StyledTableCell>{place + 1}. {displayName}</StyledTableCell>
                        <StyledTableCell> - </StyledTableCell>
                        <StyledTableCell> - </StyledTableCell>
                      </StyledTableRow>
                    )
                  } else {
                    let correctPicks = score.breakdown.filter(breakdown => breakdown.points == 25);

                    return (
                      <StyledTableRow key={score.user_id}>
                        <StyledTableCell>{place + 1}. {displayName}</StyledTableCell>
                        <StyledTableCell>{score.total_score}</StyledTableCell>
                        <StyledTableCell>{correctPicks.length}</StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                })}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Loadable>
    </Grid>
  );
}
