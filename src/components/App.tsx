import React from 'react';
import Header from './ui/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={() => <div>Home</div>} exact />
          <Route path="/services" component={() => <div>Services</div>} exact />
          <Route path="/customsoftware" component={() => <div>Custom Software</div>} exact />
          <Route path="/mobileapps" component={() => <div>Mobile Apps</div>} exact />
          <Route path="/websites" component={() => <div>Websites</div>} exact />
          <Route path="/revolution" component={() => <div>Revolution</div>} exact />
          <Route path="/about" component={() => <div>About</div>} exact />
          <Route path="/contactus" component={() => <div>Contact Us</div>} exact />
          <Route path="/estimate" component={() => <div>Free Estimate</div>} exact />
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
