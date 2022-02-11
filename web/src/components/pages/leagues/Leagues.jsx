import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { Page } from 'components/common/Page';
import LinkButton from 'components/common/LinkButton';
import { getLeagues } from 'store/store'
import { StyledTable, StyledTableCell, StyledTableRow } from 'components/common/StyledTable'

export default function Leagues(props) {

    const [leagues, setLeagues] = useState([])

    useEffect(() => {
        setLeagues(getLeagues())
    })

    return (
        <Page>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Leagues
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <LinkButton 
                    text="Start New League"
                    to="/leagues/new" 
                    variant="outlined" 
                    color="primary"
                />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Members</StyledTableCell>
                                <StyledTableCell>Season</StyledTableCell>
                                <StyledTableCell>Page</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leagues
                                .sort((a, b) => ('' + a.season).localeCompare(b.season))
                                .reverse()
                                .map((league) => (
                                <LeagueSelector data={league} key={league.id}/>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </Grid>
        </Page>
    )
}

function LeagueSelector(props) {
    const data = props.data;

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">{data.name}</StyledTableCell>
            <StyledTableCell align="left">{data.members}</StyledTableCell>
            <StyledTableCell align="left">{data.season}</StyledTableCell>
            <StyledTableCell align="left">
                <LinkButton 
                    text="View" 
                    to={data.resource}
                    variant="contained" 
                    color="primary"
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

