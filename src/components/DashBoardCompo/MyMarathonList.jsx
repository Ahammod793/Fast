import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import "../../index.css";
import Swal from "sweetalert2";
export default function MyMarathonList() {
  const { user } = useContext(AuthContext);
  const [marathonData, setMarathonData] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [marathonId, setMarathonId] = useState(null);

  useEffect(() => {
    if (!user || !user.email) return;
    fetch(`http://localhost:5000/my-marathon?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMarathonData(data);
      });
  }, [user?.email]);

  const deleteMarathon = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cann't restore it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/delete-marathon/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your campaign has been deleted.",
                icon: "success",
              }).then(navigate("/"));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const getMerathon = (id) => {
    setIsOpen(true);
    setMarathonId(id);
  };

  const Marathon = marathonData.filter(
    (marathon) => marathon._id == marathonId
  );

  const marathonRef = useRef();
  const updateHunlder = (e) => {
    e.preventDefault();
    const form = marathonRef.current;
    const marathonTitle = form.MarathonTitle.value;
    const startDate = form.MarathonStartDate.value;
    const endDate = form.MarathonEndDate.value;
    const marathonDate = form.MarathonDate.value;
    const details = form.Details.value;
    const file = form.thumbnail.value;
    const UpdateMarathon = {
      marathonTitle,
      startDate,
      endDate,
      marathonDate,
      details,
      file,
    };
    fetch(`http://localhost:5000/update-marathon/${marathonId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(UpdateMarathon),
    }).then(res => res.json()).then(data => {
       
      setIsOpen(false)
      navigate(0);
    })
  };

  return (
    <div className="flex flex-col items-center  my-6 md:mx-16 mx-1  border-l pl-2 md:pl-6  border-primary  min-h-screen text-primary">
      <table className="text-primary  w-full">
        <tr className="odd:bg-green-600  text-sm md:text-xl font-bold">
          <th className="hidden md:table-cell   text-center p-2 border w-[3/30]">
            Si.
          </th>
          <th className="text-center hidden md:table-cell p-1 md:p-2 border text-sm md:text-xl w-[5/30]">
            Thumb
          </th>
          <th className="text-start   p-1 md:pl-4 text-sm md:text-xl border w-[14/30]">
            Title
          </th>
          <th className="text-center p-1  md:p-2 text-sm md:text-xl border w-[4/30]">
            Marathon date
          </th>
          <th className="text-center p-1  md:p-2 text-sm md:text-xl border w-[4/30]">
            Update
          </th>
          <th className="text-center p-1  md:p-2 text-sm md:text-xl border w-[4/30]">
            Delete
          </th>
        </tr>
        {
          marathonData.length>0 ? (
        marathonData.map((marathon, index) => (
          <tr className="even:bg-card  border-b border-primary" key={index}>
            <td className="p-2 items-center justify-center text-center hidden md:table-cell">
              {index + 1}
            </td>
            <td className="hidden md:table-cell ">
              <img src={marathon.thumbnail} alt="" className="w-full  h-12" />
            </td>
            <td className="md:pl-4 px-1    md:text-xl text-sm">
              {marathon.Title}
            </td>
            <td className="md:p-2 p-1 border-x  text-center md:text-xl text-sm"> 
              {marathon.marathonDate.split("T")[0]}
            </td>
            <td className="md:p-2 p-1   items-center text-center ">
              <button
                onClick={() => getMerathon(marathon._id)}
                className="   rounded-md text-sm px-5   text-center  md:w-full w-10/12 h-3/4 md:h-full hover:underline btn  bg-base-300 cursor-pointer"
              >
                Update
              </button>
            </td>
            <td className="md:p-2 p-1   items-center text-center ">
              <button
                className="w-full px-5 rounded-md h-full hover:underline btn  text-sm bg-base-300 cursor-pointer "
                onClick={() => deleteMarathon(marathon._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ): <div className="text-xl font-bold">you naver added marathon</div>
      }
      </table>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-1 md:p-4 md:w-full w-11/12 md:h-auto  max-w-3xl bg-card rounded-lg shadow-lg bg-card">
            <div className="flex items-center justify-between p-1 md:p-4 border-b  ">
              <h3 className="text-xl font-semibold text-primary ">
                Sign in to our platform
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black bg-transparent hover:bg-gray-500 hover:text-white border rounded-lg text-sm w-8 h-8"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <form className="md:space-y-4 space-y-0" ref={marathonRef}>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-1 md:gap-6">
                  <div>
                    <label className="block md:mb-2 mb-1 text-sm font-medium text-primary ">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={Marathon[0].Title}
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                      name="MarathonTitle"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary ">
                      Registration start Date
                    </label>
                    <input
                      type="datetime-local"
                      defaultValue={Marathon[0].startDate.slice(0, 16)}
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                      name="MarathonStartDate"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary ">
                      Registration End Date
                    </label>
                    <input
                      type="datetime-local"
                      defaultValue={Marathon[0].endDate.slice(0, 16)}
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                      name="MarathonEndDate"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary ">
                      Marathon Date
                    </label>
                    <input
                      type="datetime-local"
                      defaultValue={Marathon[0].marathonDate.slice(0, 16)}
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                      name="MarathonDate"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="details"
                      className="block mb-2 text-sm font-medium text-primary "
                    >
                      Details
                    </label>
                    <textarea
                      name="Details"
                      id="details"
                      defaultValue={Marathon[0].Details}
                      className="w-full h-32 bg-card border border-primary text-primary rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="thumb"
                      className="block mb-2 text-sm font-medium text-primary "
                    >
                      Thumbnail
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      id="thumb"
                      defaultValue={Marathon[0].thumbnail}
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                    ></input>
                  </div>
                </div>
                <div className="flex justify-between"></div>
                <button
                  type="submit"
                  onClick={ updateHunlder}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 my-1 py-2.5"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
