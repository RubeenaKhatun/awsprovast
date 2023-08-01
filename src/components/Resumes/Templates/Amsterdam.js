import React, { useEffect } from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Amsterdam = ({ componentRef }) => {
  const {
    profile,
    objective,
    education,
    projects,
    work,
    skills,
    hobbies,
    languages,
    certifications,
    social,
    awards,
    layout,
    setdesign,
  } = useResumeContext();

  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5 relative `}
        id="template"
      >
        <div className="absolute left-44 top-5 border-[3px] border-gray-500 h-40 w-96 bg-white text-center">
          {profile && (
            <>
              <h1 className="mt-6 font-extrabold text-[24px] capitalize px-1 tracking-[3px]">
                {profile?.firstName}{" "}
                {profile?.lastName}
              </h1>
              <h1 className="mt-3">{profile?.role}</h1>
            </>
          )}
          {social && (
            <div className="mt-5 mb-4 flex  justify-center align-middle">
              {social?.length != 0 && (
                <>
                  {social?.map((item) => (
                    <>
                    {item.enabled && (
                      <div className="mx-5 mt-1 text-[12px]" key={item.network}>
                        {console.log("item",item)}
                      <span className="">
                        <Link href={item.url}>
                          <img
                            src={
                              "https://www." + item.network + ".com/favicon.ico"
                            }
                            className="w-5 grayscale-[40%] "
                          />
                        </Link>
                      </span>
                    </div>
                    )}
                    </>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex">
          <div className="w-[40%] h-[296mm] bg-gray-200">
            <div className="mt-52 mx-10 flex flex-col">
              <div>
                <h4 className="font-bold tracking-[4px] text-[16px] heading">
                  CONTACTS
                </h4>
                <hr className="w-[100%] h-1 bg-black my-2" />
                {profile && (
                  <div className="text-[12px]">
                    {profile?.displayEmail === "collegeMail" && (
                      <p className="font-semibold my-2 ">{profile?.email}</p>

                    )}
                    {profile?.displayEmail === "personalMail" && (
                      <p className="font-semibold my-2 ">{profile?.personalEmail}</p>
                    )}
                    <p className="font-semibold my-2">{profile?.phone}</p>
                  </div>
                )}
              </div>

              {education?.filter((edu) => edu?.enabled).length > 0 && (
                <>
                  <h4 className="font-bold tracking-[4px] text-[16px]  mt-2 heading">
                    EDUCATION
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />

                  {education
                    ?.filter((edu) => edu?.enabled === true)
                    .map((item) => (
                      <div
                        className="flex flex-col mt-2 text-[12px] "
                        key={item.institution}
                      >
                        <div className="flex justify-between">

                        <h1 className="text-black font-semibold">
                          {item.institution}
                        </h1>
                        <h1 className="text-[10px]">
                          [{item.startDate.slice(0, 4)} -{" "}
                          {item.endDate.slice(0, 4)}]
                        </h1>

                        </div>
                        <span className="font-semibold">
                          {item.typeOfDegree}
                        </span>
                        <span className="">{item.fieldOfStudy}</span>

                        <span className="">
                          <h1> {item.gpa} </h1>
                        </span>
                      </div>
                    ))}
                </>
              )}
              {/* </div> */}
            </div>

            <div className="mx-10 flex flex-col mt-2 ">
              {skills?.filter((skill) => skill?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[4px] text-[16px]  heading">
                    SKILLS
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div className="flex justify-between mt-2 text-[12px] ">
                        <span className="font-semibold " key={item.name}>
                          {item.name}
                        </span>
                        <span className="  ">{item.level}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="mx-10 flex flex-col mt-2 ">
              {awards?.filter((award) => award?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[4px] text-[16px]  heading">
                    AWARDS
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] mt-2 ">
                        <div className="flex justify-between">

                        <h1 className="font-semibold  " key={item.name}>
                          {item.name}
                        </h1>
                        <h1>
                        [{item.date.slice(0, 4)}]
                        </h1>
                        </div>
                        <span className="">{item.awarder}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="mx-10 flex flex-col mt-2 ">
              {languages?.filter((language) => language?.enabled).length >
                0 && (
                <div>
                  <h4 className="font-bold tracking-[4px] text-[16px]  heading">
                    LANGUAGES
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {languages
                    ?.filter((language) => language?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] flex justify-between mt-2 ">
                        <p className="font-semibold " key={item.name}>
                          {item.name} {console.log(item)}
                        </p>
                        <p>{item.fluency}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="mx-10 flex flex-col mt-2 ">
              {hobbies?.filter((hobby) => hobby?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[4px] text-[16px]  heading">
                    HOBBIES
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {hobbies
                    ?.filter((hobby) => hobby?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] mt-2">
                        <span className="font-semibold ">{item.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

           
          </div>
          <div className="w-[60%] h-auto mt-52 mx-10">
            {console.log("ob", objective)}
            {objective && (
              <div>
                {objective?.length != 0 && (
                  <>
                    <h2 className="font-bold tracking-[4px] heading">
                      OBJECTIVE
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    <p className="my-4 text-[13px] text-justify">{objective}</p>
                  </>
                )}
              </div>
            )}
            {projects?.filter((project) => project?.enabled).length > 0 && (
              <>
                <h2 className="font-bold tracking-[4px] text-[16px] mt-2 heading">
                  PROJECTS
                </h2>
                <hr className="w-[100%] h-1 bg-black my-1" />

                {projects
                  ?.filter((project) => project?.enabled === true)
                  .map((item) => (
                    <div className="mt-1">
                      {item.enabled && (
                        <div className="text-[12px] ">
                          <div className="mt-3">
                            <div className="flex justify-between">

                            <span className="text-black text-[13px]  font-bold">
                              {item.name} {" "}
                            </span>
                            <h1><span className="text-black text-[10px] font-semibold">
                                [{item.from.slice(0, 10)}] - [{item.to.slice(0, 10)}]
                              </span>{" "}</h1>

                            </div>
                            {item.summary.enabled && (
                              <h1 className="ml-4 text-justify">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}

            {work?.filter((wo) => wo?.enabled).length > 0 && (
              <div>
                {work.length != 0 && (
                  <>
                    <h2 className="font-bold text-[16px] mt-2  tracking-[4px] heading">
                      WORK
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    {work
                      ?.filter((wo) => wo?.enabled === true)
                      .map((item) => (
                        <div className="text-[12px] ">
                          <div className="flex flex-col" key={item.company}>
                            {/* <span className="text-black font-bold mt-3" >{item.name}</span> */}
                            <div className="flex mt-3 justify-between">

                            <span className="text-black text-[13px]  font-bold ">
                              {item.company}{" "}
                              
                            </span>
                            <h1><span className="font-semibold text-[10px]">
                                [{item.from.slice(0, 4)} - 
                                {item.to.slice(0, 4)}]
                              </span></h1>
                            </div>
                            <span className="text-black font-semibold mx-4">
                              {item.designation}
                            </span>
                            {item.summary.enabled && (
                              <h1 className="ml-4 text-justify">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}

            {certifications?.filter((certificate) => certificate?.enabled)
              .length > 0 && (
              <div>
                {certifications.length != 0 && (
                  <>
                    <h2 className="font-bold tracking-[4px] text-[16px] mt-2 heading">
                      CERTIFICATIONS
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    {certifications
                      ?.filter((certificate) => certificate?.enabled === true)
                      .map((item) => (
                        <div className="text-[12px] ">
                          <div className="flex flex-col" key={item.title}>
                            {/* <span className="text-black font-bold mt-3" >{item.name}</span> */}
                            <div className="flex justify-between mt-2">

                            <p className="text-black font-bold ">
                              {item.title}
                            </p>
                              <p className="font-semibold text-[10px]">[{item.date}]</p>
                            </div>
                            <span className="text-black font-semibold mx-4">
                              {item.issuer}
                            </span>
                            {item.summary.enabled && (
                              <p className="ml-4 text-justify">{item.summary.data}</p>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <style jsx>
          {`
            .heading {
              color: rgba(${r}, ${g}, ${b}, ${a});
            }
          `}
        </style>
      </div>
    </>
  );
};
