import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core';

const styles = {
    landingContainer: {
        textAlign: 'center',
        height: '100%',
        color: '#ffffff',
        background: '-webkit-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -webkit-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: '-o-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -o-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: '-moz-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -moz-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: 'linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), linear-gradient(110deg, #34a344 60%, #004966 80%)',
        overflow: 'auto'
    },
    card: {
        width: 345,
        display: 'inline-flex',
        margin: 20
    },
    cardContent: {
        height: '180px'
    },
    media: {
        objectFit: 'scale-down',
        padding: '20px 0px'
    },
    subheader: {
        fontFamily: 'Roboto Condensed, sans-serif',
        fontWeight: 700,
        lineHeight: 1.6,
        fontSize: 24,
        color: '#ffffff',
        paddingTop: '25px',
    },
    divider: {
        width: '300px',
        height: '4px',
        margin: '8px auto 0',
        display: '#000000',
        backgroundColor: '#ffffff'
    },
    paper: {
        overflow: 'hidden'
    }
};

const hsbc = {
    img: './images/hsbc.png',
    title: {
        en: 'HSBC',
        tc: ''
    },
    desc: {
        en: 'HSBC, officially known as The Hongkong and Shanghai Banking Corporation Limited, is a wholly owned subsidiary of HSBC, the largest bank in Hong Kong, and operates branches and offices throughout the Asia Pacific region, and in other countries around the world.',
        tc: ''
    }
};

const hangseng = {
    img: './images/hang_seng.png',
    title: {
        en: 'Hang Seng',
        tc: ''
    },
    desc: {
        en: 'Hang Seng Bank, Limited is a Hong Kong-based banking and financial services company with headquarters in Central, Hong Kong. It is one of Hong Kong\'s leading public companies in terms of market capitalisation and is part of the HSBC Group, which holds a majority equity interest in the bank. ',
        tc: ''
    }
};

const jetco = {
    img: './images/jetco.png',
    title: {
        en: 'Jetco',
        tc: ''
    },
    desc: {
        en: 'JETCO is the biggest network of automatic teller machines and it is a bank consortium chartered to develop innovative and secure financial technology services for its member banks',
        tc: ''
    }
};

class ATMNetworkContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            network: 'all'
        }
    }


    renderCard = (network) => {
        const { classes } = this.props;
        var data = null;

        if(network === 'hsbc') {
            data = hsbc;
        }

        if(network === 'hangseng') {
            data = hangseng;
        }

        if(network === 'jetco') {
            data = jetco;
        }

        if(data == null) {
            return (null);
        }

        return (
            <Link
            to={{
                pathname: `/hk-atm-locator/atm/${network}`,
            }}
            style={{ textDecoration: 'none' }}
            >
                <Card className={classes.card} >
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt={ data.title.en }
                        className={classes.media}
                        height="140"
                        image={ data.img }
                        title={ data.title.en }
                        />
                        <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            { data.title.en }
                        </Typography>
                        <Typography component="p">
                            { data.desc.en }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        );
    }

    render() {
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <div className={classes.landingContainer}>
                    <Typography className={classes.subheader} variant="h6" color="inherit">
                    Hong Kong ATM Locator
                        <Divider className={classes.divider}/>
                    </Typography>

                   <div>
                    { this.renderCard('hsbc') }
                    { this.renderCard('hangseng') }
                    { this.renderCard('jetco') }
                   </div>
                </div>
            </React.Fragment>
        );
    }
}

ATMNetworkContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
       toggleMapView: state.page.toggle_map_view
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMNetworkContainer));