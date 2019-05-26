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
import { loadHSBCDataStat, loadHangSengDataStat, loadJetcoDataStat } from '../../utils/dataLoader';

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
    const hsbcDataStat = loadHSBCDataStat();
    const hangSengDataStat = loadHangSengDataStat();
    const jetcoDataStat = loadJetcoDataStat();

    const rows = [
        this.createData('HSBC API Portal', hsbcDataStat.LastUpdated, hsbcDataStat.TotalResults),
        this.createData('Hang Seng API Portal', hangSengDataStat.LastUpdated, hangSengDataStat.TotalResults),
        this.createData('Jetco Website', jetcoDataStat.LastUpdated, jetcoDataStat.TotalResults),
        //TODO: List all bank stats under Jetco network
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
};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMDataSource));
