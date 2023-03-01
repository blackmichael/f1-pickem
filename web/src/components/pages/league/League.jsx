import React, { memo, useCallback, useEffect, useState } from "react";
import { Page } from "components/common/Page";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Scoreboard from "components/pages/league/Scoreboard";
import Races from "components/pages/league/Races";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { clearNewLeagueCreated, clearNewLeagueJoined, getLeagueDetails, getLeagues } from "store/actions/leaguesActions";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { getRaces } from "store/actions/racesActions";
import { useMatch, useResolvedPath } from "react-router-dom";
import { getLeagueInviteLink } from "utils/resources";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Map } from 'immutable';

export default function League(props) {
  const dispatch = useDispatch();
  const { user } = useAuthenticator((context) => [context.user]);
  const match = useMatch("/leagues/:id");
  const leagueId = match.params.id;

  const leaguesState = useSelector((state) => state.leagues);
  const { leaguesLoading, leaguesError, leaguesMap, newLeagueId, newLeagueInviteToken, newLeagueJoined } = leaguesState;
  const leagueDetails = leaguesMap.get(leagueId, {});

  const [openNewLeagueCreatedDialog, setOpenNewLeagueCreatedDialog] = useState(false);
  const inviteLink = getLeagueInviteLink(newLeagueId, newLeagueInviteToken);

  const [openNewLeagueJoinedDialog, setOpenNewLeagueJoinedDialog] = useState(false);
  useEffect(() => {
    if (Object.keys(leagueDetails).length > 0) {
      setOpenNewLeagueJoinedDialog(newLeagueJoined);
    }
  }, []);

  const handleNewLeagueJoinedDialogClose = useCallback(() => {
    dispatch(clearNewLeagueJoined());
    setOpenNewLeagueJoinedDialog(false);
  }, []);

  useEffect(() => {
    dispatch(getLeagueDetails(leagueId, user?.username));
  }, [dispatch, user]);

  useEffect(() => {
    // wait until league info has been fetched
    if (Object.keys(leagueDetails).length > 0) {
      setOpenNewLeagueCreatedDialog(newLeagueId !== null && newLeagueInviteToken !== null);
    }
  }, [newLeagueId, newLeagueInviteToken, leagueDetails]);

  const racesState = useSelector((state) => state.races);
  const { racesLoading, racesError, racesBySeason } = racesState;
  let races = (racesBySeason[leagueDetails.season] || []);

  useEffect(() => {
    if (!racesBySeason[leagueDetails.season] && leagueDetails.season !== undefined) {
      dispatch(getRaces(leagueDetails.season));
    }
  }, [dispatch, leagueDetails.season]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleNewLeagueCreatedDialogClose = useCallback(() => {
    dispatch(clearNewLeagueCreated());
    setOpenNewLeagueCreatedDialog(false);
  }, []);

  return (
    <Page>
      <Loadable loading={leaguesLoading} error={leaguesError}>
        <Grid item xs={12}>
          <Typography variant="h4">{leagueDetails.name}</Typography>
          <Subtitle>{leagueDetails.season} Season</Subtitle>
        </Grid>
        <Grid item xs={12}>
          <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
            <AntTab label="Races" />
            <AntTab label="Scoreboard" />
          </AntTabs>
          <TabPanel value={tab} index={0}>
            <Loadable loading={racesLoading} error={racesError}>
              <Races races={races} leagueId={leagueDetails.id}/>
            </Loadable>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Scoreboard members={leagueDetails.members} inviteToken={leagueDetails.invite_token} leagueId={leagueId} />
          </TabPanel>
        </Grid>
      </Loadable>
      <NewLeagueCreatedDialog open={openNewLeagueCreatedDialog} onClose={handleNewLeagueCreatedDialogClose} inviteLink={inviteLink} />
      <NewLeagueJoinedDialog open={openNewLeagueJoinedDialog} onClose={handleNewLeagueJoinedDialogClose} />
    </Page>
  );
}

function newLeagueCreatedDialog({ open, onClose, inviteLink }) {
  function copyLeagueInviteLink() {
    navigator.clipboard.writeText(inviteLink);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Success!
      </DialogTitle>
      <DialogContent>
        <Grid container item xs={12} direction="column">
          <Grid item xs={12}>
            <Typography>
              Share the link below to invite your friends.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" disabled size="small" margin="normal" fullWidth defaultValue={inviteLink}></TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={copyLeagueInviteLink}>Copy Link</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

const NewLeagueCreatedDialog = memo(newLeagueCreatedDialog);

function newLeagueJoinedDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Success!
      </DialogTitle>
      <DialogContent>
        <Grid container item xs={12} direction="column">
          <Grid item xs={12}>
            <Typography>
              Welcome to your new league.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

const NewLeagueJoinedDialog = memo(newLeagueJoinedDialog);
