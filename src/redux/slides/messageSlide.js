import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notSeen: {
    data: [],
    total: 0,
  },
  seen: {
    data: [],
    total: 0,
  },
};

export const messageSlide = createSlice({
  name: "message",
  initialState,
  reducers: {
    notSeenUpdate: (state, action) => {
      const { data, total } = action.payload;
      state.notSeen.total = total
      state.notSeen.data  =  data;
    },
    seenUpdate: (state, action) => {
      const { data, total } = action.payload;
      state.seen = {
        data: data,
        total: total,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { notSeenUpdate, seenUpdate } = messageSlide.actions;

export default messageSlide.reducer;
