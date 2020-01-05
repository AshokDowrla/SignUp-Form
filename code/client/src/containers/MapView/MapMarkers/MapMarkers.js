import React from 'react'
import { Marker, Popup } from "react-map-gl"
import styles from "./MapMarkers.module.scss"
import Logo from "../../../images/location"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
class MapMarkers extends React.Component {
    state = {
        highlight: false
    }
    render() {
        const { id, location, name, img,marker, desc } = this.props.place
          const color = (marker==='Green') ? "#5FE755" : (marker==='Blue') ? "#3F93EE" : "#EE4F3F"
        return (
            <div>
                <Marker
                    key={id}
                    latitude={location.lat}
                    longitude={location.lng}
                >

                    <span
                        className={styles.markerbtn}
                        onClick={(e) => {
                            e.preventDefault()

                            this.setState({
                                highlight: !this.state.highlight
                            })
                        }}
                    >
                        <Logo color={color} />

                    </span>
                </Marker>

                {this.state.highlight ? (<Popup
                    latitude={location.lat}
                    longitude={location.lng}
                    onClose={() => {
                        this.setState({
                            highlight: false
                        })
                    }}
                >
                    <div>
                        <Card className={styles.popup}>
                        <CardTitle className={styles.title}>{name}</CardTitle>
                            <CardBody>
                                <img alt={name} src={img} height="80px" width="110px" />
                                
                            </CardBody>

                        </Card>
                        <CardText>{desc}</CardText>
                    </div>
                </Popup>

                ) : null

                }
            </div>
        )
    }
}


export default MapMarkers