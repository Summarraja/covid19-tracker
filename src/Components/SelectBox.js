/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryData from '../Data/CountryData';

export default function SelectBox({ setRegion }) {
  var countriesList = [{ title: "Global", code: "GLO" }];
  const [value, setValue] = React.useState(countriesList[0]);
  const [list, setList] = React.useState(countriesList);
  useEffect(() => {
    async function createList() {
      var List = [];
      const response = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
      var keys = await response.json();
      keys = Object.keys(CountryData.countryitems[0]);
      keys.map((key) => {
        var country = CountryData.countryitems[0][key];
        if (country.title)
          List = [...List, { title: country.title, code: country.code }]
      });
      setList([...countriesList, ...List]);
    }
    createList();
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
          if (newValue){
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
