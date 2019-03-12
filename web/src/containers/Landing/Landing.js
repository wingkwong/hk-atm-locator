import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component{
    render() {
        return (
            <div>
                Hello World!
            </div>
        )
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
  

export default connect(mapStateToProps, mapDispatchToProps)(Landing);