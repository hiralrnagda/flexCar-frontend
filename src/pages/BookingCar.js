import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Divider } from "antd";
import { getAllCars } from "../redux/actions/carsActions";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
function BookingCar() {
  const { carID } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carID));
    }
  }, [cars]);
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider dashed type="horizontal">
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour}$ per hour</p>
            <p>Fuel Type:{car.fuelType}</p>
            <p>Max persons: {car.capacity}</p>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
