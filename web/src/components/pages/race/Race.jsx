import React, { useEffect, useState } from 'react';
import { Page, Subtitle } from 'components/common/Page'
import { Box, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs, TextField, Typography, withStyles } from '@material-ui/core';
import { getLeague } from 'store/defaultStore';
import Results from 'components/pages/race/Results';
import Picks from 'components/pages/race/Picks';
import { AntTab, AntTabs, TabPanel } from 'components/common/Tabs';
import { getRace, getPicks, getLeagueSummary } from 'store/defaultStore';

export default function Race(props) {
    const [raceData, setRaceData] = useState({})
    useEffect(() => {
        setRaceData(getRace(props.match.params.raceId));
    })

    const [leagueInfo, setLeagueInfo] = useState({})
    useEffect(() => {
        setLeagueInfo(getLeagueSummary(props.match.params.leagueId));
    })
    
    const [racePicks, setRacePicks] = useState({})
    useEffect(() => {
        setRacePicks(getPicks(props.match.params.leagueId, props.match.params.raceId));
    })

    const [tab, setTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const getMembers = () => (racePicks.all_picks || []).map((pick) => pick.name);

    const [members, _] = useState(getMembers());

    return (
        <Page>
            <Grid item xs={12}>
                <Typography variant="h3">
                    {raceData.name}
                </Typography>
                <Subtitle>
                    {leagueInfo.name} - {leagueInfo.season} Season
                </Subtitle>
            </Grid>
            <Grid item xs={12}>
                <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
                    <AntTab label="Picks" />
                    <AntTab label="Results" />
                </AntTabs>
                <TabPanel value={tab} index={0}>
                    <Picks default={members[0]} allPicks={racePicks.all_picks} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Results />
                </TabPanel>
            </Grid>
        </Page>
    )
}

