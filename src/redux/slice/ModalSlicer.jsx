import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // UUID'yi doğru bir şekilde içe aktarıyoruz

const ModalSlicer = createSlice({
  name: "modal",
  initialState: {
    list: [],
  },
  reducers: {
    ekle: (state, action) => {
      action.payload.id = uuidv4(); // UUID kullanarak benzersiz bir id atıyoruz
      state.list.push(action.payload);
    },
    sil: (state, action) => {
      const filtered = state.list.filter((i) => i.id !== action.payload);
      state.list = filtered;
      //const i = state.list.findIndex((i) => i.id === action.payload);
      //state.list.splice(i, 1);
    },
    güncelle: (state, action) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      state.list.splice(index, 1, action.payload);
    },
  },
});

export default ModalSlicer.reducer;
export const { ekle, sil, güncelle } = ModalSlicer.actions;
