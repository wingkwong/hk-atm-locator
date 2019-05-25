import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
};

class ATMDataSource extends React.Component {
    createData = (name, last_update, number_of_records) => {
        return { name, last_update, number_of_records };
    }

  render() {
    const { classes } = this.props;
    // TODO: fetch dynamically
    // TODO: show each bank instead of network
    const rows = [
        this.createData('HSBC API Portal', '2019-05-20T05:52:14+08:00', 403),
        this.createData('Hang Seng API Portal', '2019-05-20T07:50:06+08:00', 282),
        this.createData('Jetco Website', '2019-05-20T03:48:17.586Z', 1851),
      ];
    
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell align="right">Last Update</TableCell>
              <TableCell align="right">Number of records</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.last_update}</TableCell>
                <TableCell align="right">{row.number_of_records}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ATMDataSource.propTypes = {
  classes: PropTypes.object.isRequired,
  atm: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      atm: state.atm.data,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMDataSource));
