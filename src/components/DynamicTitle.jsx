import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();
  const [marathonTitle, setMarathonTitle] = useState( )
  const {id}= useParams()

  useEffect(() => {
    const titles = {
      "/": "Home | Fast",
      "/marathon": "Marathons | Fast",
      "/login": "Login | Fast",
      "/register": "Register | Fast",
      "/dashboard/add-marathon": "Add New | Fast",
      "/dashboard/my-marathon": "My Marathons | Fast",
      "/dashboard/my-apply-list": "My Applications | Fast",
    };

    // Special handling for Marathon Details
    if (location.pathname.startsWith("/marathon-details/")) {
      fetch(`http://localhost:5000/marathons/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.Title)
          setMarathonTitle(data.Title);  // Assuming API response has `Title`
          document.title = `${data.Title} | Fast`;
        })
        .catch((err) => {
          document.title = "Marathon Details | Fast"; // Fallback if fetch fails
        });
    }
    if(location.pathname.startsWith('/register-to-marathon/')){
        fetch(`http://localhost:5000/marathons/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.Title)
          setMarathonTitle(data.Title);  
          document.title = `Register ${data.Title} | Fast`;
        })
        .catch((err) => {
          document.title = "Marathon Details | Fast"; // Fallback if fetch fails
        });
    }
     else {
      document.title = titles[location.pathname] || "Fast";
    }

  }, [location, id]);
}
 
export default DynamicTitle ;