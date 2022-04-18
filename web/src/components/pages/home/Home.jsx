import React from "react";
import {
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Page } from "components/common/Page";

export default function Home() {
  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h3">Welcome to F1 Pick 'Em!</Typography>
        <Typography variant="subtitle1">
          A hobby site for Formula 1 racing speculation.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px", width: "50%" }}>
        <Typography variant="h5">How It Works</Typography>
        <Typography variant="body1">
          Join a league with your friends, and pick the order you think the Top
          10 drivers will come in. After a race has completed, your picks will
          be scored according to the rubrik below and a winner will be selected.
          Throughout the season you can check the leaderboards to see who picks
          'em best, and a winner will be selected at the end.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Typography variant="h5">Scoring</Typography>
        <Typography variant="body1">
          Inspired by the way Formula 1 drivers are awarded points for a race,
          each pick is scored on a scale based on how close you were to that
          driver's actual position. Picks that are spot-on are awarded 25
          points, while picks that were one-off are awarded 18 points, and so
          on. Here's the complete scoring scale.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          style={{ minWidth: "200px", width: "25%" }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Position Difference</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>18</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>12</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>6</TableCell>
                <TableCell>6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>8</TableCell>
                <TableCell>2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>9</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10+</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Typography variant="caption">
          This website is maintained by{" "}
          <Link href="https://github.com/blackmichael">Michael Black</Link>.
          Neither the website or its maintainers are affiliated with Formula 1
          Racing.
        </Typography>
      </Grid>
    </Page>
  );
}
