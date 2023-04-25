import React, { useEffect, useState } from "react";
import styles from "./InputUpdate.module.scss";
import classNames from "classnames/bind";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const cx = classNames.bind(styles);

export default function InputUpdate({
  onChange,
  id,
  type = "text",
  name,
  title,
  edit=false,
  changeEdit,
  info,
  key,
  passChildData,
  data,
  place
}) 
{
  const functionHandler = (data) => {
    passChildData(data);   
    }
  return (
    <div className={cx("wrapper")}>
      <label>{title}</label>
      {edit ? <CKEditor
        editor={ClassicEditor}
        data={place}
        onChange={(event,editor) => {
          const data = editor.getData();
          functionHandler(data)
        }}
      /> : <input value={data} type={type} onChange={onChange} />}
    </div>
  );
}
