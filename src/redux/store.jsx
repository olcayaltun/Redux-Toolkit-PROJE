import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../redux/slice/ModalSlicer";

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;
