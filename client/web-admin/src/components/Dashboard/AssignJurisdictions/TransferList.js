import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    minWidth: 300,
    minHeight: 500,
    maxHeight: 500,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b, value) {
  return a.filter(itemA => !b.some(itemB => itemA[value] === itemB[value]))
}

function intersection(a, b, value) {
  return a.filter(itemA => b.some(itemB => itemA[value] === itemB[value]))
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList({
  leftTitle,
  rightTitle,
  rightItems,
  leftItems,
  onTransferLeft,
  onTransferRight,
  schema,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (item) => () => {
    const currentIndex = checked.findIndex(i => i[schema.value] === item[schema.value]);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(items, checked, schema.value).length;

  // const handleToggleFirst15 = items => () => {}

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    const leftChecked = intersection(leftItems, checked, schema.value);
    const newLeft = not(leftItems, leftChecked, schema.value);
    onTransferLeft(newLeft);
    onTransferRight(rightItems.concat(leftChecked));
    setChecked(not(checked, leftChecked, schema.value));
  };

  const handleCheckedLeft = () => {
    const rightChecked = intersection(rightItems, checked, schema.value);
    const newRight = not(rightItems, rightChecked, schema.value);
    onTransferRight(newRight);
    onTransferLeft(rightChecked.concat(leftItems));
    setChecked(not(checked, rightChecked, schema.value));
  };

  const customList = (title, subheader, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            // indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={subheader}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-all-item-${item[schema.primaryText]}-label`;
          return (
            <ListItem key={item[schema.value] + item[schema.primaryText]} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex(i => i[schema.value] === item[schema.value]) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item[schema.primaryText]} secondary={item[schema.secondaryText]}/>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center" className={classes.root}>
      <Grid item>{customList(leftTitle, 'Select all', leftItems)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={intersection(leftItems, checked, schema.value).length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={intersection(rightItems, checked, schema.value).length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(rightTitle, 'Select all', rightItems)}</Grid>
    </Grid>
  );
}

export default TransferList;
