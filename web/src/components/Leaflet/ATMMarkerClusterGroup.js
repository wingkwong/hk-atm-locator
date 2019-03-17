import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const styles = theme => ({
    
});

class ATMMarkerClusterGroup extends React.Component {
    componentDidMount() {
        
    }

    renderMarkerClusterGroup() {
        const { atm } = this.props;
        return (
            <MarkerClusterGroup>
                {
                    atm.map((data, idx) => {
                        const latitude = data.ATMAddress.LatitudeDescription;
                        const longitude = data.ATMAddress.LongitudeDescription;
                        if(latitude != undefined && longitude != undefined) {
                            return (
                                <Marker position={[latitude, longitude]} key={idx}/>
                            );
                        }
                    })
                }
            </MarkerClusterGroup>
        );
    }

    render() {
        return this.renderMarkerClusterGroup();
    }
}

ATMMarkerClusterGroup.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMMarkerClusterGroup));
  