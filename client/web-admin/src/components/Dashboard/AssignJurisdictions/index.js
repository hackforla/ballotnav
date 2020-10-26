import React, { useEffect, useState } from 'react'
import { useToast } from 'components/use-toast'
import api from 'services/api'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
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
  const toast = useToast();

  const [loaded, setLoaded] = useState(false);
  const [states, setStates] = useState([]);
  const [jurisdictions, setJurisdictions] = useState(null);
  const [jurisdictionsByState, setJurisdictionsByState] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (assigned.length || unassigned.length) {
      const { id, userJurisdictions } = selectedVolunteer;
      const userJurisdictionIds = userJurisdictions.map(jdx => jdx.id);
      const jurisdictionIdsToAssign =
        assigned.map(jdx => jdx.id)
                .filter(id => !userJurisdictionIds.includes(id));
      const removedJurisdictionIds =
        unassigned.map(jdx => jdx.id)
                  .filter(id => userJurisdictionIds.includes(id));

      const body = {
        userId: id,
        jurisdictionIds: jurisdictionIdsToAssign,
        removedJurisdictionIds,
      }

      api.assignment.assignJurisdictions(body)
        .then(({ results }) => {
          const successMessage = `
            Success:
            Created ${results.created.length} jurisdiction assignments.
            Removed ${results.removed} jurisdiction assignments.`
          toast({
            severity: 'success',
            autoHideDuration: 7000,
            message: successMessage,
          });
          setSubmitting(false);
        });
    }
  }

  // fetch volunteers, jurisidictions
  useEffect(() => {
    let isSubscribed = true;
    if (!submitting) {
      api.assignment.listAllVolunteers().then(volunteers => {
        const transformed = volunteers.reduce((acc, volunteer) => {
          volunteer.userJurisdictions = volunteer.userJurisdictions.map(j => j.jurisdiction);
          return {...acc, [volunteer.id]: volunteer }
        }, {});
        if (isSubscribed) {
          setVolunteers(transformed);
        }
      });

      api.assignment.listAllJurisdictions().then(jurisdictions => {
        const jdxByState = {};
        const jdxs = {};
        const states = {};
        jurisdictions.forEach(jdx => {
          const { id, name, state, userJurisdictions } = jdx;
          const newJdx = { id, name, state, userJurisdictions };
          if (!states[state.id]) {
            states[state.id] = state;
          }
          jdxs[jdx.id] = newJdx;
          const jdxState = jdxByState[state.id] ? [...jdxByState[state.id], newJdx] : [newJdx];
          jdxByState[state.id] = jdxState;
        });
        if (isSubscribed) {
          setJurisdictions(jdxs);
          setJurisdictionsByState(jdxByState);
          setStates(states);
          setLoaded(true);
        }
      });
    }

    return () => isSubscribed = false;
  }, [submitting])

  // set selected volunteer's assigned jurisdictions to right transfer list
  useEffect(() => {
    if (selectedVolunteer && selectedVolunteer.userJurisdictions) {
      const jdxs = selectedVolunteer.userJurisdictions
        .map(jdx => jurisdictions[jdx.id])
        .sort(sortByPropertyAsc('name'));
      setAssigned(jdxs);
    }
    return () => {}
  }, [selectedVolunteer, jurisdictions, volunteers])

  // set selected state's unassigned jurisdictions to left transfer list
  useEffect(() => {
    if (selectedState.id) {
      setUnassigned(jurisdictionsByState[selectedState.id])
    }
    return () => {}
  }, [selectedState, jurisdictionsByState, states])

  // refresh selected volunteer, state after new fetch
  useEffect(() => {
    if (selectedVolunteer.id) {
      setSelectedVolunteer(volunteers[selectedVolunteer.id]);
    }
    if (selectedState.id) {
      setSelectedState(states[selectedState.id])
    } else {
      setUnassigned([]);
    }
    // eslint-disable-next-line
  }, [volunteers, states])

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
              label="Volunteer"
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
              label="State"
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
                  disabled={!(assigned.length || unassigned.length) || submitting}
                >
                  { submitting ? <CircularProgress size={20} variant="indeterminate" color="primary" /> : 'Save' }
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
          {/****************  JURISDICTION ASSIGNMENT  ****************/}
            <TransferList
              leftTitle="Unassigned Jurisdictions"
              rightTitle="Assign to Volunteer"
              leftItems={assigned.length ?
                Object.values(unassigned)
                  .filter(jdx => !assigned.map(j => j.id).includes(jdx.id))
                  .sort(sortByPropertyAsc('name'))
                :
                Object.values(unassigned).sort(sortByPropertyAsc('name'))
              }
              rightItems={Object.values(assigned).sort(sortByPropertyAsc('name'))}
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
