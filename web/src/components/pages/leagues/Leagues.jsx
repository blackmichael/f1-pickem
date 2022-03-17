import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { Page } from 'components/common/Page';
import LinkButton from 'components/common/LinkButton';
import { getLeagues } from 'store/actions/leaguesActions'
import { StyledTable, StyledTableCell, StyledTableRow } from 'components/common/StyledTable'
import { getLeaguesResource } from 'utils/resources';

export default function Leagues(props) {
    const dispatch = useDispatch();
    const leaguesState = useSelector(state => state.leaguesList);
    const { loading, error, leagues } = leaguesState;

    useEffect(() => {
        dispatch(getLeagues())
    }, [dispatch])

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
            <StyledTableCell align="left">{data.num_of_members}</StyledTableCell>
            <StyledTableCell align="left">{data.season}</StyledTableCell>
            <StyledTableCell align="left">
                <LinkButton 
                    text="View" 
                    to={getLeaguesResource(data.id)}
                    variant="contained" 
                    color="primary"
                />
            </StyledTableCell>
        </StyledTableRow>
    )
}

