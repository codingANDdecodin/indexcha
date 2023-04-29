import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

const Resume = (props) => {
  
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);


  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };


  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];


  const programmingSkillsDetails = [
    { skill: "JavaScript", ratingPercentage: 90 },
    { skill: "React JS", ratingPercentage: 85 },
    { skill: "Express JS", ratingPercentage: 85 },
    { skill: "Node JS", ratingPercentage: 88 },
    { skill: "Mongo Db", ratingPercentage: 70 },
    { skill: "C++", ratingPercentage: 80 },
    { skill: "C", ratingPercentage: 80 },
    { skill: "HTML", ratingPercentage: 80 },
    { skill: "CSS", ratingPercentage: 80 },
  ];

  const projectsDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2023", toDate: "2023" },
      description:
        "A Personal Portfolio website to showcase all my details and projects at one place.",
      subHeading: "Technologies Used: React JS,Express Js, Node Js",
    },
    {
      title: "Shopping Cart for e-commerce website ",
      duration: { fromDate: "2023", toDate: "2023" },
      description:
        "An ecommerce application designed to store that product which we want to purches",
      subHeading:
        "Technologies Used: React Js",
    },
   
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"Dr. D Y Patil ACS College pimpri 411018 "}
        subHeading={"Bachelor of bussiness administration(computer application)"}
        fromDate={"2019"}
        toDate={"2022"}
      />

      <ResumeHeading
        heading={"Frond End Development"}
        subHeading={"Bitcode institute"}
        fromDate={"2022"}
        toDate={"present"}
      />
      <ResumeHeading
        heading={"senior secondary(XII)"}
        subHeading={"Hutatma Rajguru mahavidyalaya"}
        fromDate={"2017"}
        toDate={"2019"}
      />
    </div>,


    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"worked on Project"}
         
          fromDate={"2021"}
          toDate={"Present"}
        />
      
        <div className="experience-description">
          <span className="resume-description-text">
            - Developed an  Shopping Cart  for ecommerce website with for
            managing the products,add more no of products etc. .
          </span><br/>
          <span className="resume-description-text">
            - Developed an  Portfolio Website with for
            display my ability , etc. .
          </span>
          <br />
          <span className="resume-description-text">
            - Integrated the web app with backend services 
         
          </span>
          <br />
          <span className="resume-description-text">
            - I stretch my mental capacity to develope UI as per the given
            designs.
          </span>
          <br />
        </div>
      </div>
    </div>,

    
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

   
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

    
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Enhancing knowledge"
        description="Apart from being a tech enthusiast and a code writer, i also love to incress my knowledge throw the books and other people."
      />
      <ResumeHeading
        heading="Keep my self updated"
        description="i always like to change my  persnolity according to market trend."
      />
      <ResumeHeading
        heading="Competitive Gaming"
        description="I like to challenge my reflexes a lot while competing in chess games, pushing the rank and having interactive gaming sessions excites me the most."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

 
  return (
    <div
      className="resume-container screen-container"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
};

export default Resume;