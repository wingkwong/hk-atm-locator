import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ATMMarker from '../../components/Leaflet/ATMMarker';
import currentLocationIcon from '../../static/images/you_are_here.png';
import { distanceConverter } from '../../utils/geoUtils';
import { SERVICES } from '../../constants/services';
import {
    toggleATMDetailDialog,
    setCurrentLocation,
    setSelectedLocation
} from '../../actions';

const drawerWidth = 400

const styles = theme => ({
    mapContainer: {
        position: 'absolute',
        top: '64px',
        width: 'calc(100% - 400px)',
        height: '100%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        paddingTop: '64px'
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
     },
     subHeader: {
        height: '28px'
     },
     networkAvatar: {
        width: '60px',
        height: '60px',
        color: '#fff',
        backgroundColor: deepOrange[500],
     },
     bankIcon: {
      width: '50px',
      height: '50px',
    },
    denseList: {
        paddingTop: '4px',
        paddingBottom: '4px'
    }
});

class ATMDetailContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: {
                lat: 22.308,
                lng: 114.1716
            },
            currentLocation: {
                lat: 22.308,
                lng: 114.1716
            },
            zoom: 16,
            isMapInit: false
        }
    }

    componentDidMount() {
        const { selectedLocation, currentLocation } = this.props;
        let selectedPosition = [this.state.selectedLocation.lat, this.state.selectedLocation.lng];
        let currentPosition =  [this.state.currentLocation.lat, this.state.currentLocation.lng];

        if(selectedLocation != null && Object.keys(selectedLocation).length === 2 && selectedLocation.lat && selectedLocation.lng) {
            selectedPosition = [selectedLocation.lat, selectedLocation.lng];
            this.setState({selectedLocation: selectedPosition})
        }

        if(currentLocation != null && Object.keys(currentLocation).length === 2 && currentLocation.lat && currentLocation.lng) {
            currentPosition = [currentLocation.lat, currentLocation.lng];
            this.setState({currentLocation: currentPosition})
        }
    }

    handleDialogClose = () => {
        this.props.toggleATMDetailDialog(false);
    };

    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        })
    }

    renderDrawer = () => {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.toolbar} />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    { this.renderDrawerContent() }
                </Drawer>
            </React.Fragment>
        );
    }

    renderNetworkIcon = (bank) => {
        const { classes } = this.props;
        return (
            <img alt={bank} src={bank + ".png"} className={classes.bankIcon}></img>
        );
    }

    // TODO: revise UI
    renderServiceList = (services) => {
        const { classes } = this.props;
        // const { BillPaymentIndicator, CashDepositIndicator, CashWithdrawalIndicator, ChequeDepositIndicator, CoinSortIndicator, DisabledAccessIndicator, ForeignCurrencyIndicator } = services;
        return (
            <List 
                dense={true}
            >
                {
                    SERVICES.map((service, idx) => {
                        if(services[service.api_idx]) {
                            return (
                                <ListItem className={classes.denseList} key={idx}>
                                    <ListItemText primary={service.en}></ListItemText>
                                </ListItem>
                            );
                        }
                        return (
                            (null)
                        );
                    })
                }
            </List>
        );
    }

    // TODO: revise UI
    renderOpeningHours = (openingHours) => {
        const { classes } = this.props;
        return (
             <List 
                dense={true}
            >
                {
                    openingHours.map((oh, idx) => {
                       const ohStr = `${oh.OpenDayDescription } : ${oh.OpenTime} - ${oh.CloseTime}`;
                       return (
                           <ListItem className={classes.denseList} key={idx}>
                                <ListItemText primary={ohStr}></ListItemText>
                            </ListItem>
                       );
                    })
                }
            </List>
        )
    }

    renderListItem = (subheader, value) => {
        const { classes } = this.props;

        if(!subheader && !value) {
            return (null);
        }

        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div" className={classes.subHeader}>{subheader}</ListSubheader>}
                className={classes.listRoot}
                dense={true}
                >
                <ListItem>
                    <ListItemText primary={value}/>
                </ListItem>
            </List>
        );
    }

    renderDrawerContent = () => {
        const { atm: { ATMName, ATMServices, ATMAddress: { CountryCode, TerritoryName, DistrictName, AddressLine, LatitudeDescription, LongitudeDescription }, Bank, HotlineNumber, distance, OpeningHours}, classes } = this.props;

        return (
            <React.Fragment>
                <List className={classes.listRoot}>
                    <ListItem alignItems="flex-start">
                        { this.renderNetworkIcon(Bank) }
                        <ListItemText
                        primary={ ATMName }
                        secondary={
                            <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                                ({ LatitudeDescription },{ LongitudeDescription })
                            </Typography>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                </List>

                { this.renderListItem('District', CountryCode + ' > ' + TerritoryName + ' > ' + DistrictName) }
                { this.renderListItem('Address', AddressLine) }
                { this.renderListItem('Services', this.renderServiceList(ATMServices)) }
                { this.renderListItem('Opening Hours', this.renderOpeningHours(OpeningHours)) }
                { this.renderListItem('Hotline Number', HotlineNumber) }
                { this.renderListItem('Distance', distanceConverter(distance)) }
            </React.Fragment>
        );
    }

    render() {
        const { atm, classes, selectedLocation, selectedZoomLvl, currentLocation } = this.props;
        let icon = L.icon({
            iconUrl: currentLocationIcon,
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            iconSize: [70, 70]
       })

       let zoomLvlToUse = selectedZoomLvl;
        if (!zoomLvlToUse || zoomLvlToUse<0) zoomLvlToUse=this.state.zoom;

        return (
            <React.Fragment>
                { this.renderDrawer() }
                <div className={classes.content}>
                    <Map
                        className={classes.mapContainer}
                        center={selectedLocation}
                        zoom= {zoomLvlToUse}
                        maxZoom={18}
                        // dragging={false}
                        ref={this.saveMap}>

                        <TileLayer
                        attribution='&amp;copy <a href="http:osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <ATMMarkerClusterGroup/> */}
                        <Marker position={currentLocation} icon={icon}/>
                        <ATMMarker atm={atm}/>
                    </Map>
                </div>
            </React.Fragment>
        );
    }
}

ATMDetailContent.propTypes = {
    atm: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        selectedLocation: state.location.selectedLocation,
        selectedZoomLvl: state.location.selectedZoomLvl,
        currentLocation: state.location.currentLocation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleATMDetailDialog: (open) => {
            dispatch(toggleATMDetailDialog(open))
        },
        setSelectedLocation: (lat, lng, zoomLvl=-1) => {
            dispatch(setSelectedLocation(lat, lng, zoomLvl))
        },
        setCurrentLocation: (lat, lng) => {
            dispatch(setCurrentLocation(lat, lng))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMDetailContent));
