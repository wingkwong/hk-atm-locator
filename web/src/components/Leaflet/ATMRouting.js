
import { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class ATMRouting extends Component {
  static propTypes = {
    map: PropTypes.object,
    from: PropTypes.array,
    to: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.initializeRouting = this.initializeRouting.bind(this);
    this.destroyRouting = this.destroyRouting.bind(this);
  }

  componentDidUpdate() {
    this.initializeRouting();
    if(this.routing) {
      this.routing.spliceWaypoints(0, 1, this.props.from);
      this.routing.spliceWaypoints(this.routing.getWaypoints().length - 1, 1, this.props.to);
    }
  }

  componentWillUnmount() {
    this.destroyRouting();
  }

  initializeRouting() {
    const { map, from, to } = this.props;
    if (map && !this.routing) {
      const plan = new L.Routing.Plan([
        L.latLng(from),
        L.latLng(to)
      ], {
        routeWhileDragging: false,
        collapsible: true
      });

      this.routing = L.Routing.control({
        routeWhileDragging: true,
        // urlParameters: { vehicle: 'foot' }, //TODO: 
        plan,
        lineOptions: {    
          styles: 
              [
                  {color: 'black', opacity: 0.15, weight: 9}, //sombra
                  {color: 'white', opacity: 0.8, weight: 6}, // Contorno
                  {color: 'red', opacity: 1, weight: 4} // Centro
                ] 
          }, 
      });
      this.props.map.leafletElement.addControl(this.routing);
    }
  }

  destroyRouting() {
    if (this.props.map) {
      this.props.map.leafletElement.removeControl(this.routing);
    }
  }

  render() {
    return null;
  }
}

export default withLeaflet(ATMRouting);