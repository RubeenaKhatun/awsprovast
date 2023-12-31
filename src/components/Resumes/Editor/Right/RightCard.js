import { Menu, Transition } from "@headlessui/react";
import cryptoRandomString from "crypto-random-string";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { VscLock } from "react-icons/vsc";
import { useModelContext } from "../../../../context/ModalContext";
import { useResumeContext } from "../../../../context/ResumeContext";
import { demoResume } from "../../../../data/demoResume";
import { intialResume } from "../../../../data/initalResume";
import { trim_json } from "../../../../lib/helper";
import { useUser } from "../../../../lib/hooks";
import { Loading } from "../../../Reusables/Loading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { userAgent } from "next/server";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const { template } = useResumeContext();
export const RightCard = React.forwardRef(function RightCard({
  heading,
  description,
  button,
  checkPlan,
  componentRef = "",
}) {
  const user = useUser();
  const [pdf, setPdf] = useState(null);
  const { setForm, setIsOpen } = useModelContext();

  useEffect(() => {
    setPdf(require("react-component-export-image"));
  }, []);

  const [loading, setLoading] = useState(false);
  const { debounceUpdateResume, resume, design, modules, profile } =
    useResumeContext();
  const router = useRouter();
  console.log("profile", profile);
  const handleLoadDemodata = () => {
    setLoading(true);
    debounceUpdateResume(demoResume(user));
    setLoading(false);
  };
  const handleResetDemodata = () => {
    setLoading(true);
    debounceUpdateResume(intialResume(user));
    setLoading(false);
  };
  const handlePickTemplate = () => {
    setLoading(true);
    setIsOpen(true);
    setForm("pickTemplate");
    setLoading(false);
  };

  const handleExportAsJson = () => {
    setLoading(true);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(trim_json(resume && resume))
    )}`;
    console.log("inside json", jsonString);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `resume_${cryptoRandomString({ length: 10 })}.json`;
    link.click();
    setLoading(false);
    router.reload();
  };

  const handleImportAsJson = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (fileReader) {
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (e) => {
        const trimmed_data = trim_json(e.target.result);
        await debounceUpdateResume(JSON.parse(trimmed_data));
      };
    }
    setLoading(false);
    e.target.value = "";
  };

  const customizePrint = () => {
    console.log(" first ...");
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        /* Set page size to A4 */
        @page {
          size: Letter;
        }
        
        /* Enable background graphics */
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Set number of copies to 1 */
        @counter-style pageCount {
          system: fixed;
          symbols: '';
          suffix: ' of 1';
        }
        body::before {
          counter-increment: pageCount;
          content: counter(pageCount);
          display: none;
        }
        
        /* Reset margins */
        @page {
          margin: initial;
        }
        body {
          margin: 0cm;
        }
        
        /* Disable headers and footers */
        @page {
          margin-top: 1;
          margin-bottom: 1;
        }
        header, footer {
          display: none;
        }
      }
      /* Change the pages option to Odd Pages Only */
    @media print {
      @page {
        size: A4;
        marks: none;
      }
      @page :left {
        @bottom-left {
          content:  "1 of 1";
        }
      }
      @page :right {
        @bottom-right {
          content:  "1 of 1";
        }
      }
    }
    `;
    console.log("last cp");
    document.head.appendChild(style);
  };

  return (
    <div className="p-2 my-5 w-[95%] rounded mx-auto bg-gray-700 text-white">
      {loading && <Loading />}
      <h4 className="text-sm font-semibold">{heading}</h4>
      <p className="my-2 text-xs">{description}</p>
      {button === "Download Your Resume" ? (
        <Menu
          as="div"
          onClick={() => {
            if (!checkPlan) {
              setForm("paymentForm");
              setIsOpen(true);
              return;
            }
          }}
          className="z-40 relative inline-block cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <Menu.Button
              className={`bg-white my-1 text-gray-800 text-xs px-2 py-1 rounded-sm font-bold hover:bg-gray-300 ${
                !checkPlan ? "pointer-events-none opacity-40 relative" : ""
              }`}
            >
              {button}
            </Menu.Button>
            {!checkPlan && (
              <div className="absolute z-10 top-[4px] right-[43%] flex items-center justify-center h-6 w-6 bg-gray-900 bg-opacity-70 rounded-full p-1 ">
                <VscLock size={14} color="white" />
              </div>
            )}
          </div>

          {/* <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='origin-top-right absolute right-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        pdf.exportComponentAsJPEG(componentRef, {
                          fileName: `${user?.profile?.firstName}${user?.profile?.lastName}_${user?.profile?.rollNumber}`,
                        })
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left font-semibold"
                      )}
                    >
                      AS JPEG
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        pdf.exportComponentAsPNG(componentRef, {
                          fileName: `${user?.profile?.firstName}${user?.profile?.lastName}`,
                        })
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm uppercase w-full text-left font-semibold"
                      )}
                    >
                      AS PNG
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button 
                      onClick={() =>{
                        document.body.innerHTML = design.innerHTML;
                        window.print();
                        router.reload();
                      }
                        
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left font-semibold"
                      )}
                    >
                      AS PDF
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition> */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        pdf.exportComponentAsJPEG(componentRef, {
                          fileName: `${user?.profile?.firstName}${user?.profile?.lastName}_${user?.profile?.rollNumber}`,
                        })
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left font-semibold"
                      )}
                    >
                      AS JPEG
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        pdf.exportComponentAsPNG(componentRef, {
                          fileName: `${user?.profile?.firstName}${user?.profile?.lastName}`,
                        })
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm uppercase w-full text-left font-semibold"
                      )}
                    >
                      AS PNG
                    </button>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        pdf.exportComponentAsPDF(componentRef, {
                          fileName: `${user?.profile?.firstName}${user?.profile?.lastName}`,
                          pdfOptions: {
                            unit: "cm",
                            w: 21.0,
                            h: 29.7,
                          },
                        })
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left font-semibold"
                      )}
                    >
                      AS PDF
                    </button>
                  )}
                </Menu.Item> */}

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        document.body.innerHTML = design.innerHTML;
                        const targetElement =
                          document.getElementById("profileImage");

                        if (!modules.includes("Premium")) {
                          const watermarkDiv = document.createElement("div");
                          watermarkDiv.className =
                            "absolute inset-0 flex items-center justify-center";
                          watermarkDiv.innerHTML = `
                            <div className="bg-opacity-50 p-4 text-gray-500 text-center text-lg" id="watermark">
                              
                            </div>
                           `;
                          // const targetDiv = document.getElementById('template');
                          // <img src="/wm.png" alt="" srcset=""  style="opacity: 0.2" />
                          document.body.appendChild(watermarkDiv);
                          console.log("wm", watermarkDiv);
                        }

                        const targetDiv = document.getElementById("watermark");

                        if (targetDiv) {
                          var waterimage = document.createElement("img");
                          waterimage.src = "/wm2.png";
                          waterimage.style.opacity = 0.3;

                          console.log("inside target div");
                          // console.log()
                          waterimage.onload = function () {
                            targetDiv.appendChild(waterimage);
                            if (targetElement) {
                              var image = document.createElement("img");
                              if (profile.image) {
                                image.src = profile.image;

                                image.onload = function () {
                                  // Image has finished loading
                                  targetElement.appendChild(image);
                                  customizePrint();
                                  window.print();
                                  router.reload();
                                };
                              } else {
                                customizePrint();
                                window.print();
                                router.reload();
                              }
                            } else {
                              customizePrint();
                              window.print();
                              router.reload();
                            }
                          };
                        } else {
                          if (targetElement) {
                            var image = document.createElement("img");
                            if (profile.image) {
                              image.src = profile.image;

                              image.onload = function () {
                                // Image has finished loading
                                targetElement.appendChild(image);
                                customizePrint();
                                window.print();
                                router.reload();
                              };
                            } else {
                              customizePrint();
                              window.print();
                              router.reload();
                            }
                          } else {
                            customizePrint();
                            window.print();
                            router.reload();
                          }
                          // const image = document.body.getElementsByClassName("profileImage")
                          // // image.onload(()=>{
                          // //   console.log("image",image)
                          // // })
                          // var image = document.getElementById("profileImage")
                          // console.log("image",image)
                          // window.print();
                        }
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left font-semibold"
                      )}
                    >
                      AS PDF
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : button === "Import Your Resume" ? (
        <div className="relative">
          <button className="w-[73%] bg-white z-20 my-1 opacity-1 text-gray-800 text-xs px-2 py-1 rounded-sm font-bold hover:bg-gray-300 overflow-hidden">
            Import Your Resume
          </button>
          <input
            className="absolute z-10 opacity-0 w-[73%] left-0 "
            label="Choose File"
            type="file"
            onChange={handleImportAsJson}
          />
        </div>
      ) : (
        <button
          onClick={
            button === "Load Demo Data"
              ? handleLoadDemodata
              : button === "Reset Demo Data"
              ? handleResetDemodata
              : button === "Pick Template"
              ? handlePickTemplate
              : button === "Export Your Resume"
              ? handleExportAsJson
              : button === "Pick Template"
              ? handlePickTemplate
              : ""
          }
          className="bg-white my-1 text-gray-800 text-xs px-2 py-1 rounded-sm font-bold hover:bg-gray-300"
        >
          {button}
        </button>
      )}
    </div>
  );
});
