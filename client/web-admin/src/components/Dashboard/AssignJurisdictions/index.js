import React, { useEffect, useState } from 'react'
import api from 'services/api'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TransferList from './TransferList'
import SimpleSelect from './Select';
import Header from 'components/Dashboard/Layout/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  gridContainer: {
    height: '575px',
  },
  gridItem: {
    minWidth: '250px',
    maxWidth: '300px',
    marginRight: '35px',
  },
  card: {
    marginTop: '50px',
    position: 'relative',
  },
  cardContent: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  title: {
    fontWeight: 500,
    fontSize: '18px',
  },
  saveButton: {
    margin: theme.spacing(1),
    width: '125px',
  },
  cardActions: {
    justifyContent: 'center',
  },
  select: {
    marginBottom: '100px',
  }
}));

const sortByPropertyAsc = (property) => (a, b) => a[property].localeCompare(b[property]);

function AssignJurisdictions() {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [states, setStates] = useState([]);
  const [jurisdictions, setJurisdictions] = useState(null);
  const [jurisdictionsByState, setJurisdictionsByState] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);

  const assign = jurisdictions => {
    setAssigned(jurisdictions);
  }

  const unassign = jurisdictions => {
    setUnassigned(jurisdictions);
  }

  const selectVolunteer = id => {
    setSelectedVolunteer(volunteers[id]);
  }

  const selectState = id => {
    setSelectedState(states[id]);
  }

  const handleSubmit = () => {
    const jurisdictionIds = assigned.map(jdx => jdx.id);
    const removedJurisdictionIds = unassigned.map(jdx => jdx.id);
    const { id } = selectedVolunteer;
    const res = {
      userId: id,
      jurisdictionIds,
      removedJurisdictionIds,
    }
    console.log(res);
    // TODO: POST to /user/assignments
    // then re-fetch volunteers, jurisdictions
  }

  // fetch volunteers, unassigned jurisidictions
  useEffect(() => {
    let isSubscribed = true;

    api.user.listVolunteers().then(volunteers => {
      const transformed = volunteers.reduce((acc, volunteer) => {
        return {...acc, [volunteer.id]: volunteer }
      }, {});
      if (isSubscribed) {
        setVolunteers(transformed);
      }
    });

    // TODO: switch to jurisdictions.listUnassigned
    api.jurisdictions.list().then(jurisdictions => {
      const jdxByState = {};
      const jdxs = {};
      const states = {};
      jurisdictions.forEach(jdx => {
        const { id, name, state } = jdx;
        if (!states[state.id]) {
          states[state.id] = state;
        }
        jdxs[jdx.id] = { id, name, state };
        const jdxState = jdxByState[state.id] ? [...jdxByState[state.id], { id, name, state}] : [{id, name, state}];
        jdxByState[state.id] = jdxState;
      });
      if (isSubscribed) {
        setJurisdictions(jdxs);
        setJurisdictionsByState(jdxByState);
        setStates(states);
        setLoaded(true);
      }
    });

    return () => isSubscribed = false;
  }, [])

  // set selected volunteer's assigned jurisdictions to right transfer list
  useEffect(() => {
    if (selectedVolunteer && selectedVolunteer.jurisdictions) {
      const jdxs = selectedVolunteer.jurisdictions
        .map(id => jurisdictions[id])
        .sort(sortByPropertyAsc('name'));
      setAssigned(jdxs);
    }
    return () => {}
  }, [selectedVolunteer, jurisdictions])

  // set selected state's unassigned jurisdictions to left transfer list
  useEffect(() => {
    if (selectedState) {
      setUnassigned(jurisdictionsByState[selectedState.id])
    }
    return () => {}
  }, [selectedState, jurisdictionsByState])

  return (
    <>
      <Header title="Assign Jurisdictions" />
      <div className={classes.root}>
        <Grid
          container
          className={classes.gridContainer}
        >
          {/****************  SELECT VOLUNTEER, STATE  ****************/}
          <Grid item className={classes.gridItem} style={{ height: '30%' }} >
            <SimpleSelect
              className={classes.select}
              disabled={!loaded}
              label="Volunteer (assigned jurisdictions)"
              items={loaded && volunteers && Object.values(volunteers).sort(sortByPropertyAsc('email'))}
              schema={{
                id: 'id',
                value: 'id',
                labelText: 'email',
              }}
              onChange={selectVolunteer}
            />
            <SimpleSelect
              className={classes.select}
              disabled={!loaded}
              label="State (unassigned jurisdictions)"
              items={loaded && states && Object.values(states).sort(sortByPropertyAsc('name'))}
              schema={{
                id: 'id',
                value: 'id',
                labelText: 'name',
              }}
              onChange={selectState}
            />
            {/****************  SELECTED VOLUNTEER'S NOTES  ****************/}
            <Card className={classes.card} elevation={1} >
              <CardContent>
                <Typography className={classes.title} id="CardTitle" align="center" component="div">
                  Volunteer notes/preferences:
                </Typography>
                <Typography className={classes.cardContent} style={{ fontSize: '14px' }} id="cardContent" align="center" component="div">
                  { selectedVolunteer && selectedVolunteer.notes ? selectedVolunteer.notes : 'no notes/preferences provided' }
                </Typography>
              </CardContent>
            </Card>
            {/****************  REVIEW/SUBMIT  ****************/}
            <Card className={classes.card} elevation={1} >
              <CardContent>
                <Typography className={classes.title} id="CardTitle" align="center" component="div">
                  Please confirm:
                </Typography>
                <Typography className={classes.cardContent} style={{ fontSize: '16px', fontWeight: 'bold' }} align="center" id="cardContent" component="div">
                  {assigned.length || '0'}
                </Typography>
                <Typography className={classes.cardContent} style={{ fontSize: '14px' }} id="cardContent" align="center" component="div">
                 jurisdictions will be assigned to:
                </Typography>
                <Typography className={classes.cardContent} style={{ fontSize: '14px', fontWeight: 'bold' }} align="center" id="cardContent" component="div">
                  {selectedVolunteer.email || 'no volunteer selected'}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  className={classes.saveButton}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >Save</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
          {/****************  JURISDICTION ASSIGNMENT  ****************/}
            <TransferList
              leftTitle="Unassigned Jurisdictions"
              rightTitle="Assign to Volunteer"
              leftItems={unassigned}
              rightItems={assigned}
              onTransferLeft={unassign}
              onTransferRight={assign}
              schema={{
                value: 'id',
                primaryText: 'name',
                secondaryText: 'abbreviation'
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default AssignJurisdictions;
