import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ATMItemDetail from '../../components/ATMDetail/ATMItemDetail';
import ATM404Container from '../ATM404Container/ATM404Container';
import { loadAllData } from '../../utils/dataLoader';
import { jetco, hangseng, hsbc } from '../../constants/networks';

const styles = {
    
};

class ATMDetailContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            atm: null,
            network: null,
            pageFound: false
        }
    }

    componentDidMount() {
        const { params: { network, id }, location } = this.props.match;
        const atm = null;

        if(network != jetco.idx && network != hangseng.idx && network != hsbc.idx ) {
            this.setState({
                pageFound: false,
            })
        } else {
            if(location && location.state && location.state.atm) {
                atm = location.state.atm
            }
    
            if(atm) {
                // from ATM Listing
                this.setState({
                    pageFound: true,
                    atm,
                    network
                })
            } else {
                // from URL direct access
    
                // TODO: optimize loading data using ID range
                const ATMs = loadAllData();
    
                let filteredATMs = ATMs.filter(o => {
                    return o.ATMId == id
                });
    
                if(filteredATMs && filteredATMs[0]) {
                    this.setState({
                        atm: filteredATMs[0],
                        pageFound: true,
                        network
                    });
                } else {
                    this.setState({
                        pageFound: false
                    });
                }
            }
        }
    }

    render() {
        const { atm, network, pageFound } = this.state;

        if(!pageFound) {
            return (
                <ATM404Container/>
            );
        }
        
        return (
            <React.Fragment>
               <ATMItemDetail atm={atm} network={network}/>
            </React.Fragment>
        );
    }
}

ATMDetailContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMDetailContainer));