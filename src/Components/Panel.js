import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useCountUp } from 'react-countup';
import SelectBox from './SelectBox';
import LineChart from '../Charts/lineChart';
import PieChart from '../Charts/PieChart';
import Loading from './Loading';
import GlobalData from './../Data/GlobalData.json';
import CountryData from './../Data/CountryData.json';
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
        async function fetchGlobalData() {
            let response = await fetch('https://api.thevirustracker.com/free-api?global=stats');
            let rawData = await response.json();
            return rawData;
        }
        async function fetchCountryData() {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTotal=' + region.code);
            let rawData = await response.json();
            return rawData;
        }
        function setRawData(data) {
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
        if (region.code === "GLO") {
            fetchGlobalData()
                .then(rawData => {
                    setRawData(rawData.results[0]);
                })
                .catch(reason => {
                    console.log(reason.message);
                    setRawData(GlobalData.results[0]);
                });
        } else {
            fetchCountryData()
                .then(rawData => {
                    setRawData(rawData.countrydata[0]);
                })
                .catch(reason => {
                    console.log(reason.message);
                    var keys = Object.keys(CountryData.countryitems[0]);
                    keys.map((key) => {
                        var country = CountryData.countryitems[0][key];
                        if (country.title && country.code === region.code) {
                            setRawData(country);
                        }
                    });
                })
        }
    }, [region]);

    // useEffect(() => {
    //     // window.scrollTo(0, 0)
    //     async function getData() {
    //         let response = null;
    //         let data = null;
    //         if (region.code === "GLO") {
    //             response = await fetch('https://api.thevirustracker.com/free-api?global=stats')
    //             .then(async function(){
    //                 data = await response.json();
    //             })
    //             .then(function(){
    //                 data = data.results[0];
    //             })
    //             .catch(function(){
    //                 console.log("Fetch error, showing static data");
    //                 data=GlobalData.results[0];
    //             });
    //         } else {
    //             response = await fetch('https://api.thevirustracker.com/free-api?countryTotal=' + region.code)
    //             .then(async function(){
    //                 data = await response.json();
    //             })
    //             .then(function(){
    //                 data = data.countrydata[0];
    //             })
    //             .catch(function(){
    //                 console.log("Fetch error, showing static data");
    //                 data = CountryData.countrydata[0];
    //             })
    //         }
    //         data = {
    //             total: data.total_cases,
    //             deaths: data.total_deaths,
    //             recovered: data.total_recovered,
    //             active: data.total_cases - (data.total_deaths + data.total_recovered),
    //             closed: data.total_recovered + data.total_deaths,
    //             serious: data.total_active_cases,
    //             mild: data.total_serious_cases
    //         }
    //         setData(data);
    //         totalUpdate(data.total);
    //         deathUpdate(data.deaths);
    //         recoveredUpdate(data.recovered);
    //     }
    //     getData();
    // }, [region]);

    const classes = useStyles();
    if (!data.total) {
        return (
            <div style={{
                margin: 0,
                position: "fixed",
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
                        <div className="yellow box-center">
                            <h3>Total Cases</h3>
                            <h1>{totalCountUp}</h1>
                        </div>
                        <div className="red box-center">
                            <h3>Total Deaths</h3>
                            <h1>{deathCountUp}</h1>
                        </div>
                        <div className="blue box-center">
                            <h3>Total Recovered</h3>
                            <h1>{recoveredCountUp}</h1>
                        </div>
                        <PieChart pieData={data} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <div className="yellow">
                            <h3>Active Cases</h3>
                            <h1>{data.active}</h1>
                        </div>
                        <Grid container>
                            <Grid item xs={6}>
                                <div className="blue">
                                    <h4>Mild Cases</h4>
                                    <h2>{data.mild}</h2>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="red">
                                    <h4>Critical Cases</h4>
                                    <h2>{data.serious}</h2>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <div className="yellow">
                            <h3>Closed Cases</h3>
                            <h1>{data.closed}</h1>
                        </div>
                        <Grid container>
                            <Grid item xs={6}>
                                <div className="blue">
                                    <h4>Recovered</h4>
                                    <h2>{data.recovered}</h2>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="red">
                                    <h4>Deaths</h4>
                                    <h2>{data.deaths}</h2>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <LineChart region={region} />
                    </Paper>
                </Grid>
            </Grid>
            &#169; Summar Raja

        </div>
    );
}
