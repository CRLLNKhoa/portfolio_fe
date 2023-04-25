import React from 'react'
import classNames from 'classnames/bind'
import styles from "./InputComponent.module.scss"

const cx = classNames.bind(styles)

export default function InputComponent(props) {
    const { icon , label,value, type , name,onChange,id,errorMessage} = props
  return (
    <div style={{borderBottom: `2px solid ${errorMessage ? "red" : "#34c595"}`}} className={cx("wrapper")}>
        <label htmlFor={id}>{label}<span style={{marginLeft: 10,color: "red",fontSize: 8}}>{errorMessage}</span></label>
        <span  className={cx("icon")}>{icon}</span>
        <input value={value} name={name} onChange={onChange} id={id} type={type} />
    </div>
  )
}
