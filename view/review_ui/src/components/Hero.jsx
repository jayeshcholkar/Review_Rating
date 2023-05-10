import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { GoLocation } from "react-icons/go";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import AddCompany from "./AddCompany";
import Load from "./Loading";

 function Hero() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem("user");
  const listApiCall = () => {
    axios
      .get(`http://localhost:9000/companylist?sorting=${sort}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.userDetails.userName)
        );
        localStorage.setItem("userPic", response.data.userDetails.profilePic);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        navigate("/"); //If token get expire it will redirect to login
      });
  };
  const ascending = () => {
  setSort("ascending")
  }

const descending = () =>{ 
  setSort('descending')
  }

  useEffect(() => {
    listApiCall();
  }, [search, sort]);


  return (
    <>
      {loading ? <Load/> : (
        <div className="bg-gray-100/50">
          <Navbar />
          <div className="p-10 flex items-center justify-center ">
            <AddCompany
              listApiCall={listApiCall}
              open={open}
              setOpen={setOpen}
            />
            <div className="">
              <p className="mb-1 text-sm text-gray-600 ml-1">Select City</p>
              <div className="flex mb-10 justify-between items-center gap-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter Location"
                  type="text"
                  className="border border-gray-300 outline-none p-1 rounded-md px-10 max-sm:px-2 relative"
                />
                <GoLocation className="text-2xl text-gray-700 hidden md:flex cursor-pointer absolute ml-[230px]" />
                <div>
                  <button onClick={() => listApiCall()} className=" hidden md:flex max-sm:ml-10 md:mr-80 max-sm:text-sm max-sm:font-normal p-1 px-4 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Find Company
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="md:ml-5 max-sm:text-sm max-sm:font-normal p-1 px-4 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    + Add Company
                  </button>
                </div>
                <div> {
                  sort == 'descending' ? <AiOutlineSortAscending onClick={ascending} className="text-2xl cursor-pointer" /> :  
                  <AiOutlineSortDescending onClick={descending} className="text-2xl cursor-pointer" />
                }
                </div>
              </div>
              <ul role="list" className="space-y-6">
                {data?.map((company) => (
                  <div key={company._id}>
                    <Link to={`/companyreview/${company._id}`}>
                      <li className="flex w-[60rem] max-sm:w-[23rem] justify-between items-start py-10 shadow-lg p-10 max-sm:p-2 rounded-md bg-white">
                        <div className="mr-10 h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                          <img
                            src={company?.companyPic}
                            // alt={product.imageAlt}
                            className="h-full w-full object-cover object-center rounded-md"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <p className="text-sm text-gray-500">
                            Founded On : {company.foundedOn}
                          </p>
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a>{company.companyName}</a>
                              </h3>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <GoLocation />
                              <p className="">{company.companyLocation}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 gap-4 text-sm">
                            <p className="text-gray-500">
                              City : {company.companyCity}
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                              >
                                45 Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Hero ;
