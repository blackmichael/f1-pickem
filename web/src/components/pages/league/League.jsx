import React, { useEffect, useState } from 'react';
import { Page, Subtitle } from 'components/common/Page'
import { Box, Grid, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import { getLeague } from 'store/defaultStore';
import Scoreboard from 'components/pages/league/Scoreboard';
import Races from 'components/pages/league/Races';
import { AntTab, AntTabs, TabPanel } from 'components/common/Tabs';

export default function League(props) {

    const [leagueInfo, setLeagueInfo] = useState({})

    useEffect(() => {
        setLeagueInfo(getLeague(props.match.params.id));
    })

    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Page>
            <Grid item xs={12}>
                <Typography variant="h3">
                    {leagueInfo.name}
                </Typography>
                <Subtitle>
                    {leagueInfo.season} Season
                </Subtitle>
            </Grid>
            <Grid item xs={12}>
                <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
                    <AntTab label="Races" />
                    <AntTab label="Scoreboard" />
                </AntTabs>
                <TabPanel value={tab} index={0}>
                    <Races data={leagueInfo.races} leagueId={leagueInfo.id} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Scoreboard data={leagueInfo.scores} />
                </TabPanel>
            </Grid>
        </Page>
    )
}


