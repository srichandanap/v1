import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: [],
  video: [],
  lessonId: [],
  modalDetails: [],
  initVideo: [],
  totalQuestions: [],
  testName: [],
  assignId: [],
  result: [],
  chapName: [],
  courseName: [],
  chapNum: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.id = action.payload;
      console.log(state.id);
      localStorage.setItem("courseId", JSON.stringify(state.id));
    },

    addVideo: (state, action) => {
      state.video = action.payload;
      console.log(state.video);
      localStorage.setItem("video", JSON.stringify(state.video));
    },
    
    addLessonId: (state, action) => {
      state.lessonId = action.payload;
      // console.log(state.video);
      // localStorage.setItem("video", JSON.stringify(state.video));
    },

    addModal: (state, action) => {
      state.modalDetails = action.payload;
      console.log(state.modalDetails);
      // localStorage.setItem("video", JSON.stringify(state.video));
    },

    addInitVideo: (state, action) => {
      state.initVideo = action.payload;
      console.log(state.initVideo);
      // localStorage.setItem("video", JSON.stringify(state.video));
    },

    addtotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
      // console.log(state.totalQuestions);
      localStorage.setItem("tq", JSON.stringify(state.totalQuestions));
     
    },
   
    addtestName: (state, action) => {
      state.testName = action.payload;
      console.log(state.testName);
     
    },

    addAssignId: (state, action) => {
      state.assignId = action.payload;
      // console.log(state. assignId);
      localStorage.setItem("assignId", JSON.stringify( state.assignId));
     
    },

    pushResult: (state, action) => {
      state.result.push(action.payload);
    //  console.log(state.result)
    },

    addChapName: (state, action) => {
      state.chapName = action.payload;
      // console.log(state. assignId);
      localStorage.setItem("chapName", JSON.stringify(state.chapName));
     
    },

    addCourseName: (state, action) => {
      state.courseName = action.payload;
      // console.log(state. assignId);
      localStorage.setItem("courseName", JSON.stringify(state.courseName));
     
    },

    addChapNumber: (state, action) => {
      state.chapNum = action.payload;
      // console.log(state. assignId);
      localStorage.setItem("chapNumber", JSON.stringify(state.chapNum));
     
    },

  },
});

export const { addId, addVideo, addLessonId, addModal, addInitVideo, addtotalQuestions, addtestName, addAssignId, pushResult, addChapName, addCourseName, addChapNumber } = courseSlice.actions;

export default courseSlice.reducer;
