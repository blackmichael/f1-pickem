import React, { Fragment, useEffect, useState } from 'react';
import { Page, Subtitle } from 'components/common/Page'
import { Box, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Tab, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, withStyles } from '@material-ui/core';
import { getLeague } from 'store/defaultStore';
import Scoreboard from 'components/pages/league/Scoreboard';
import Races from 'components/pages/league/Races';
import { AntTab, AntTabs, TabPanel } from 'components/common/Tabs';
import { getRace, getPicks, getLeagueSummary } from 'store/defaultStore';
import { StyledTable, StyledTableCell, StyledTableRow } from 'components/common/StyledTable';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DoneAllIcon from '@material-ui/icons/DoneAll';

export default function Results(props) {

    const results = props.results || [];
    const picks = props.picks || [];

    // pass this in? grab it from an api?
    const data = [
        {
            "name": "Daniel Ricciardo",
            "position": 1,
            "picked": 1,
            "team": "McLaren",
            "points": 25,
        },
        {
            "name": "Max Verstappen",
            "position": 2,
            "picked": 4,
            "team": "RedBull",
            "points": 15,
        },
        {
            "name": "Lewis Hamilton",
            "position": 3,
            "picked": 2,
            "team": "Mercedes",
            "points": 18,
        },
        {
            "name": "Lando Norris",
            "position": 4,
            "picked": 3,
            "team": "McLaren",
            "points": 18
        }
    ]

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Position</StyledTableCell>
                            <StyledTableCell>Driver</StyledTableCell>
                            <StyledTableCell>Team</StyledTableCell>
                            <StyledTableCell>Pick Points</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .sort((a, b) => a.position > b.position)
                            .map((result) => (
                                <StyledTableRow key={result.name}>
                                    <StyledTableCell>{result.position}</StyledTableCell>
                                    <StyledTableCell>{result.name}</StyledTableCell>
                                    <StyledTableCell>{result.team}</StyledTableCell>
                                    <StyledTableCell>
                                        <Points 
                                            position={result.position}
                                            picked={result.picked}
                                            points={result.points}
                                            />    
                                    </StyledTableCell>
                                </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Grid>
    )
}

// todo - make this pretty
function Points(props) {
    const position = props.position;
    const picked = props.picked;
    const points = props.points;

    if (picked < position) {
        return (
            <Typography>
                {points}
                (<Fragment>
                    <ArrowDropDownIcon /> {position - picked}
                </Fragment>)
            </Typography>
        )
    } else if (picked > position) {
        return (
            <Typography>
                {points}
                (<Fragment>
                    <ArrowDropUpIcon /> {position - picked}
                </Fragment>)
            </Typography>
        )
    } else {
        return (
            <Typography>
                {points}
                (<DoneAllIcon />)
            </Typography>
        )
    }
}