import React,{Component} from 'react';
import GoogleMapReact from 'google-map-react';

const Markers = ({text}) => <div>
    <img src="https://img.icons8.com/color/48/000000/marker--v1.png" alt=""/>
    {text}
  </div>;

class SimpleMap extends Component {
    static defaultProps = {
        center:{
            lat:33.73133,
            lng:73.0619
        },
        zoom:14
    };

    render(){
        return(
            <div style={{height:'100vh',width:'100%'}}>
                <GoogleMapReact bootstrapURLKeys={{key:'AIzaSyBOShbHv0epExETfJMQhPDJbd9WQU5HW70'}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom} >
                    <Markers lat={33.7202} lng={73.0734} text="Khokha Khola" />
                    <Markers lat={33.7202} lng={73.0738} text="Asian Wok" />
                    <Markers lat={33.7092469} lng={73.0567322} text="Shah g foods blue area" />
                    <Markers lat={33.7294} lng={73.0749} text="Chaaye Khana" />
                    <Markers lat={33.7355} lng={73.0782} text="Street 1 Cafe" />
                </GoogleMapReact>
            </div>
        )
    }
}

export default SimpleMap;