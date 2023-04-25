import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Avatar, Button, Collapse, Modal, Popconfirm } from "antd";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../../services/userService";
import { updateUser } from "../../redux/slides/userSlide";
import InputUpdate from "../InputUpdate/InputUpdate";
import { useMutationHooks } from "../../hooks/useMutationHook";
import parse from "html-react-parser";
import * as message from "../../components/Message/Message";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Loading from "../Loading/Loading";
import ProjectItem from "../ProjectItem/ProjectItem";
import { MdCloudUpload } from "react-icons/md";
import { skillConstant } from "../../constants";
import { AiFillCaretDown, AiFillDelete } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { socialConstantSetting } from "../../constants";

const { Panel } = Collapse;

const cx = classNames.bind(styles);

export default function Profile({ data }) {
  const dispatch = useDispatch();
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
  const update = async (req) => {
    setIsLoadingAvatar(true)
    await userService.updateUser({ id: data?.id, data: req });
    const res = await userService.getDetailUser(data?.id);
    dispatch(updateUser({ ...res?.data }));
    setIsLoadingAvatar(false)
  };

  //SECTION Edit avatar
  const [isModalOpen_Avatar, setIsModalOpen_Avatar] = useState(false);
  const showModal_Avatar = () => {
    setIsModalOpen_Avatar(true);
  };
  const handleOk_Avatar = () => {
    setIsModalOpen_Avatar(false);
    update({ avatar: imgs });
  };
  const handleCancel_Avatar = () => {
    setIsModalOpen_Avatar(false);
  };

  const [imgs, setImgs] = useState();

  const handleChnageAvatar = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  // SECTION  Edit info
  const user = useSelector((state) => state.user);
  const [isModalOpen_info, setIsModalOpen_info] = useState(false);
  const showModal_info = () => {
    setIsModalOpen_info(true);
  };
  const handleOk_info = () => {
    setIsModalOpen_info(false);
    handleUpdate();
  };
  const handleCancel_info = () => {
    setIsModalOpen_info(false);
  };
  const [childData, setChildData] = useState("");
  const [info, setInfo] = useState({
    full_name: data?.full_name,
    birtday: data?.birtday,
    phone: data?.phone,
    job_position: data?.job_position,
    address: data?.address,
    study: data?.study,
    degree: data?.degree,
    gpa: data?.gpa,
    about: data?.about,
    cv: data?.cv,
    classification: data?.classification,
  });

  useEffect(() => {
    setInfo({ ...info, about: childData });
  }, [childData]);

  const mutation = useMutationHooks((data) => userService.updateUser(data));
  const {
    data: updateData,
    isLoading: isLoadingUpdateData,
    isSuccess,
  } = mutation;

  const handleUpdate = () => {
    mutation.mutate({ id: data?.id, data: info });
  };

  const handleUpdateInput = (json) => {
    mutation.mutate({ id: data?.id, data: json });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(updateData?.data));
      message.success(updateData?.message);
    }
  }, [isSuccess]);

  // SECTION Edit  Exp
  const [childDataExp, setChildDataExp] = useState("");
  const [childDataEdu, setChildDataEdu] = useState("");
  const [tabUp, setTabUp] = useState(1);
  const [exp, setExp] = useState({
    title: "",
    time: "",
    sub: "",
  });
  const [edu, setEdu] = useState({
    title: "",
    time: "",
    sub: "",
  });

  useEffect(() => {
    setExp({ ...exp, sub: childDataExp });
    setEdu({ ...edu, sub: childDataEdu });
  }, [childDataExp, childDataEdu]);

  const [isModalOpen_exp, setIsModalOpen_exp] = useState(false);
  const showModal_exp = () => {
    setIsModalOpen_exp(true);
  };

  const handleCancel_exp = () => {
    setIsModalOpen_exp(false);
  };

  const mutationUpdate = useMutationHooks((data) =>
    userService.updateUserExp(data)
  );
  const {
    data: updateDataExp,
    isLoading: isLoadingUpdateExp,
    isSuccess: isSuccessExp,
  } = mutationUpdate;

  const mutationRemove = useMutationHooks((data) =>
    userService.removeUserExp(data)
  );
  const {
    data: removeDataExp,
    isLoading: isLoadingRemoveExp,
    isSuccess: isSuccessRemoveExp,
  } = mutationRemove;

  useEffect(() => {
    if (isSuccessExp) {
      dispatch(updateUser(updateDataExp?.data));
      message.success(updateDataExp?.message);
    }
  }, [isSuccessExp]);

  useEffect(() => {
    if (isSuccessRemoveExp) {
      dispatch(updateUser(removeDataExp?.data));
      message.success(removeDataExp?.message);
    }
  }, [isSuccessRemoveExp]);

  const handleUpdateExp = (json) => {
    mutationUpdate.mutate({ id: data?.id, data: json });
  };

  const handleRemove = (json) => {
    mutationRemove.mutate({ idUser: user?.id, data: json });
  };

  // SECTION Edit Skill
  const [isModalOpen_skill, setIsModalOpen_skill] = useState(false);
  const [isModalOpen_skill1, setIsModalOpen_skill1] = useState(false);
  const showModal_skill = () => {
    setIsModalOpen_skill(true);
  };
  const handleOk_skill = () => {
    setIsModalOpen_skill(false);
  };
  const handleCancel_skill = () => {
    setIsModalOpen_skill(false);
  };

  const showModal_skill1 = () => {
    setIsModalOpen_skill1(true);
  };
  const handleOk_skill1 = () => {
    setIsModalOpen_skill1(false);
  };
  const handleCancel_skill1 = () => {
    setIsModalOpen_skill1(false);
  };

  const numSkill = [
    { num: 0, title: "HTML" },
    { num: 1, title: "CSS" },
    { num: 2, title: "Javascript" },
    { num: 3, title: "ReactJS" },
    { num: 4, title: "Redux" },
    { num: 5, title: "NodeJS" },
    { num: 6, title: "TypeScript" },
    { num: 7, title: "MongDB" },
    { num: 8, title: "TaiwindCSS" },
    { num: 9, title: "SASS" },
    { num: 10, title: "MUI" },
    { num: 11, title: "ANT Design" },
    { num: 12, title: "Git" },
    { num: 13, title: "Bootstrap" },
    { num: 14, title: "C++" },
    { num: 15, title: "C#" },
    { num: 16, title: "Java" },
    { num: 17, title: "Python" },
    { num: 18, title: "My SQL" },
    { num: 19, title: "React Native" },
    { num: 20, title: "PHP" },
    { num: 21, title: "Laravel" },
  ];

  const [skill, setSkill] = useState({
    hardSkill: "",
    softSkill: "",
  });

  const [childDataHK, setChildDataHK] = useState("");
  const [childDataSK, setChildDataSK] = useState("");
  useEffect(() => {
    setSkill({ ...skill, hardSkill: childDataHK, softSkill: childDataSK });
  }, [childDataHK, childDataSK]);

  const mutationUpdateSkill = useMutationHooks((data) =>
    userService.updateUserSkill(data)
  );
  const {
    data: updateDataSkill,
    isLoading: isLoadingUpdateSkill,
    isSuccess: isSuccessSkill,
  } = mutationUpdateSkill;

  const handleUpdateSkill = (json) => {
    mutationUpdateSkill.mutate({ idUser: user?.id, data: json });
  };

  useEffect(() => {
    if (isSuccessSkill) {
      dispatch(updateUser(updateDataSkill?.data));
      message.success(updateDataSkill?.message);
    }
  }, [isSuccessSkill]);

  //SECTION Edit Project
  const [isModalOpen_project, setIsModalOpen_project] = useState(false);
  const showModal_project = () => {
    setIsModalOpen_project(true);
  };
  const handleOk_project = () => {
    setIsModalOpen_project(false);
  };
  const handleCancel_project = () => {
    setIsModalOpen_project(false);
  };

  const handleChnageProject = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setDataProject({ ...dataProject, image: data.result });
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const [childShort, setChildShort] = useState("");
  const [childDesc, setChildDesc] = useState("");
  useEffect(() => {
    setDataProject({
      ...dataProject,
      responsibility: childShort,
      website_functionality: childDesc,
    });
  }, [childShort, childDesc]);
  const [dataProject, setDataProject] = useState({
    name: "",
    type: "",
    responsibility: "",
    image: "",
    website_functionality: "",
  });

  const mutationProject = useMutationHooks((data) =>
    userService.updateUserExp(data)
  );
  const {
    data: dataUpdateProject,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
  } = mutationProject;

  useEffect(() => {
    if (isSuccessAdd) {
      dispatch(updateUser(dataUpdateProject?.data));
      message.success("Thêm dự án thành công!");
      setDataProject({
        name: "",
        type: "",
        responsibility: "",
        image: "",
        website_functionality: "",
      });
      setChildDesc("");
      setChildShort("");
    }
  }, [isSuccessAdd]);

  // SECTION SOCIAL

  const [isLinkShow, setIsLinkShow] = useState(false);
  const [select, setSelect] = useState("Chọn mạng xã hội");
  const [link, setLink] = useState("");
  const [isModalOpenS, setIsModalOpenS] = useState(false);
  const showModalS = () => {
    setIsModalOpenS(true);
  };
  const handleCancelS = () => {
    setIsModalOpenS(false);
  };

  const mutationSocial = useMutationHooks((data) =>
    userService.updateUserExp(data)
  );
  const {
    data: dataUpdateSocial,
    isLoading: isLoadingSocial,
    isSuccess: isSuccessSocial,
  } = mutationSocial;

  const handleAddSocial = () => {
    mutationSocial.mutate({
      id: user?.id,
      data: { social: { name: select, link: link } },
    });
    setIsModalOpenS(false);
  };

  useEffect(() => {
    if (isSuccessSocial) {
      dispatch(updateUser(dataUpdateSocial?.data));
      message.success(dataUpdateSocial?.message);
    }
  }, [isSuccessSocial]);


  const mutationDeleteLink = useMutationHooks((data) =>
  userService.removeUserExp(data)
);
const {
  data: dataDeleteLink,
  isLoading: isLoadingDeleteLink,
  isSuccess: isSuccessDeleteLink,
} = mutationDeleteLink;

