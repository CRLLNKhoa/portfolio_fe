import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isAdmin: false,
  theme: 1,
  status: true,
  create: false,
  slug: "",
  avatar: "",
  email: "",
  password: "",
  full_name: "",
  about: "",
  job_position: "",
  birtday: "",
  address: "",
  phone: "",
  study: "",
  degree: "",
  classification: "",
  gpa: 0,
  cv: "",
  experience: [
    {
      time: "",
      title: "",
      sub: "",
    },
  ],
  education: [
    {
      time: "",
      title: "",
      sub: "",
    },
  ],
  skill: [
    {
      name: "",
    },
  ],
  hard_skill: "",
  social: "",
  soft_skill: "",
  project: [
    {
      name: "",
      type: "",
      image: "",
      responsibility: "",
      website_functionality: "",
      demo: [
        {
          title: "",
          video: "",
        },
      ],
      link: "",
      account: "",
    },
  ],
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        isAdmin,
        theme = 1,
        status = true,
        create = false,
        slug = "",
        email = "",
        password = "",
        full_name = "",
        about = "",
        job_position = "",
        birtday = "",
        address = "",
        phone = "",
        study = "",
        degree = "",
        classification = "",
        gpa = "",
        cv = "",
        experience = "",
        education="",
        skill = "",
        hard_skill = "",
        soft_skill = "",
        project = "",
        _id = "",
        avatar = "",
        social =""
      } = action.payload;
      state.id = _id;
      state.social = social;
      state.isAdmin = isAdmin;
      state.theme = theme;
      state.status = status;
      state.create = create;
      state.slug = slug;
      state.email = email;
      state.password = password;
      state.full_name = full_name;
      state.about = about;
      state.job_position = job_position;
      state.birtday = birtday;
      state.address = address;
      state.phone = phone;
      state.study = study;
      state.degree = degree;
      state.classification = classification;
      state.gpa = gpa;
      state.cv = cv;
      state.experience = experience;
      state.education =  education;
      state.skill = skill;
      state.hard_skill = hard_skill;
      state.soft_skill = soft_skill;
      state.project = project;
      state.avatar = avatar;
    },
    resetUser: (state) => {
      state.isAdmin = false;
      state.theme = 1;
      state.status = true;
      state.create = false;
      state.slug = "";
      state.email = "";
      state.password = "";
      state.full_name = "";
      state.about = "";
      state.job_position = "";
      state.birtday = "";
      state.address = "";
      state.phone = "";
      state.study = "";
      state.degree = "";
      state.classification = "";
      state.gpa = 0;
      state.cv = "";
      state.experience = "";
      state.skill = "";
      state.hard_skill = "";
      state.soft_skill = "";
      state.project = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
