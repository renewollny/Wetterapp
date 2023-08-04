import './App.css';
import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from 'axios';

function App() {
  // Variablen definieren
  const [location, setLocation] = React.useState("");
  const [weather, setWeather] = React.useState({Temperatur:"", Bewölkung:"", Luftfeuchtigkeit: "", Windgeschwindigkeit: ""});
  const api_key = "Hier muss der API-Key rein";

  // auszuführende Funktion, wenn Button gedrückt wird
  const handleClick = () => {
    if (location === "") return;
    // eingebenen Ort in Variable "location" setzen
    setLocation(document.getElementById("Ort").value);
    // Funktion um Wetterdaten zu erhalten, ausführen
    getWeather();
  };

  // Funktion mit API-Call, um Wetterdaten für den eingebenen Ort zu erhalten
  const getWeather = async () => {
    const options = {
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`
    };
    try {
      const response = await axios.request(options);
      // console.log(response.data);
      // Wetterdaten in "weather"-Variable schreiben
      setWeather({Temperatur:response.data.main.temp,Bewölkung:response.data.weather[0].description,Luftfeuchtigkeit:response.data.main.humidity,Windgeschwindigkeit:response.data.wind.speed});
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <Container maxWidth="md" align="center">
        <Typography variant="h1">Wetterdaten</Typography>
        <hr />
        <Stack direction="row" spacing={2} justifyContent="center" margin="2em">
          <TextField id="Ort" label="Bitte Ort eingeben" variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Button variant="contained" onClick={handleClick} sx={{ marginRight: 2, backgroundColor: 'green', color: 'white' }}>Wetterdaten erhalten</Button>
        </Stack>
        <br />
        <Box sm={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <div><h3>Das aktuelle Wetter in {location}:</h3></div>
          <br />
          <div>Die Temperatur in {location} beträgt aktuell: {weather.Temperatur} °C.</div>
          <br />
          <div>Die Bewölkung in {location} ist aktuell: {weather.Bewölkung}.</div>
          <br />
          <div>Die Luftfeuchtigkeit in {location} beträgt aktuell: {weather.Luftfeuchtigkeit} %.</div>
          <br />
          <div>Die Windgeschwindigkeit in {location} beträgt aktuell: {weather.Windgeschwindigkeit} km/h.</div>
          <br />
        </Box>
      </Container>
    </>
  );
}

export default App;