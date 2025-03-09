import React, { use, useContext, useRef } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import joinAnim from "../../assets/Animation - 1740924354339.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
export default function MarathonRegistration() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { Title, _id, marathonDate } = data;
  const { user } = useContext(AuthContext);
  const formRef = useRef();

  const marathonRegistration = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const Fname = form.fname.value;
    const Lname = form.lname.value;
    const Name = Fname + " " + Lname;
    const Phone = form.phone.value;
    const Gender = form.gender.value;
    const Blood = form.blood_group.value;
    const applyTime = new Date();

    const applicationDetails = {
      Email: user.email,
      field_Id: _id,
      submitionTime: applyTime,
      Name,
      Phone,
      Gender,
      Blood,
    };
    fetch(`https://fast-backend-two.vercel.app/apply-marathon`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(applicationDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "success",
          text: "Register Success",
          icon: "success",
        }).then(navigate(`/dashboard/my-apply-list`));
      });
  };
  return (
    <div className="  mx-auto w-11/12">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="w-full">
          <Lottie
            className="w-full lg:h-84 md:64 sm:44"
            animationData={joinAnim}
            loop={true}
          />
        </div>
        <form
          ref={formRef}
          action=""
          className=" grid grid-cols-1 md:grid-cols-2 border p-8 shadow-md hover:shadow-2xl bg-card gap-3"
        >
          <div className="border-b border-primary">
            <h1 className="font-bold text-xl">
              Title:{" "}
              <span className="font-extralight text-lg text">{Title}</span>
            </h1>
          </div>
          <div className="text-start font-bold text-xl">
            Start Date:{" "}
            <span className="text-xl font-extralight">
              {marathonDate.split("T")[0]}
            </span>
          </div>
          <div className=" flex flex-row items-baseline justify-start">
            <label className="font-bold text-xl" htmlFor="Fname">
              Fname
            </label>
            <input
              className="bg-card ml-4 border border-black px-2 py-1 w-full  "
              type="text"
              name="fname"
              id="Fname"
              required
              defaultValue={
                user.displayName.split(" ").length >= 3
                  ? user.displayName.split(" ")[1]
                  : user.displayName.split(" ") >= 2
                  ? user.displayName.split(" ")[0]
                  : user.displayName
              }
            />
          </div>
          <div className=" flex flex-row items-baseline justify-start">
            <label className="font-bold text-xl " htmlFor="Lname">
              Lname
            </label>
            <input
              className="bg-card ml-4 border border-black px-2 py-1 w-full  "
              type="text"
              name="lname"
              id="Lname"
              required
              defaultValue={
                user.displayName.split(" ").length >= 3
                  ? user.displayName.split(" ")[2]
                  : user.displayName.split(" ") >= 2
                  ? user.displayName.split(" ")[1]
                  : user.displayName
              }
            />
          </div>
          <div className="flex flex-row items-baseline justify-start">
            <label
              className="font-bold text-xl items-baseline justify-start "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-card ml-4 border border-black px-2 py-1 w-full "
              id="email"
              defaultValue={user?.email}
            />
          </div>

          <div className=" flex flex-row items-baseline justify-start">
            <label className="font-bold text-xl" htmlFor="phone">
              Phone
            </label>
            <input
              className="bg-card ml-4 border border-black px-2 py-1 w-full  "
              type="number"
              name="phone"
              id="phone"
              required
              placeholder="+880 19456 98802"
            />
          </div>
          <div className=" flex flex-row items-baseline justify-start gap-4">
            <label className="font-bold text-xl">Gender</label>

            <label htmlFor="male" className="font-light text-xl ">
              Male{" "}
              <input
                className="bg-card  border border-black "
                type="radio"
                name="gender"
                defaultChecked
                id="male"
                value="male"
              />
            </label>

            <label htmlFor="famale" className="font-light text-xl  ">
              Famale{" "}
              <input
                className="bg-card  border border-black"
                type="radio"
                name="gender"
                id="famale"
                value="female"
              />
            </label>
          </div>

          <div className="flex flex-row items-baseline justify-start">
            <label className="font-bold text-xl" htmlFor="bloodGroup">
              Blood
            </label>
            <select
              name="blood_group"
              id="bloodGroup"
              className="bg-card ml-4 border border-primary"
            >
              <option value="A+" defaultValue>
                A+
              </option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <button
            className="text-center  hover:btn-outline  items-center col-span-1 md:col-span-2 bg-slate-400 py-2 mt-3"
            onClick={marathonRegistration}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
