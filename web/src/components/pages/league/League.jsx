import React, { useEffect, useState } from "react";
import { Page } from "components/common/Page";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import Scoreboard from "components/pages/league/Scoreboard";
import Races from "components/pages/league/Races";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "store/actions/leaguesActions";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { getRaces } from "store/actions/racesActions";
import { useMatch, useResolvedPath } from "react-router-dom";

export default function League(props) {
  const dispatch = useDispatch();
  const match = useMatch("/leagues/:id");

  const leaguesState = useSelector((state) => state.leagues);
  const { leaguesLoading, leaguesError, leaguesMap } = leaguesState;
  const leagueInfo = leaguesMap.get(match.params.id, {});
  useEffect(() => {
    // only fetch leagues info if it's not available
    if (leaguesMap.size == 0) {
      dispatch(getLeagues());
    }
  }, [dispatch]);

  const racesState = useSelector((state) => state.races);
  const { racesLoading, racesError, racesBySeason } = racesState;
  let races = (racesBySeason[leagueInfo.season] || []);

  useEffect(() => {
    if (!racesBySeason[leagueInfo.season] && leagueInfo.season !== undefined) {
      dispatch(getRaces(leagueInfo.season));
    }
  }, [dispatch, leagueInfo.season]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Page>
      <Loadable loading={leaguesLoading} error={leaguesError}>
        <Grid item xs={12}>
          <Typography variant="h4">{leagueInfo.name}</Typography>
          <Subtitle>{leagueInfo.season} Season</Subtitle>
        </Grid>
        <Grid item xs={12}>
          <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
            <AntTab label="Races" />
            <AntTab label="Scoreboard" />
          </AntTabs>
          <TabPanel value={tab} index={0}>
            <Loadable loading={racesLoading} error={racesError}>
              <Races races={races} leagueId={leagueInfo.id}/>
            </Loadable>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Scoreboard data={leagueInfo.scores} />
          </TabPanel>
        </Grid>
      </Loadable>
    </Page>
  );
}
