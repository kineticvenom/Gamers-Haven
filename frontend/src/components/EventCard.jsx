import axios from "axios"
import { Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

function EventCard(props) {

    function submitJoin(event) {
        event.preventDefault();
        axios.put('/event/update', {
            'event_id': props.id
        })
        .then((response) => {
        window.location.reload()

    })
    }
    

    return (
        <div className="post_box">
            <h3 style={{textAlign:'center'}}>{ props.title}</h3> <hr/>
            <Row className="EventCard">
                <Col lg='3' style={{textAlign:'center'}}>
                    <h3>{props.activity}</h3>
                    <img src={props.activity_image} height='180px' width='180px'></img> 
                    </Col>
                <Col lg='6'>
                    <div>
                    <h4>{props.where}</h4><br/>
                    <h5>Starts at : {props.start}  </h5>
                    {props.end && <h5>Ends at: {props.end}  </h5>}
                    <br />
                    {props.related_links &&<span> <a target="_blank" href={props.related_links}>{props.related_links}</a><br/></span>}
                    
                        <p>Posted By :<span style={{ fontSize:'1.2rem'}}> {props.user_id }      {props.host_contact} <p>Posted On : {props.date_posted}</p></span> </p>
                </div></Col>
                <Col lg='3' style={{alignSelf:'start', }}>
                    <h4 style={{textAlign:'center'}}>Participants</h4><hr />
                    {props.interested_users? props.interested_users.map((user) => (<img title={user[1]} height='30px' width='30px' src={user[0]}/>)):''}
                    

                </Col>
                <button style={{ maxWidth:'300px'}} onClick={submitJoin} >Join</button>
            </Row>
        </div>
    )
}
    export default EventCard