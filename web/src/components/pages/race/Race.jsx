import React, { useEffect, useState } from "react";
import { Page } from "components/common/Page";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { getLeague, getRaceById } from "store/defaultStore";
import Results from "components/pages/race/Results";
import Picks from "components/pages/race/Picks";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { getRace, getPicks, getLeagueSummary } from "store/defaultStore";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "store/actions/leaguesActions";
import { getRaces } from "store/actions/racesActions";
import { getRaceScores } from "store/actions/raceScoresActions";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { Link, useMatch } from "react-router-dom";
import { getLeaguesResource } from "utils/resources";

export default function Race(props) {
  const dispatch = useDispatch();
  const match = useMatch("/leagues/:leagueId/races/:raceId");

  const leaguesState = useSelector((state) => state.leagues);
  const { leagueLoading, leagueError, leaguesMap } = leaguesState;
  const leagueInfo = leaguesMap.get(match.params.leagueId, {});

  useEffect(() => {
    // only fetch leagues info if it's not available
    if (leaguesMap.size == 0) {
      dispatch(getLeagues());
    }
  }, [dispatch]);

  const racesState = useSelector((state) => state.races);
  const { racesLoading, racesError, raceById } = racesState;
  const raceData = raceById[match.params.raceId] || {};

  useEffect(() => {
    if (leagueInfo.season !== undefined) {
      dispatch(getRaces(leagueInfo.season))
    }
  }, [dispatch, leagueInfo.season]);

  const raceScoresState = useSelector((state) => state.raceScores);
  const { raceScoresLoading, raceScoresError, raceScoresMap } = raceScoresState;
  const raceScores = raceScoresMap.get(props.raceId, { user_scores: [] });

  useEffect(() => {
    dispatch(getRaceScores(match.params.leagueId, match.params.raceId));
  }, [dispatch]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  console.log("race!")
  console.log(leagueInfo);

  return (
    <Page>
      <Loadable loading={leagueLoading || racesLoading} error={leagueError || racesError}>
        <Grid item xs={12}>
          <Typography variant="h4">{raceData.race_name}</Typography>
          <SubtitleNavLink
            to={getLeaguesResource(match.params.leagueId)}
            leagueName={leagueInfo.name}
            leagueSeason={leagueInfo.season}/>
        </Grid>
        <Grid item xs={12}>
          <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
            <AntTab label="Picks" />
            <AntTab label="Results" />
          </AntTabs>
          <TabPanel value={tab} index={0}>
            <Picks
              leagueId={match.params.leagueId}
              raceId={match.params.raceId}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Loadable loading={raceScoresLoading} error={raceScoresError}>
              <Results
                leagueId={match.params.leagueId}
                raceId={match.params.raceId}
              />
            </Loadable>
          </TabPanel>
        </Grid>
      </Loadable>
    </Page>
  );
}

function SubtitleNavLink(props) {
  const { to, leagueName, leagueSeason } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Button component={renderLink}>
      <Subtitle>
        {leagueName} - {leagueSeason} Season
      </Subtitle>
    </Button>
  );
}
