// import React from "react";
// import Link from "next/link";
// import Head from "next/head";
// import swal from "sweetalert";
// import axios from "axios";
// import { getLoginSession } from "../../../../src/lib/auth";
// import { findUser } from "../../../../src/lib/user";
// import crypto from "crypto";

// const testpatterns = ({ companies }) => {
//   const user = JSON.parse(userDetails);

//   return (
//     <div>
//       {user && (
//         <div class=" mt-10 w-full">
//           <br />
//           <br />
//           <br />
//           <br />
//           <h1 className="text-3xl text-center font-semibold">
//             Test Patterns
//           </h1>{" "}
//           <br />
//           <br />
//           <div className="flex justify-center">
//             <div className=" grid min-[300px]:grid-cols-2 grid-cols-1 gap-1 mx-2 sm:grid-cols-2 md:grid-cols-3 justify-center lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 mb-5">
//               {companies.map((company) => {
//                 return (
//                   <Link
//                     href={`/dashboard/student/testpatterns/${company.companyname}`}
//                   >
//                     <div className="mx-5 my-3 rounded shadow-md py-4 flex flex-col justify-between cursor-pointer">
//                       <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
//                         <img src={company.logo} height={100} width={200} />
//                       </div>
//                       <div className="mt-4 flex justify-center">
//                         <h3 className="text-lg font-semibold text-gray-700">
//                           {company.companyname}
//                         </h3>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export const getServerSideProps = async ({ req, res }) => {
//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=10, stale-while-revalidate=59"
//   );
//   const defaultPassword = "Provast@123";

//   const session = await getLoginSession(req);
//   const user = (session?._doc && (await findUser(session._doc))) ?? null;

//   const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/patterns`);
//   const status = await data.json();
//   if(user){
//     const inputHash = crypto
//     .pbkdf2Sync(defaultPassword, user.salt, 1000, 64, "sha512")
//     .toString("hex");
//   const passwordsMatch = user.hash === inputHash;
//   if (passwordsMatch) {
//     return {
//       redirect: {
//         destination: "/dashboard/student/profile/changePassword",
//         permanent: false,
//       },
//     };
//   }
//   }

//   return {
//     props: {
//       companies: status,
//     },
//   };
// };

// export default testpatterns;

// // export const getServerSideProps = async(req,res) => {

// //       const session = await getLoginSession(req);
// //       const user = (session?._doc && (await findUser(session._doc))) ?? null;

// //       const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/patterns`);
// //       const status = await data.json();

// //       return {
// //         props: {
// //           userDetails: JSON.stringify(user),
// //           companies : status
// //         },
// //       };

