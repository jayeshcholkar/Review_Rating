import axios from "axios";
import { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Footer from "./Footer";
import Load from "./Loading";
import Navbar from "./Navbar";
import Review from "./Review";

function CompanyDetails() {
  const token = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState();
  const [reviewData, setReviewData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const company = useParams();
  //   console.log(company.id); // For getting company_id from navLink

  const detailApiCall = async () => {
    await axios
      .get(`http://localhost:9000/company/details/${company.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        setCompanyData(response.data.company);
        setReviewData(response.data.review);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        navigate("/");
      });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    detailApiCall();
  }, []);

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <>
          <div className="bg-gray-100/50 pb-10">
            <Navbar />
            <div className="flex items-center justify-center mt-10 ">
              <ul role="list" className="space-y-6">
                <div>
                  <li className="flex w-[60rem] max-sm:w-[24rem] justify-between items-start py-6 shadow-lg p-10 max-sm:p-2 bg-white rounded-md">
                    <div className="mr-10 h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                      <img
                        src={companyData?.companyPic}
                        alt="company_LOGO"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <p className="text-sm text-gray-500">
                        Founded On : {companyData?.foundedOn}
                      </p>
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a>{companyData?.companyName}</a>
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <GoLocation />
                          <p className="">{companyData?.companyLocation}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-4 text-sm">
                        <p className="text-gray-500">
                          City : {companyData?.companyCity}
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
                    <button
                      onClick={() => {
                        setOpen(true);
                      }}
                      className="md:ml-5 max-sm:text-sm max-sm:font-normal p-1 px-4 max-sm:px-[2px] rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      + Add Review
                    </button>
                    <AddReview
                      detailApiCall={detailApiCall}
                      setOpen={setOpen}
                      open={open}
                    />
                  </li>
                  <div className="bg-white shadow-xl">
                    <p className="text-xl lg:text-2xl ml-10 pt-4 font-semibold text-gray-800">
                      Reviews
                    </p>
                    {reviewData[0] == null ? (
                      <h1 className="text-center p-4 text-gray-700 font-medium">
                        No review available
                      </h1>
                    ) : null}
                    {reviewData?.map((review) => {
                      return (
                        <div key={review._id}>
                          <Review review={review} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div className="bg-purple-500/90">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default CompanyDetails;
