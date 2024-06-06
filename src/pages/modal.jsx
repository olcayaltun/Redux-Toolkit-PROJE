import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { ekle, sil, güncelle } from "../redux/slice/ModalSlicer";
import { MdAddAPhoto } from "react-icons/md";
import { DollarCircle } from "iconsax-react";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // Sıralama düzeni için state
  const modalState = useSelector((store) => store.modal.list);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = {
          ...Object.fromEntries(formData.entries()),
          file: reader.result,
        };
        if (editItem) {
          dispatch(güncelle({ id: editItem.id, ...data }));
        } else {
          dispatch(ekle(data));
        }
        setOpen(false);
        setEditItem(null);
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      const data = Object.fromEntries(formData.entries());
      if (editItem) {
        dispatch(güncelle({ id: editItem.id, ...data }));
      } else {
        dispatch(ekle(data));
      }
      setOpen(false);
      setEditItem(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleItemChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSortOrder(event.target.value);
    console.log("Sort order changed to: ", event.target.value);
  };

  const filteredItems = modalState
    .filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    .sort((a, b) => {
      const x = Number(a.text);
      const y = Number(b.text);
      if (sortOrder === "artan") {
        return y - x;
      } else if (sortOrder === "azalan") {
        return x - y;
      }
      return 0; // Eğer sortOrder boş ise sıralama yapma
    });
  console.log(modalState);
  return (
    <div>
      <div className="item">
        <select value={sortOrder} onChange={handleSelectChange} className="slc">
          <option value="">Seçiniz</option>
          <option value="artan">ARTAN</option>
          <option value="azalan">AZALAN</option>
        </select>
        <input
          value={inputValue}
          className="inp"
          placeholder="Arama Yapiniz"
          onChange={handleItemChange}
        />
        <Button
          variant="primary"
          onClick={() => {
            setOpen(!open);
            setEditItem(null);
          }}
        >
          <MdAddAPhoto size={40} className="" />
        </Button>
      </div>
      <div className="das">
        {filteredItems.map((dt) => (
          <div key={dt.id}>
            <div className="kas">
              {dt.file && (
                <img
                  src={dt.file}
                  alt="Seçilen Dosya"
                  style={{ maxWidth: "300px", marginTop: "10px" }}
                />
              )}
              <div className="editBtn">
                <button onClick={() => dispatch(sil(dt.id))} className="bt">
                  Sil
                </button>
                <button
                  onClick={() => {
                    setEditItem(dt);
                    setOpen(true);
                  }}
                  className="ed"
                >
                  Güncelle
                </button>
              </div>
            </div>
            <div className="pas">
              <p>{dt.name}</p>
              <p className="tr">
                {dt.text}{" "}
                <DollarCircle size="24" color="#34A853" variant="Bold" />
              </p>
              <p>{dt.date}</p>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <form className="frm" onSubmit={handleSubmit}>
          <input
            className="inpA"
            name="name"
            type="text"
            defaultValue={editItem ? editItem.name : ""}
            placeholder="Eser Adi Girin"
            required
          />
          <input
            name="text"
            type="number"
            defaultValue={editItem ? editItem.text : ""}
            placeholder="Eser Fiyati Giriniz"
            required
          />
          <input type="file" name="file" onChange={handleFileChange} />
          <input
            name="date"
            type="date"
            defaultValue={editItem ? editItem.date : ""}
            required
          />
          <button type="submit">{editItem ? "Güncelle" : "Gönder"}</button>
        </form>
      )}
    </div>
  );
};

export default Modal;