// // }
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Heading } from "../../../../src/components/Layout/Heading";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import crypto from "crypto";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ResumeIndex = ({ user,companies }) => {
  // console.log("comp",companies);
  const [tab, setTab] = useState("Service Companies");
  const tabs = [
    { name: "Service Companies", current: tab === "Service Companies" },
    { name: "Assessment Partners", current: tab === "Assessment Partners" },
    { name: "Product/Dream Companies", current: tab === "Product/Dream Companies" },
    { name: "Product/Super Dream", current: tab === "Product/Super Dream" },
    { name: "FAANG/MAANG", current: tab === "FAANG/MAANG" },
  ];
  const router = useRouter();
  const [loading,setloading] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Test Patterns</title>
        <meta name="description" content="Get your resume ready for free." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loading />}


      {(
        <main className="px-8 relative mt-[10vh]">
          <h1 className="text-center pt-10 text-lg tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Test Patterns
          </h1>
          <Heading
            description={`${
              tab === "Service Companies"
                ? "Get Access to Test Patterns of all Different Kind of Companies."
                : tab === "Assessment Partners"
                ? "Get Access to Test Patterns of all Different Kind of Companies."
                : tab === "Product/Dream Companies"
                ? "Get Access to Test Patterns of all Different Kind of Companies."
                : tab === "Product/Super Dream"
                ? "Get Access to Test Patterns of all Different Kind of Companies."
                : tab === "FAANG/MAANG"
                ? "Get Access to Test Patterns of all Different Kind of Companies."
                : ""
            } `}
          />
          {/* Tabs */}
          <div className="my-10">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md "
                value={tabs.find((tab) => tab.current).name}
                onChange={(e) => setTab(e.target.value)}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      onClick={() => setTab(tab.name)}
                      className={classNames(
                        tab.current
                          ? "border-[#ef481d] text-[#ef481d] bg-gray-100 rounded-t-md"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-md cursor-pointer"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <section className="my-10">
            {tab === "Service Companies" && (
              <div
                data-aos="fade-up"
                className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"
              >
                {companies.filter((company) => company.jobtype === "Service Companies").map((product,index) => (
                     <div
                     
                     className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-46 lg:h-50 xl:w-56 xl:h-60 rounded shadow py-6 group relative flex flex-col justify-between"
                   >
                     <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                       <img
                         src={product.logo}
                         alt=""
                         className="w-full  object-center object-cover lg:w-full "
                       />
                     </div>
                     <div className="mt-4 flex justify-center">
                       <Link href={`/dashboard/individual/testpatterns/${product.companyname}`}>
                         <h3 className="text-lg font-semibold text-gray-700">
                           <span aria-hidden="true" className="absolute inset-0" />
                           {product.companyname}
                         </h3>
                       </Link>
                     </div>
           
                   </div>
                ))}
              </div>
              
            )}
            {tab === "Assessment Partners" && (
             <div
             data-aos="fade-up"
             className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"
           >
                 {companies.filter((company) => company.jobtype === "Assessment Partners").map((product,index) => (
                       <div
                     
                       className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-46 lg:h-50 xl:w-56 xl:h-60 rounded shadow py-6 group relative flex flex-col justify-between"
                     >
                       <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                         <img
                           src={product.logo}
                           alt=""
                           className="w-full  object-center object-cover lg:w-full "
                         />
                       </div>
                       <div className="mt-4 flex justify-center">
                         <Link href={`/dashboard/individual/testpatterns/${product.companyname}`}>
                           <h3 className="text-lg font-semibold text-gray-700">
                             <span aria-hidden="true" className="absolute inset-0" />
                             {product.companyname}
                           </h3>
                         </Link>
                       </div>
             
                     </div>
                ))}
              </div>
            )}
            {tab === "Product/Dream Companies" && (
              <div
              data-aos="fade-up"
              className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"
            >
               {companies.filter((company) => company.jobtype === "Product/Dream Companies").map((product,index) => (
                     <div
                     
                     className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-46 lg:h-50 xl:w-56 xl:h-60 rounded shadow py-6 group relative flex flex-col justify-between"
                   >
                     <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                       <img
                         src={product.logo}
                         alt=""
                         className="w-full  object-center object-cover lg:w-full "
                       />
                     </div>
                     <div className="mt-4 flex justify-center">
                       <Link href={`/dashboard/individual/testpatterns/${product.companyname}`}>
                         <h3 className="text-lg font-semibold text-gray-700">
                           <span aria-hidden="true" className="absolute inset-0" />
                           {product.companyname}
                         </h3>
                       </Link>
                     </div>
           
                   </div>
                ))}
              </div>
            )}
            {tab === "Product/Super Dream" && (
               <div
               data-aos="fade-up"
               className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"
             >
                 {companies.filter((company) => company.jobtype === "Product/Super Dream").map((product,index) => (
                     <div
                     
                     className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-46 lg:h-50 xl:w-56 xl:h-60 rounded shadow py-6 group relative flex flex-col justify-between"
                   >
                     <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                       <img
                         src={product.logo}
                         alt=""
                         className="w-full  object-center object-cover lg:w-full "
                       />
                     </div>
                     <div className="mt-4 flex justify-center">
                       <Link href={`/dashboard/individual/testpatterns/${product.companyname}`}>
                         <h3 className="text-lg font-semibold text-gray-700">
                           <span aria-hidden="true" className="absolute inset-0" />
                           {product.companyname}
                         </h3>
                       </Link>
                     </div>
           
                   </div>
                  
                ))}
              </div>
            )}
            {tab === "FAANG/MAANG" && (
               <div
               data-aos="fade-up"
               className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"
             >
             
                 {companies.filter((company) => company.jobtype === "FAANG/MAANG").map((product,index) => (
                      <div
                     
                      className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-46 lg:h-50 xl:w-56 xl:h-60 rounded shadow py-6 group relative flex flex-col justify-between"
                    >
                      <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img
                          src={product.logo}
                          alt=""
                          className="w-full  object-center object-cover lg:w-full "
                        />
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Link href={`/dashboard/individual/testpatterns/${product.companyname}`}>
                          <h3 className="text-lg font-semibold text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.companyname}
                          </h3>
                        </Link>
                      </div>
            
                    </div>
                ))}
               
              </div>
            )}
          </section>
        </main>
      )}
      <style jsx>{`
        .box {
          position: relative;
          border-radius: 5px;
          width: 250px;
          height: 45vh;
          margin-top: 30px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          transition: background 0.5s ease;
        }

        .box:hover .overlay {
          display: block;
          background: rgba(0, 0, 0, 0.7);
        }

        .box:hover .overlay-create {
          display: block;
          background: rgba(0, 0, 0, 0.7);
        }

        .box-image {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
        }

        .title {
          position: absolute;
          width: 100%;
          left: 0;
          top: 42%;
          font-weight: 700;
          font-size: 30px;
          text-align: center;
          text-transform: uppercase;
          color: white;
          z-index: 1;
          transition: top 0.5s ease;
        }

        .title-create {
          position: absolute;
          width: 100%;
          left: 0;
          top: 42%;
          font-weight: 700;
          font-size: 30px;
          text-align: center;
          text-transform: uppercase;
          color: gray;
          z-index: 1;
          transition: top 0.5s ease;
        }

        .box:hover .title {
          top: 30%;
        }

        .box:hover .title-create {
          top: 30%;
        }

        .button {
          position: absolute;
          width: 100%;
          left: 0;
          top: 60%;
          text-align: center;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .button a {
          width: 70%;
          padding: 12px 48px;
          text-align: center;
          color: white;
          border: solid 2px white;
          z-index: 1;
        }

        .box:hover .button {
          opacity: 1;
        }
      `}</style>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user && user.category !== "individual") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  if (user.category === "individual" && !user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }
  const defaultPassword = "Provast@123";
  const inputHash = crypto
    .pbkdf2Sync(defaultPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  if (passwordsMatch) {
    return {
      redirect: {
        destination: "/dashboard/student/profile/changePassword",
        permanent: false,
      },
    };
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/patterns`);
  const status = await data.json();
  return {
    props: {
        user: JSON.stringify(user),
        companies : status
    },
    };
};

export default ResumeIndex;

