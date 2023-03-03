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
import Results from "components/pages/race/Results";
import Picks from "components/pages/race/Picks";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getLeagueDetails, getLeagues } from "store/actions/leaguesActions";
import { getRaces } from "store/actions/racesActions";
import { getRaceScores } from "store/actions/raceScoresActions";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { Link, useMatch } from "react-router-dom";
import { getLeaguesResource } from "utils/resources";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Race(props) {
  const dispatch = useDispatch();
  const match = useMatch("/leagues/:leagueId/races/:raceId");
  const leagueId = match.params.leagueId;
  const raceId = match.params.raceId;

  const { user } = useAuthenticator((context) => [context.user]);
  const userId = user?.username;

  const leaguesState = useSelector((state) => state.leagues);
  const { leagueLoading, leagueError, leaguesMap } = leaguesState;
  const leagueDetails = leaguesMap.get(leagueId, {});

  useEffect(() => {
    // only fetch league details if it's not available
    if (Object.keys(leagueDetails).length === 0) {
      dispatch(getLeagueDetails(leagueId, userId));
    }
  }, [dispatch, leagueId, userId]);

  const racesState = useSelector((state) => state.races);
  const { racesLoading, racesError, raceById } = racesState;
  const raceData = raceById[raceId] || {};

  useEffect(() => {
    if (!raceById[raceId] && leagueDetails.season !== undefined) {
      dispatch(getRaces(leagueDetails.season));
    }
  }, [dispatch, leagueDetails.season]);

  const raceScoresState = useSelector((state) => state.raceScores);
  const { raceScoresLoading, raceScoresError, raceScoresMap } = raceScoresState;
  const raceScores = raceScoresMap.get(raceId, { user_scores: [] });

  useEffect(() => {
    dispatch(getRaceScores(leagueId, raceId));
  }, [dispatch, leagueId, raceId]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Page>
      <Loadable loading={leagueLoading || racesLoading} error={leagueError || racesError}>
        <Grid item xs={12}>
          <Typography variant="h4">{raceData.race_name}</Typography>
          <SubtitleNavLink
            to={getLeaguesResource(leagueId)}
            leagueName={leagueDetails.name}
            leagueSeason={leagueDetails.season}/>
        </Grid>
        <Grid item xs={12}>
          <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
            <AntTab label="Picks" />
            <AntTab label="Results" />
          </AntTabs>
          <TabPanel value={tab} index={0}>
            <Picks
              leagueId={leagueId}
              raceId={raceId}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Loadable loading={raceScoresLoading} error={raceScoresError}>
              <Results
                leagueId={leagueId}
                raceId={raceId}
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
