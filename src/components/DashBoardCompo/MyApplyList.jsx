import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from "../Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function MyApplyList() {
  const [Data, setData] = useState( );
  const { user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [applicationID, setApplicationID] = useState(null);
  const [applicationData, setApplicationData] = useState([]);
  const [searchM, setSearchM] = useState(null)
  const navigate = useNavigate()
  // console.log(user);
  // load data from database to show a table
  useEffect(() => {
    if (!user?.email) return;
    const url = `http://localhost:5000/marathons/?email=${user.email}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setIsLoaded(true);
      });
  }, [user?.email]);

  // load the application data to update them  as needed

  useEffect(() => {
    fetch(`http://localhost:5000/my-application/${applicationID}`)
      .then((res) => res.json())
      .then((data) => {
       
        setApplicationData(data);
        setIsLoaded(true);
      });
  }, [applicationID]);

  const editApplication = (id) => {
    setApplicationID(id);
    setIsOpen(true);
  };

  const applicationRef = useRef();
  const saveEdit = (e) => {
    e.preventDefault();
    const application = applicationRef.current;
    const Name = application.name.value;
    const Phone = application.phone.value;
    const Gender = application.gender.value;
    const Blood = application.blood.value;

    fetch(`http://localhost:5000/my-applicatio-update/${applicationID}`, {
      method: "PATCH",
    headers :{ "content-type": "application/json" },
      body: JSON.stringify({ Name, Phone, Gender, Blood })
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
                    title: "success",
                    text: "Ok",
                    icon: "success",
                  }).then(application.reset(), navigate('/dashboard'));
                });
              
      }
    
  
  // please remember that  id is a feild_Id saved in the myApplicationCollection database.
  const deleteApplication = (id) => {
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
        fetch(`http://localhost:5000/my-application/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, " from application-delete");
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your campaign has been deleted.",
                icon: "success",
              }).then(navigate("/"));
            }
          });
      }
    });
  }; 
  

  const applicationHundler=(e)=>{
    const targetInput = (e.target.value) ;
      let url = `http://localhost:5000/marathons/?email=${user.email}`
      if(targetInput){
        url += `&title=${encodeURIComponent(targetInput)}`
      } 
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          // console.log(url)
          setData(data);
          setIsLoaded(true);
        });
   
  }
  return (
    <div className="flex flex-col   my-6 md:mx-16 mx-1 border-l pl-2 md:pl-6  border-primary  min-h-screen text-primary">
      <div className="flex items-end justify-end mb-2">
       <form className=" border border-purple-600 flex flex-row justify-center items-center gap-2 focus-within:border-green-400"><FaSearch className="relative left-2 text-slate-400"/> <input type='search' onChange={applicationHundler} name="searchInput" placeholder="search application" className="bg-inherit p-2 text-primary bg-primary outline-none   "/></form>
      </div>
      <table className="w-full items-center">
        <tr className="text-sm md:text-xl font-bold w-full   ">
          <th className="hidden md:flex text-center p-2 border w-[1/10] ">
            Si.
          </th>
          <th className="text-center p-1 md:p-2 border text-sm md:text-xl w-[3/10]">
            Thumb
          </th>
          <th className="text-start  p-1 md:pl-4 text-sm md:text-xl border w-[4/10]">
            Title
          </th>
          <th className="text-center p-1  md:p-2 text-sm md:text-xl border w-[2/10]">
            Action
          </th>
        </tr>
        {isLoaded ? (
         Data.length>0 ? ( 
          Data.map((d, n) => (
            <tr className="border    " key={n}>
              <td className=" hidden md:block p-2 items-center justify-center text-center ">
                {n + 1}.
              </td>
              <td className="md:pl-4 pl-1    md:text-xl text-sm">
                <img src={d.thumbnail} alt="" className="w-full h-24 md:h-36" />
              </td>

              <td className="md:px-4 pl-1    md:text-xl text-sm border-x border-primary">
                {d.Title}
              </td>
              <td className="flex flex-row  items-center justify-center gap-3 mt-4 md:mt-8 p-5">
                <button
                  onClick={() => editApplication(d._id)}
                  title="Edit Application"
                  className="p-2 border border-primary text-lime-700 hover:rounded-lg hover:bg-green-500 hover:text-white"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteApplication(d._id)}
                  title="Delete Application"
                  className="p-2 border border-primary text-red-700 hover:rounded-lg hover:bg-pink-600 hover:text-white"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))
         ) : <div className=" flex absolute justify-center items-center  top-2/4 text-3xl font-bold ">Not Found Application</div>
        ) : (
          <div className="flex flex-row items-center justify-center ">
            <Loading />
          </div>
        )}
      </table>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-11/12 md:w-full max-w-3xl bg-card rounded-lg shadow-lg bg-card">
            <div className="flex items-center justify-between p-4 border-b  ">
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
              <form className="space-y-4" ref={applicationRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-primary "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className=" bg-card border border-primary text-primary text-sm rounded-md block w-full p-2.5"
                      name="name"
                      id="name"
                      defaultValue={applicationData.Name}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-primary "
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      id="phone"
                      placeholder=" +880 19456 98802"
                      className="w-full p-2 bg-card border border-primary text-primary rounded-md"
                      defaultValue={applicationData.Phone}
                    />
                  </div>
                  <div className=" flex flex-row items-baseline justify-start gap-4">
                    <label className="font-bold text-xl">Gender</label>

                    <label htmlFor="male" className="font-light text-xl ">
                      Male{" "}
                      <input
                        className="  border-white text-white "
                        type="radio"
                        name="gender"
                        defaultChecked={applicationData.Gender === "male"}
                        id="male"
                        value="male"
                      />
                    </label>

                    <label htmlFor="famale" className="font-light text-xl  ">
                      Female{" "}
                      <input
                        className="text-white"
                        type="radio"
                        name="gender"
                        id="famale"
                        defaultChecked={applicationData.Gender === "female"}
                        value="female"
                      />
                    </label>
                  </div>
                  <div className="flex flex-row items-baseline justify-start">
                    <label className="font-bold text-xl" htmlFor="bloodGroup">
                      Blood
                    </label>
                    <select
                      name="blood"
                      id="bloodGroup" defaultValue={applicationData.Blood} 
                      className="bg-card ml-4 border border-primary"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between"></div>
                <button
                  type="submit"
                  onClick={saveEdit}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5"
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
