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
import config from "config";

export default function Scoreboard(props) {
  const members = props.members || [];
  const { inviteToken, leagueId } = props;
  const inviteLink = getLeagueInviteLink(leagueId, inviteToken)

  function copyLeagueInviteLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern clipboard API
      navigator.clipboard.writeText(inviteLink).catch((err) => {
        console.error('Failed to copy to clipboard:', err);
        fallbackCopyToClipboard();
      });
    } else {
      // Fallback for older browsers or when clipboard API is not available
      fallbackCopyToClipboard();
    }
  }

  function fallbackCopyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = inviteLink;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  let inviteLinkComponent = <></>;
  // Show invite link if user is owner (has inviteToken) OR in demo mode
  if (inviteToken || config.isDemoMode) {
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
              <IconButton edge="end" onClick={copyLeagueInviteLink}>
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
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Total Score</StyledTableCell>
                <StyledTableCell>Average Score</StyledTableCell>
                <StyledTableCell>Best Race</StyledTableCell>
                <StyledTableCell>Worst Race</StyledTableCell>
                <StyledTableCell>Races Submitted</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members
                .sort((a, b) => a.total_score < b.total_score)
                .map((member, idx) => (
                  <StyledTableRow key={`${idx}_${member.id}`}>
                    <StyledTableCell>{idx+1}. {member.name}</StyledTableCell>
                    <StyledTableCell>{member.total_score}</StyledTableCell>
                    <StyledTableCell>{member.average_score}</StyledTableCell>
                    <StyledTableCell>{member.best_score}</StyledTableCell>
                    <StyledTableCell>{member.worst_score}</StyledTableCell>
                    <StyledTableCell>{member.races_submitted}</StyledTableCell>
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
