import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Page } from "components/common/Page";
import LinkButton from "components/common/LinkButton";
import { clearNewLeagueJoined, getLeagues } from "store/actions/leaguesActions";
import { getLeaguesResource } from "utils/resources";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useCallback } from "react";

export default function Leagues(props) {
  const dispatch = useDispatch();
  const { user } = useAuthenticator((context) => [context.user]);
  const leaguesState = useSelector((state) => state.leagues);
  const { loading, error, leaguesList, joinLeagueError } = leaguesState;

  const [openJoinLeagueErrorDialog, setOpenJoinLeagueErrorDialog] = useState(false);
  useEffect(() => {
    setOpenJoinLeagueErrorDialog(joinLeagueError !== null)
  }, [joinLeagueError]);

  const handleDialogClose = useCallback(() => {
    console.log("is this happening?")
    dispatch(clearNewLeagueJoined());
    setOpenJoinLeagueErrorDialog(false);
  }, []);

  useEffect(() => {
    if (user?.username) {
      dispatch(getLeagues(user?.username));
    }
  }, [dispatch, user]);

  const leaguesComponents = leaguesList
    .sort((a, b) => ("" + a.season + a.name).localeCompare(b.season + b.name))
    .reverse()
    .map((league) => (
      <LeagueSelector data={league} key={league.id} />
    ));

  const emptyListPlaceholder = (
    <Grid container item xs={12} justifyContent="center" style={{paddingBottom: "2em", paddingTop: "1.5em"}}>
        <Subtitle>Nothing to see here!</Subtitle>
    </Grid>
  );

  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h4">Leagues</Typography>
        <Subtitle>Select a league or create a new one</Subtitle>
      </Grid>

      <Divider variant="middle" style={{ borderBottom: "1px solid #e8e8e8", width: "100%", marginBottom: "20px" }} />

      <Grid container item xs={12} direction="column">
        <Loadable loading={loading} error={error}>
          {leaguesComponents.length !== 0 ? leaguesComponents : emptyListPlaceholder}
        </Loadable>
      </Grid>

      <Grid item xs={12}>
        <LinkButton
          text="Create New League"
          to="/leagues/new"
          variant="outlined"
          color="primary"
        />
      </Grid>

      <NewLeagueDialog open={openJoinLeagueErrorDialog} onClose={handleDialogClose} />
    </Page>
  );
}

function LeagueSelector(props) {
  const data = props.data;

  return (
    <Grid item>
      <LinkButton
        text={data.name}
        subtext={data.season + " season"}
        to={getLeaguesResource(data.id)}
        variant="contained"
        color="primary"
        width="200px"
      />
    </Grid>
  )
}

function newLeagueDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Error
      </DialogTitle>
      <DialogContent>
        <Grid container item xs={12} direction="column">
          <Grid item xs={12}>
            <Typography>
              Failed to join league.
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

const NewLeagueDialog = memo(newLeagueDialog);
