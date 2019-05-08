import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const styles = {
    landingContainer: {
        textAlign: 'center',
        paddingTop: '25px'
    },
    card: {
        maxWidth: 345,
        display: 'inline-flex',
        margin: 20
    },
    media: {
        objectFit: 'contain',
    },
};

const hsbc = {
    img: '/hsbc.png',
    title: {
        en: 'HSBC',
        tc: ''
    },
    desc: {
        en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tc: ''
    }
};

const hengsang = {
    img: '/hang_seng.png',
    title: {
        en: 'Hang Seng',
        tc: ''
    },
    desc: {
        en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tc: ''
    }
};

const jetco = {
    img: '/jetco.png',
    title: {
        en: 'Jetco',
        tc: ''
    },
    desc: {
        en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tc: ''
    }
};

class ATMLandingContainer extends Component{
    constructor(props) {
        super(props);
        
    }

    renderCard = (network) => {
        const { classes } = this.props;
        var data = null;

        if(network == 'hsbc') {
            data = hsbc;
        }

        if(network == 'hengsang') {
            data = hengsang;
        }

        if(network == 'jetco') {
            data = jetco;
        }

        if(data == null) {
            return (null);
        }

        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={ data.img }
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { data.title.en }
                    </Typography>
                    <Typography component="p">
                        { data.desc.en }
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.landingContainer}>
                { this.renderCard('hsbc') }
                { this.renderCard('hengsang') }
                { this.renderCard('jetco') }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMLandingContainer));