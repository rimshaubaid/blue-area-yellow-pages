import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ViewModal from "../Modal/viewModal";
import Button from "react-bootstrap/Button";
function FilterByLoc() {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [isshow, setShow] = useState(false);
  const [names, setName] = useState(null);
  const [categories, setCategory] = useState(null);
  const [emails, setEmail] = useState(null);
  const [latPoint, setlatPoint] = useState(null);
  const [lngPoint, setlngPoint] = useState(null);
  const [time, setTime] = useState(null);
  const [phones, setPhone] = useState(null);
  const [loc, setLoc] = useState(null);
  const [dels, setDel] = useState(null);
  const [img, setImage] = useState(null);
  const [addresses,setAddress] = useState(null);
  //for viewing here
  var lengths;
  const [images, setImg] = useState(null);
  const [data, setData] = useState(null);
  var locc = location.state.detail;
  var type = location.state.type;

  React.useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/businesses/filterByLocation/${locc}/${type}`,
    })
      .catch((error) => {
        console.log(error.response.data);
      })
      .then((response) => {
        setData(response.data);

        lengths = response.data.length;
      });
  }, []);

  return (
    <div>
      <ViewModal
        show={isshow}
        closeModal={() => setShow(false)}
        id={id}
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
      <h2 style={{ textAlign: "center" }}>FILTERED SEARCH</h2>
      {data ? (
        <Row
          style={{
            paddingTop: "5%",
            paddingRight: "10%",
            paddingLeft: "10%",
          }}
          xs={1}
          md={2}
          className="g-4"
        >
          {data &&
            Array.from({ length: data.length }).map((key, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Body className="btn">
                    <div style={{ marginRight: "0" }} className="row">
                      <div className="col-md-6 col-xs-6">
                        <Card.Img
                          style={{ width: "200px", height: "180px" }}
                          variant="top"
                          src={`http://localhost:5000/${data[idx]?.businessImage}`}
                          alt="img"
                        />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-5 col-xs-3">
                        <Card.Title>
                          <h3>{data[idx]?.name}</h3>
                        </Card.Title>
                        <Card.Text>
                          {data[idx]?.type}
                          <br />
                          {data[idx]?.location}
                        </Card.Text>
                        <Button
                          onClick={() => {
                            setId(data[idx]?.id);
                            setImage(data[idx]?.businessImage);
                            setDel(data[idx]?.delivery);
                            setLoc(data[idx]?.location);
                            setTime(data[idx]?.timings);
                            setPhone(data[idx]?.phone);
                            setName(data[idx]?.name);
                            setCategory(data[idx]?.type);
                            setlatPoint(data[idx]?.latitude);
                            setlngPoint(data[idx]?.longitude);
                            setEmail(data[idx]?.email);
                            setAddress(data[idx]?.address);
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
      ) : (
        "nothing to show"
      )}
    </div>
  );
}

export default FilterByLoc;
