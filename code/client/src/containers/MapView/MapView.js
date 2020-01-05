import React, { Component } from 'react'
import { Container, Card, CardTitle, CardBody, Row, Col } from 'reactstrap'
import styles from "./MapView.module.scss"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { getMarkers, filterMarkers } from "../../store/actions/mapActions"
import ReactMapGl from "react-map-gl"

import MapMarkers from "./MapMarkers/MapMarkers"

class MapView extends Component {


    state = {
        latitude: 17.385044,
        longitude: 78.486671,
        width: "100vw",
        height: "100vh",
        zoom: 10,
        highlight: false,
        
    }

    setViewPort = (viewPort) => {

        //console.log(viewPort)

        this.setState({
            latitude: viewPort.latitude,
            longitude: viewPort.longitude,

        })
    }

    filterMarker=(color) =>{
       
       this.props.filterMarkers(color)
    }
    componentDidMount() {

        this.props.getMarkers()
        
    }
    render() {

        const { localMarkers } = this.props.map
        const markers = (localMarkers) ? (
         localMarkers.map(place => (
                <MapMarkers place={place} key={place.id} />
            ))
        ) : null
        
        return (
            <React.Fragment>
                <Container>

                    <Card>

                        <CardBody>
                            <CardTitle >Filter by</CardTitle>

                            <Row className="ml-auto">
                                <Col md="2" onClick={()=>this.filterMarker('Green')} >
                                   <span  className={styles.green}>Green</span>
                                </Col>
                                <Col md="2" onClick={()=>this.filterMarker('Blue')} >
                                <span  className={styles.blue}>Blue</span>
                                </Col>
                                <Col md="2" onClick={()=>this.filterMarker('Red')}>
                                <span  className={styles.red}>Red</span>
                                </Col>
                                <Col md="2" onClick={()=>this.props.getMarkers()}>
                                <span className={styles.default} >Default</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
                <div className={styles.Container}>

                    <ReactMapGl {...this.state} mapboxApiAccessToken={your-mapbox-toke}


                        mapStyle="mapbox://styles/ashokmapbox/ck4zzb45d10721dqgildb4vju"

                        onViewportChange={viewPort => this.setViewPort(viewPort)}

                    >

                        {markers}



                    </ReactMapGl>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {

        map: state.map

    }
}

const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ getMarkers, filterMarkers }, dispatch)
}


export default connect(mapStateToProps, mapDispatchProps)(MapView)