import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Loading from './Loading';
//import CountryData from '../Data/CountryData';
const useStyles = makeStyles({
  root:{
    marginBottom:'60px',
  },
  table: {
    alignItems: 'center',
    marginBottom: 50,
    minWidth: 500,
    marginLeft: 20,
    backgroundColor: "#f5f5f5",
  },
});

function createData(title, total, total_new, deaths, deaths_new, recovered) {
  return { title, total, total_new, deaths, deaths_new, recovered };
}

export default function DenseTable() {
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  useEffect(() => {
    //window.scrollTo(0, 0);
    async function getData() {
      const response = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
      let CountryData = await response.json();

      var keys = Object.keys(CountryData.countryitems[0]);
      var rows = [];
      keys.map((key) => {
        var country = CountryData.countryitems[0][key];
        if (country.title)
          rows = [...rows, createData(country.title, country.total_cases, country.total_new_cases_today, country.total_deaths, country.total_new_deaths_today, country.total_recovered)];
      })
      setrows(rows);
    }
    getData();
  }, []);
  if (rows.length === 0) {
    return (
      <div style={{
        margin: 0,
        position: "fixed",
        width: '20%',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <Loading color={"gray"} />
      </div>)
  }
  return (
    <div className={classes.root}>
          <h2>All Countries Statistics</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead style={{ backgroundColor: "#bbf8c0" }}>
                <TableRow >
                  <TableCell>Country</TableCell>
                  <TableCell align="left">Total Cases</TableCell>
                  <TableCell align="left">New Cases</TableCell>
                  <TableCell align="left">Total Deaths</TableCell>
                  <TableCell align="left">New Deaths</TableCell>
                  <TableCell align="left">Total Recovered</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.title}>
                    <TableCell component="th" scope="row">
                      <strong>{row.title}</strong>
                    </TableCell>
                    <TableCell align="left">{row.total}</TableCell>
                    <TableCell align="left">{row.total_new}</TableCell>
                    <TableCell align="left">{row.deaths}</TableCell>
                    <TableCell align="left">{row.deaths_new}</TableCell>
                    <TableCell align="left">{row.recovered}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

      &#169; Summar Raja
    </div>
  );
}