const handleDeleteLink = (id) => {
  mutationDeleteLink.mutate({
    idUser: user?.id,
    data: { social: { _id: id} },
  });
};

useEffect(() => {
  if (isSuccessDeleteLink) {
    dispatch(updateUser(dataDeleteLink?.data));
    message.success(dataDeleteLink?.message);
  }
}, [isSuccessDeleteLink]);

  // const defaultOnErrorFn = useRef(window.onerror);
  // useEffect(() => {
  //   window.onerror = (...args) => {
  //     if (args[0] === "ResizeObserver loop limit exceeded") {
  //       return true;
  //     } else {
  //       defaultOnErrorFn.current && defaultOnErrorFn.current(...args);
  //     }
  //   };
  //   return () => {
  //     window.onerror = defaultOnErrorFn.current;
  //   };
  // }, []);

  return (
    <div className={cx("wrapper")}>
      <h3>Thông tin cá nhân</h3>
      {isLoadingAvatar && <Loading tip="Đang thay ảnh đại diện!" />}
      <Modal
        title="Thay đổi ảnh đại diện"
        open={isModalOpen_Avatar}
        onOk={handleOk_Avatar}
        onCancel={handleCancel_Avatar}
      >
        <div className={cx("modal_avatar")}>
          <img
            alt="?"
            src={
              imgs ||
              user?.image ||
              "https://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png"
            }
          />
          <input id="file" type="file" onChange={handleChnageAvatar} />
          <label className={cx("label")} htmlFor="file">
            Chọn ảnh
          </label>
        </div>
      </Modal>
      {/* NOTE  */}
      <div className={cx("general_info")}>
        <div className={cx("general_info__left")}>
          <Avatar size={96} src={data?.avatar} />
          <div>
            <span className={cx("name")}>{data?.full_name}</span>
            <span className={cx("sub")}>{data?.job_position}</span>
            <span className={cx("address")}>{data?.address}</span>
          </div>
        </div>
        <button onClick={showModal_Avatar} className="btn-edit">
          Edit <CiEdit size={18} />
        </button>
      </div>
      {/* NOTE Social */}
      <div className={cx("social")}>
        <Modal
          title="Thêm liên kết"
          footer={null}
          open={isModalOpenS}
          onCancel={handleCancelS}
        >
          <div className={cx("mds")}>
            {isLoadingSocial && <Loading tip="Đang thêm liên kết!" />}
            <div className={cx("modal_social")}>
              <div className={cx("dropdown")}>
                <span
                  onClick={() => setIsLinkShow(!isLinkShow)}
                  className={cx("select")}
                >
                  <label htmlFor="link">
                    {select} <AiFillCaretDown />
                  </label>
                </span>
              </div>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {link !== "" && select !== "Chọn mạng xã hội" && (
                <BsCheckCircleFill
                  onClick={handleAddSocial}
                  className={cx("btn")}
                  size={24}
                />
              )}
            </div>
            {isLinkShow && (
              <div className={cx("list")}>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Facebook");
                  }}
                >
                  <FaHandPointRight />
                  Facebook
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Gitlab");
                  }}
                >
                  <FaHandPointRight />
                  Gitlab
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Github");
                  }}
                >
                  <FaHandPointRight />
                  Github
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Phone");
                  }}
                >
                  <FaHandPointRight />
                  Phone
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Zalo");
                  }}
                >
                  <FaHandPointRight />
                  Zalo
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Youtube");
                  }}
                >
                  <FaHandPointRight />
                  Youtube
                </span>
                <span
                  onClick={() => {
                    setIsLinkShow(!isLinkShow);
                    setSelect("Twitter");
                  }}
                >
                  <FaHandPointRight />
                  Twitter
                </span>
              </div>
            )}
          </div>
        </Modal>
        <div className={cx("social__header")}>
          <h3>Social network link</h3>
          <button onClick={showModalS} className="btn-edit">
            Add <CiEdit size={18} />
          </button>
        </div>
        {isLoadingDeleteLink && <Loading tip="Đang xóa!" />}
        <div className={cx("social__body")}>
          {user?.social?.map((item) => {
            const name = item?.name;
            return (
              <span key={item._id} className={cx("item")}>
                {socialConstantSetting[name]}{" "}
                <span className={cx("link")}>{item.link}</span>{" "}
                <AiFillDelete
                  onClick={() =>
                    handleDeleteLink(item._id)
                  }
                  className={cx("icon")}
                />
              </span>
            );
          })}
        </div>
      </div>
      <div className={cx("personal_info")}>
        {isLoadingUpdateData && <Loading tip="Đang thay đổi thông tin!" />}
        <Modal
          width={"60%"}
          title="Cập nhật thông tin"
          open={isModalOpen_info}
          onOk={handleOk_info}
          onCancel={handleCancel_info}
          style={{
            top: 10,
          }}
        >
          <div className={cx("modal_info")}>
            <InputUpdate
              onChange={(e) => setInfo({ ...info, full_name: e.target.value })}
              title="Họ và tên"
              data={info?.full_name}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, birtday: e.target.value })}
              title="Ngày sinh (dd/mm/yyyy)"
              data={info?.birtday}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              title="Số điện thoại"
              data={info?.phone}
            />
            <InputUpdate
              onChange={(e) =>
                setInfo({ ...info, job_position: e.target.value })
              }
              title="Vai trò"
              data={info?.job_position}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              title="Địa chỉ (Xã - Huyện - Tỉnh)"
              data={info?.address}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, study: e.target.value })}
              title="Trường học đang học hoặc đã từng"
              data={info?.study}
            />
            <InputUpdate
              onChange={(e) =>
                setInfo({ ...info, classification: e.target.value })
              }
              title="Xếp loại"
              data={info?.classification}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, degree: e.target.value })}
              title="Bằng cấp"
              data={info?.degree}
            />
            <InputUpdate
              type="number"
              onChange={(e) => setInfo({ ...info, gpa: e.target.value })}
              title="Điểm trung bình"
              data={info?.gpa}
            />
            <InputUpdate
              passChildData={setChildData}
              info={info}
              edit={true}
              title="Giới thiệu"
              data={info?.about}
              place={data?.about}
            />
            <InputUpdate
              onChange={(e) => setInfo({ ...info, cv: e.target.value })}
              title="Link tải CV (link Google Drive,..)"
              data={info?.cv}
            />
          </div>
        </Modal>
        <div className={cx("personal_info__header")}>
          <h3>Personal information</h3>
          <button onClick={showModal_info} className="btn-edit">
            Edit <CiEdit size={18} />
          </button>
        </div>
        <div className={cx("personal_info__body")}>
          <InfoTag label="Họ và tên" data={user?.full_name} size="large" />
          <InfoTag label="Ngày sinh" data={user?.birtday} />
          <InfoTag label="Email" data={user?.email} />
          <InfoTag label="Số điện thoại" data={user?.phone} />
          <InfoTag label="Vai trò" data={user?.job_position} />
          <InfoTag label="Địa chỉ" data={user?.address} size="large" />
          <InfoTag
            label="Trường học đang học hoặc đã từng"
            data={user?.study}
          />
          <InfoTag label="Xếp loại" data={user?.classification} />
          <InfoTag label="Bằng cấp" data={user?.degree} />
          <InfoTag label="Điểm trung bình" data={user?.gpa} />
          <InfoTag editor size="large" label="Giới thiệu" data={user?.about} />
          <InfoTag label="CV" data={user?.cv} />
        </div>
      </div>
      <div className={cx("exp")}>
        <Modal
          open={isModalOpen_exp}
          onCancel={handleCancel_exp}
          footer={null}
          width={"90%"}
          style={{
            top: 10,
          }}
        >
          <div className={cx("modal_exp")}>
            {isLoadingUpdateExp && <Loading tip="Đang xử lí yêu cầu!" />}
            {isLoadingRemoveExp && <Loading tip="Đang xử lí yêu cầu!" />}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
              }}
            >
              <span
                onClick={() => setTabUp(1)}
                style={{
                  cursor: "pointer",
                  padding: "5px 10px 5px  10px",
                  color: tabUp === 1 ? "#04f2d6" : "black",
                  border: tabUp === 1 ? "1px solid black" : "none",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
                className={cx("imp")}
              >
                Học Tập
              </span>
              <span
                className={cx("imp")}
                onClick={() => setTabUp(2)}
                style={{
                  cursor: "pointer",
                  padding: "5px 10px 5px  10px",
                  color: tabUp === 2 ? "#04f2d6" : "black",
                  border: tabUp === 2 ? "1px solid black" : "none",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              >
                Kinh nghiệm
              </span>
            </div>
            {tabUp === 1 && (
              <div className={cx("edit_education")}>
                <div className={cx("list")}>
                  {user?.education?.map((item, index) => (
                    <div key={index} className={cx("item")}>
                      <div className={cx("header")}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>
                            <span style={{ fontWeight: "bold" }}>
                              Thời gian:
                            </span>{" "}
                            {item.time}
                          </span>
                          <span>
                            <span style={{ fontWeight: "bold" }}>Tiêu đề:</span>{" "}
                            {item.title}
                          </span>
                        </div>
                        <Popconfirm
                          title="Xóa item!"
                          description="Bạn có muốn xóa item đã chọn không?"
                          onConfirm={() => {
                            handleRemove({ education: { _id: item._id } });
                          }}
                          placement="left"
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: "red",
                              }}
                            />
                          }
                        >
                          <RiDeleteBack2Fill
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </Popconfirm>
                      </div>
                      <div className={cx("body")}>
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Nội dụng:
                        </span>{" "}
                        {parse(item.sub)}
                      </div>
                    </div>
                  ))}
                  <div>
                    <h4 style={{ color: "red" }}>Thêm quá trình học tâp</h4>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
                      }}
                    >
                      <InputUpdate
                        onChange={(e) =>
                          setEdu({ ...edu, time: e.target.value })
                        }
                        title="Thời gian (yyyy-yyyy)"
                      />
                      <InputUpdate
                        onChange={(e) =>
                          setEdu({ ...edu, title: e.target.value })
                        }
                        title="Tiêu đề"
                      />
                      <InputUpdate
                        title="Mô tả"
                        edit
                        passChildData={setChildDataEdu}
                      />
                      <Button
                        onClick={() => handleUpdateExp({ education: edu })}
                        color="#0AEFD8"
                        type="primary"
                      >
                        Thêm dữ liệu
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tabUp === 2 && (
              <div className={cx("edit_education")}>
                <div className={cx("list")}>
                  {user?.experience?.map((item, index) => (
                    <div key={index} className={cx("item")}>
                      <div className={cx("header")}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>
                            <span style={{ fontWeight: "bold" }}>
                              Thời gian:
                            </span>{" "}
                            {item.time}
                          </span>
                          <span>
                            <span style={{ fontWeight: "bold" }}>Tiêu đề:</span>{" "}
                            {item.title}
                          </span>
                        </div>
                        <Popconfirm
                          title="Xóa item!"
                          description="Bạn có muốn xóa item đã chọn không?"
                          onConfirm={() => {
                            handleRemove({ experience: { _id: item._id } });
                          }}
                          placement="left"
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: "red",
                              }}
                            />
                          }
                        >
                          <RiDeleteBack2Fill
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </Popconfirm>
                      </div>
                      <div className={cx("body")}>
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          Nội dụng:
                        </span>{" "}
                        {parse(item.sub)}
                      </div>
                    </div>
                  ))}
                  <div>
                    <h4 style={{ color: "red" }}>Thêm kinh nghiệm</h4>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
                      }}
                    >
                      <InputUpdate
                        onChange={(e) =>
                          setExp({ ...exp, time: e.target.value })
                        }
                        title="Thời gian (yyyy-yyyy)"
                      />
                      <InputUpdate
                        onChange={(e) =>
                          setExp({ ...exp, title: e.target.value })
                        }
                        title="Tiêu đề"
                      />
                      <InputUpdate
                        title="Mô tả"
                        edit
                        passChildData={setChildDataExp}
                      />
                      <Button
                        onClick={() => handleUpdateExp({ experience: exp })}
                        color="#0AEFD8"
                        type="primary"
                      >
                        Thêm dữ liệu
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
        <div className={cx("exp__header")}>
          <h3>Experience</h3>
          <button onClick={showModal_exp} className="btn-edit">
            Edit <CiEdit size={18} />
          </button>
        </div>
        <div className={cx("exp__body")}>
          <div className={cx("body__block")}>
            <h4>Học tập</h4>
            <Collapse style={{ width: "100%" }}>
              {user?.education?.map((item, index) => (
                <Panel
                  header={
                    <span style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontWeight: "bold" }}>{item.time}</span>
                      <span>{item.title}</span>
                    </span>
                  }
                  key={index}
                >
                  {parse(item?.sub)}
                </Panel>
              ))}
            </Collapse>
          </div>
          <div className={cx("body__block")}>
            <h4>Kinh nghiệm</h4>
            <Collapse style={{ width: "100%" }}>
              {user?.experience?.map((item, index) => (
                <Panel
                  header={
                    <span style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontWeight: "bold" }}>{item.time}</span>
                      <span>{item.title}</span>
                    </span>
                  }
                  key={index}
                >
                  {parse(item?.sub)}
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
      <div className={cx("skill")}>
        <Modal
          open={isModalOpen_skill}
          onOk={handleOk_skill}
          onCancel={handleCancel_skill}
          footer={null}
        >
          <div className={cx("modal_skill")}>
            {isLoadingUpdateSkill && <Loading tip="Đang xử lí yêu cầu!" />}
            <h4>Danh sách kỹ năng</h4>
            <div className={cx("list")}>
              {numSkill.map((item) => (
                <Button
                  key={item.num}
                  onClick={() =>
                    user?.skill?.includes(item.num)
                      ? handleRemove({ skill: item.num })
                      : handleUpdateSkill({ skill: item.num })
                  }
                  type={user?.skill?.includes(item.num) ? "primary" : "default"}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </Modal>
        <div className={cx("skill__header")}>
          <h3>Skill</h3>
          <button onClick={showModal_skill} className="btn-edit">
            Edit <CiEdit size={18} />
          </button>
        </div>
        <div className={cx("skill__body")}>
          {user?.skill?.map((item) => (
            <div key={item}>{Object.values(skillConstant)[item]}</div>
          ))}
        </div>
        <Modal
          open={isModalOpen_skill1}
          onOk={handleOk_skill1}
          onCancel={handleCancel_skill1}
          footer={null}
          width={"90%"}
        >
          <div className={cx("modal_skill1")}>
            <div className={cx("block")}>
              <InputUpdate
                edit
                data={skill?.hardSkill}
                place={data?.hard_skill}
                title="Hard Skill"
                passChildData={setChildDataHK}
              />
              <Button
                onClick={() =>
                  handleUpdateInput({ hard_skill: skill?.hardSkill })
                }
                style={{ width: "100%", marginTop: 20 }}
                type="primary"
                danger
              >
                Cập nhật
              </Button>
            </div>
            <div className={cx("block")}>
              <InputUpdate
                edit
                data={skill?.softSkill}
                place={data?.soft_skill}
                title={"Soft Skill"}
                passChildData={setChildDataSK}
              />
              <Button
                onClick={() =>
                  handleUpdateInput({ soft_skill: skill?.softSkill })
                }
                style={{ width: "100%", marginTop: 20 }}
                type="primary"
                danger
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </Modal>
        <div className={cx("skill__body")}>
          <div className={cx("skill__header")}>
            <p></p>
            <button onClick={showModal_skill1} className="btn-edit">
              Edit <CiEdit size={18} />
            </button>
          </div>
          <Collapse style={{ width: "100%" }}>
            <Panel
              header={
                <span style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontWeight: "bold" }}>Hardskill</span>
                </span>
              }
              key="1"
            >
              <div>{parse(data?.hard_skill)}</div>
            </Panel>
            <Panel
              header={
                <span style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontWeight: "bold" }}>Softskill</span>
                </span>
              }
              key="2"
            >
              <div>{parse(data?.soft_skill)}</div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className={cx("skill")}>
        <Modal
          open={isModalOpen_project}
          onOk={handleOk_project}
          onCancel={handleCancel_project}
          footer={null}
          width={"90%"}
          title="Thêm dự án"
          style={{ top: 10 }}
        >
          <div className={cx("modal_project")}>
            {isLoadingAdd && <Loading tip="Đang thêm dự án!" />}
            <div className={cx("block")}>
              <div className={cx("box-image")}>
                <input
                  onChange={handleChnageProject}
                  id="project-img"
                  type="file"
                />
                <label htmlFor="project-img">
                  <MdCloudUpload size={32} />
                </label>
                {dataProject.image && <img alt="?" src={dataProject.image} />}
              </div>
              <div className={cx("info")}>
                <InputUpdate
                  data={dataProject.name}
                  onChange={(e) =>
                    setDataProject({ ...dataProject, name: e.target.value })
                  }
                  title="Tên dự án"
                />
                <InputUpdate
                  data={dataProject.type}
                  onChange={(e) =>
                    setDataProject({ ...dataProject, type: e.target.value })
                  }
                  title="Loại dự án (cá nhân || nhóm)"
                />
                <InputUpdate
                  place={dataProject.responsibility}
                  passChildData={setChildShort}
                  edit
                  title="Mô tả ngắn (liệt kê công nghệ sử dụng)"
                />
              </div>
            </div>
            <div className={cx("block")}>
              <InputUpdate
                place={dataProject.website_functionality}
                passChildData={setChildDesc}
                edit
                title="Mô tả dự án"
              />
            </div>
            <Button
              onClick={() =>
                mutationProject.mutate({
                  id: data?.id,
                  data: { project: dataProject },
                })
              }
              style={{ width: 120, marginLeft: "auto" }}
              type="primary"
            >
              Thêm dự án
            </Button>
          </div>
        </Modal>
        <div className={cx("skill__header")}>
          <h3>Project</h3>
          <button onClick={showModal_project} className="btn-edit">
            Add <CiEdit size={18} />
          </button>
        </div>
        <div className={cx("skill__body")}>
          {data?.project?.map((item) => (
            <ProjectItem key={item?._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const InfoTag = ({ label, data, size = "default", editor = false }) => {
  const wrapper = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: size === "large" ? "100%" : "calc(50% - 10px)",
  };
  return (
    <div style={wrapper}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "rgba(177, 172, 172, 0.9)",
        }}
      >
        {label}
      </span>
      {editor === true ? (
        <div>{data && parse(data)}</div>
      ) : (
        <span style={{ fontWeight: 500 }}>
          {data?.length < 1 ? "Chưa cập nhật" : data}
        </span>
      )}
    </div>
  );
};
