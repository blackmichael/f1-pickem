import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "components/common/StyledTable";
import React from "react";
import { getLeagueInviteLink } from "utils/resources";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Scoreboard(props) {
  const members = props.members || [];
  const { inviteToken, leagueId } = props;
  const inviteLink = getLeagueInviteLink(leagueId, inviteToken)

  function copyLeagueInviteLink() {
    navigator.clipboard.writeText(inviteLink);
  }

  let inviteLinkComponent = <></>;
  if (inviteToken) {
    inviteLinkComponent = (
      <Grid item xs={12} style={{paddingTop: "2em"}}>
        <TextField
          label="Invite Friends"
          variant="outlined"
          disabled
          size="medium"
          margin="normal"
          fullWidth
          defaultValue={inviteLink}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton edge="end" onClick={copyLeagueInviteLink()}>
                <ContentCopyIcon></ContentCopyIcon>
              </IconButton>
            </InputAdornment>
          }} />
      </Grid>
    );
  }

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members
                .sort((a, b) => a.score < b.score)
                .map((member, idx) => (
                  <StyledTableRow key={`${idx}_${member.id}`}>
                    <StyledTableCell>{member.name}</StyledTableCell>
                    <StyledTableCell>{member.score ? member.score : "n/a"}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Grid>
      {inviteLinkComponent}
    </Grid>
  );
}
