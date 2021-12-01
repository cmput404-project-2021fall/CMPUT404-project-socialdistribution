import React,{Component} from 'react';
import { Container, Row, Col, Card, Alert, Image, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Avatar from "../images/avatar.jpg";

class FollowerItem extends Component{
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }
      
    render(){

        return(
            <Col md="auto">
                <div className="item">
                <Card className="m-1" style={{ width: '20rem', border:'groove', borderRadius:'1rem'}}>
                <Card.Body>
                    <Col md={6} className="d-flex">
                        <Image src={Avatar} className="m-0"
                        style={{ width: "6rem", height: "6rem" }}/>

                        <Row>
                        <div className="d-flex" style={{marginTop:"1rem"}}>
                        <Card.Title>{this.props.item.display_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">@{this.props.item.display_name}</Card.Subtitle>
                        </div>
                        <LinkContainer to={"/"}>
                        <div>
                        <Button className="m-1" style={{width:"10rem"}} variant="success" >View his posts</Button>
                        </div>
                        </LinkContainer>
                        </Row>
                    </Col>
                    
                </Card.Body>
                </Card>
                </div>
            </Col>
        )
    }
}

export default FollowerItem