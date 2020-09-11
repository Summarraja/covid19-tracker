/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryData from '../Data/CountryData.json';

export default function SelectBox({ setRegion }) {
  var countriesList = [{ title: "Global", code: "GLO" }];
  const [value, setValue] = React.useState(countriesList[0]);
  const [list, setList] = React.useState(countriesList);
  useEffect(() => {
    async function fetchData() {
      var data;
      const response = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL')
      data = await response.json();
      return data;
    }
    fetchData()
      .then(createlist)
      .catch(() => {
        console.log("Fetch error at SelectBox, showing static data");
        createlist(CountryData);
      });
      function createlist(data){
        var List = [];
        var keys = Object.keys(data.countryitems[0]);
        keys.map((key) => {
          var country = data.countryitems[0][key];
          if (country.title)
            List = [...List, { title: country.title, code: country.code }]
        });
        setList([...countriesList, ...List]);
      }
    }, []);
  const defaultProps = {
    options: list,
    getOptionLabel: (option) => option.title,
  };

  return (
    <div style={{ width: 250, margin: 'auto' }}>
      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue);
            setRegion(newValue);
          }
        }}
        id="auto-select"
        autoSelect
        renderInput={(params) => <TextField {...params} label="Select Region" margin="normal" />}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
