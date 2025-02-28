import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function AddMarathon() {
  const [inputErr, setInputErr] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [marathonDate, setMarathonDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  const [totalReg, setTotalReg] = useState(0)

  const marathonRefference = useRef();

  const inputImage = (e) => {
    const thumb = e.target.value;
    setImageURL(thumb);
    console.log(imageURL);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const submitMarathon = (e) => {
    e.preventDefault();
    const form = marathonRefference.current;
    const marathonTitle = form.marathonTitle.value;
    const location = form.heldLocation.value;
    const details = form.marathonDetails.value;
    const file = form.file.value;
    const CurrentDate = currentTime.split("T")[0];
    const CurrentTime = new Date().toLocaleTimeString(); 
    const addMarathon = {
      marathonTitle,
      startDate,
      endDate,
      marathonDate,
      CurrentDate,
      CurrentTime,
      location,
      details,
      file, totalReg ,
    };
    console.log(addMarathon)
    if (!marathonTitle) {
      return setInputErr("Input Title");
    } else if (!startDate) {
      return setInputErr("Input marathon Reg. Start Date");
    } else if (!endTime) {
      return setInputErr("Input marathon Reg. End Date");
    } else if (!marathonDate) {
      return setInputErr("Input marathon held Date");
    } else if (!location) {
      return setInputErr("Input Location");
    } else if (!details) {
      return setInputErr("Input details");
    } else if (!file) {
      return setInputErr("Input Thumbnail");
    } else {
      fetch(`http://localhost:5000/addMarathon`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addMarathon),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: "success",
            text: "Ok",
            icon: "success",
          }).then(form.reset(), navigate("/my-marathon"));
        });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center my-6 mx-16  border-l pl-6 border-primary  min-h-screen text-primary">
      <form
        className=" my-8 w-full"
        ref={marathonRefference}
        onChange={() => setInputErr(null)}
      >
        <label className=" text-left items-center font-medium">
          Title <br />
          <input
            type="text"
            placeholder="Marathon Title"
            name="marathonTitle"
            className="  h-10 border border-primary bg-card rounded  w-full mt-1 mb-5 p-4  text-secondary"
          />
        </label>
        <div className="grid grid-cols-2 justify-between items-start my-4">
          <div className="mb-3">
            <h3 className="font-medium pb-1 ">Registration Start </h3>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              className="border border-primary bg-card h-10 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-medium pb-1 ">Registration End</h2>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              className="border border-primary bg-card h-10 p-2 rounded"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="font-medium pb-1">Marathon Start Date</h2>

          <DatePicker
            selected={marathonDate}
            onChange={(date) => setMarathonDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            className="border border-primary bg-card h-10 p-2 rounded"
          />
        </div>
        <div className="flex text-primary gap-14 my-6">
          <h2 className="flex flex-row items-center justify-center font-medium pb-1 ">
            <IoLocationOutline className="mr-2 " /> Location
          </h2>
          <input
            type="text"
            placeholder="Dhaka"
            name="heldLocation"
            className="border border-primary bg-card h-10 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-left items-center mb-1">
            Running Distence
          </h3>
          <label className="flex flex-col">
            <select
              name="campaignType"
              id="campaignType"
              className="border border-primary bg-card h-10 p-2 rounded"
            >
              <option value="5Km" defaultValue>5 Km</option>
              <option value="10Km">10 Km</option>
              <option value="15Km">15 Km</option>
              <option value="20Km">20 Km</option>
            </select>
          </label>
        </div>

        <div className="w-full mt-2 mb-2">
          <h2 className="font-medium text-left items-center p-1">details</h2>
          <textarea
            placeholder="Write something to the odience"
            name="marathonDetails"
            className="p-2 w-full h-[200px] bg-card text-lg font-light border border-primary text-secondary"
          ></textarea>
        </div>

        <div className="flex flex-col my-5 shadow-2xl">
          <h2 className="font-medium text-left items-center p-1">
            Image or Thumbnail
          </h2>
          <div className="shadow p-3 items-center justify-center w-full h-auto  border border-secondary">
            <input
              type="url"
              placeholder="Thumbnail URL"
              name="file"
              onChange={inputImage}
              className="p-1 text-start  items-center bg-card justify-center w-full"
            />
            {imageURL && (
              <div className="w-full h-[90%]">
                <img
                  src={imageURL}
                  alt="not found"
                  className="w-full h-[400px] mt-5 border border-secondary"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex text-primary">
          <h2>Created At</h2>
          <p name="marathonCreationDate">
            {" "}
            <span name="DayMonYear">{currentTime.split("T")[0]}</span>{" "}
            <span name="hourMinSec">{new Date().toLocaleTimeString()}</span>{" "}
          </p>
        </div>
        <div className="flex flex-col  gap-2">
          <h2 className="font-medium  text-left items-center p-1">
            Total Reg. Count: <p name="totalReg">{totalReg}</p>
          </h2>
        </div>
        <div className="items-center justify-center">
          <h4 className="font-light text-red-600">{inputErr}</h4>
        </div>
      </form>
      <div className="flex items-end justify-end w-6/12 gap-6">
        <button
          className="btn btn-outline  text-secondary "
          onClick={submitMarathon}
        >
          Submit
        </button>
        <button
          className="btn btn-outline"
          onClick={() => {
            marathonRefference.current.reset();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
