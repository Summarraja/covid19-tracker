import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useCountUp } from 'react-countup';
import SelectBox from './SelectBox';
import LineChart from '../Charts/lineChart';
import PieChart from '../Charts/PieChart';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 60,
        flexGrow: 1,
        backgroundColor: 'lightGray'
    },
    paper: {
        padding: theme.spacing(2),
        //  textAlign: '-webkit-center',
        color: theme.palette.text.secondary,
        backgroundColor: "#f5f5f5",
    },
    active: {
        backgroundColor: 'lightPink',
    },

}));

export default function Panel() {
    const [region, setRegion] = useState({ title: "Global", code: "GLO" });
    const [data, setData] = useState({});
    const { countUp: totalCountUp, update: totalUpdate } = useCountUp({ end: 0, duration: 1 });
    const { countUp: deathCountUp, update: deathUpdate } = useCountUp({ end: 0, duration: 1 });
    const { countUp: recoveredCountUp, update: recoveredUpdate } = useCountUp({ end: 0, duration: 1 });
    useEffect(() => {
        // window.scrollTo(0, 0)
        async function getData() {
            let response = null;
            let data = null;
            if (region.code === "GLO") {
                response = await fetch('https://api.thevirustracker.com/free-api?global=stats');
                data = await response.json();
                data = data.results[0];
            } else {
                response = await fetch('https://api.thevirustracker.com/free-api?countryTotal=' + region.code);
                data = await response.json();
                data = data.countrydata[0];
            }
            data = {
                total: data.total_cases,
                deaths: data.total_deaths,
                recovered: data.total_recovered,
                active: data.total_cases - (data.total_deaths + data.total_recovered),
                closed: data.total_recovered + data.total_deaths,
                serious: data.total_active_cases,
                mild: data.total_serious_cases
            }
            setData(data);
            totalUpdate(data.total);
            deathUpdate(data.deaths);
            recoveredUpdate(data.recovered);
        }
        getData();
    }, [region]);

    const classes = useStyles();
    if (!data.total) {
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

            </div>
        )
    }
    return (

        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <Paper className={classes.paper}>
                        <SelectBox setRegion={setRegion} />
                        <h2 style={{ color: "#474747" }}>{region.title} Statistics</h2>
                        <hr />
                        <h3>Total Cases</h3>
                        <h1>{totalCountUp}</h1>
                        <h3>Total Deaths</h3>
                        <h1>{deathCountUp}</h1>
                        <h3>Total Recovered</h3>
                        <h1>{recoveredCountUp}</h1>
                        <br />
                        <PieChart pieData={data} />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} >
                    <Paper className={classes.paper}>
                        <h3>Active Cases</h3>
                        <h2>{data.active}</h2>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4>Mild Cases</h4>
                                <h3>{data.mild}</h3>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Critical Cases</h4>
                                <h3>{data.serious}</h3>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Paper className={classes.paper}>
                        <h3>Closed Cases</h3>
                        <h2>{data.closed}</h2>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4>Recovered</h4>
                                <h3>{data.recovered}</h3>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Deaths</h4>
                                <h3>{data.deaths}</h3>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <LineChart region={region}/>
                    </Paper>
                </Grid>
            </Grid>
            &#169; Summar Raja

        </div>
    );
}
