import React, { useState } from "react";
import stylesCpn from "./styleCpn.module.scss";
import classNames from "classnames/bind";
import { GrFormClose } from "react-icons/gr";
import paser from "html-react-parser"

const cx = classNames.bind(stylesCpn);

export default function Project(props) {
  const {data} = props
  return (
    <div id="project" className={cx("project")}>
      <h2>Project</h2>
          <div className={cx("list-project")}>
             {data?.project?.map(item => <ProjectCard key={item._id} data={item} />)}
          </div>
    </div>
  );
}

 export const ProjectCard = ({data}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cx("project-card")}>
        <img
          height={290}
          alt="?"
          src={data?.image}
        />
      <div className={cx("info")}>
        <div>
          <h3>{data?.name}</h3>
          <h5>{data?.type}</h5>
          <div>
           {data && paser(data?.responsibility)}
          </div>
        </div>
        <button onClick={showModal}>Detail</button>
      </div>
      {isModalOpen && (
        <div className={cx("modal")}>
          <div onClick={handleCancel} className={cx("modal-overlay")}></div>
          <div className={cx("modal-content")}>
            <div className={cx("modal-body")}>
              <div className={cx("header")}>
                <span onClick={handleCancel}><GrFormClose style={{color: "white"}} /></span>
              </div>
              <div className={cx("body")}>
                <h2>Overview</h2>
                <ProjectCardSub data={data} />
                <div className={cx("body_modal_project")}>   {data && paser(data?.website_functionality)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const ProjectCardSub = ({data}) => {
  return (
    <div className={cx("project-cardsub")}>
      <img
        height={290}
        alt="?"
        src={data?.image}
      />
      <div className={cx("info")}>
        <div>
          <h3>{data?.name}</h3>
          <h5>{data?.type}</h5>
          <div>
          {data && paser(data?.responsibility)}
          </div>
        </div>
      </div>
    </div>
  );
};
