import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory, Link } from "react-router-dom";
import ViewModal from "./Modal/viewModal";
import Button from "react-bootstrap/Button";
function CardElement(props) {
  //console.log("props for card element", props);
  const [ids, setId] = useState(null);
  const [isshow, setShow] = useState(false);
  const [names, setName] = useState(null);
  const [categories, setCategory] = useState(null);
  const [emails,setEmail]=useState(null);
  const [latPoint, setlatPoint] = useState(null);
  const [lngPoint, setlngPoint] = useState(null);
  const [time, setTime] = useState(null);
  const [phones, setPhone] = useState(null);
  const [loc, setLoc] = useState(null);
  const [dels, setDel] = useState(null);
  const [img, setImage] = useState(null);
  const [addresses,setAddress] = useState(null);
  const history = useHistory();

  var length1 = props.lengthh;
  return (
    <div>
      <ViewModal
        show={isshow}
        closeModal={() => setShow(false)}
        id={ids}
        image={img}
        del={dels}
        locations={loc}
        phone={phones}
        timing={time}
        name={names}
        category={categories}
        lats={latPoint}
        lngs={lngPoint}
        email={emails}
        address={addresses}
      />
      <Row
        style={{ paddingTop: "5%", paddingRight: "10%", paddingLeft: "10%" }}
        xs={1}
        md={2}
        className="g-4"
      >
       {Array.from({ length: length1 }).map((key, idx) => (
        props.names[idx] && <Col key={idx}>
            <Card>
              <Card.Body >
                <div style={{ marginRight: "0" }} className="row">
                  <div className="col-md-6 ">
                    <Card.Img
                      style={{ width: "200px", height: "180px" }}
                      variant="top"
                      src={`http://localhost:5000/${props.image[idx]}`}
                    />
                  </div>
                  <div className='col-md-1'></div>
                  <div className="col-md-5">
                    <Card.Title>
                      <h3>{props.names[idx]}</h3>
                    </Card.Title>
                    <Card.Text>
                      {props.category[idx]}
                      <br />
                      {props.location[idx]}
                    </Card.Text>
                    <Button
                      onClick={() => {
                        setId(props.id[idx]);
                        setImage(props.image[idx]);
                        setDel(props.del[idx]);
                        setLoc(props.location[idx]);
                        setTime(props.times[idx]);
                        setPhone(props.phone[idx]);
                        setName(props.names[idx]);
                        setCategory(props.category[idx]);
                        setlatPoint(props.latitude[idx]);
                        setlngPoint(props.longitude[idx]);
                        setEmail(props?.email[idx])
                        setAddress(props?.address[idx])
                        setShow(true);
                      }}
                      variant="primary"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardElement;
