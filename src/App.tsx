import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BarChart from "@material-ui/icons/BarChart";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Charts from "./charts/Charts";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <BarChart className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Random Variate Generators Example
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Charts />
        </Container>
      </main>
    </React.Fragment>
  );
}

export default App;
