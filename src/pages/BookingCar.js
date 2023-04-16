import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Divider, DatePicker, Checkbox } from "antd";
import { getAllCars } from "../redux/actions/carsActions";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
const { RangePicker } = DatePicker;
function BookingCar() {
  const { carID } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carID));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + totalHours * 15);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0].$d).format("MMM Do YYYY, h:mm"));
    setTo(moment(values[1].$d).format("MMM Do YYYY, h:mm"));
    let a = moment(values[1].$d);
    let b = moment(values[0].$d);
    let duration = moment.duration(a.diff(b));
    setTotalHours(duration.asHours().toFixed());
  }

  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }
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

          <Divider dashed type="horizontal">
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY, HH:mm"
            onChange={selectTimeSlots}
          />
          <div>
            <p>
              Total Hours : <b>{totalHours}</b>
            </p>
            <p>
              Rent per hour : <b>{car.rentPerHour}</b>
            </p>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setDriver(true);
                } else {
                  setDriver(false);
                }
              }}
            >
              Driver Required
            </Checkbox>
            <h3>Total Amount : {totalAmount}</h3>
            <button className="btn1" onClick={bookNow}>
              Book Now
            </button>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
