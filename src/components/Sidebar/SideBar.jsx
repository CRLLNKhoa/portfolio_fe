import React from 'react'
import classNames from 'classnames/bind'
import styles from "./SideBar.module.scss"
import {AiFillSetting, AiFillMessage} from "react-icons/ai"
import {FaUserCircle} from "react-icons/fa"

const cx = classNames.bind(styles)

export default function SideBar({tab,onChange,totalMessage}) {
  return (
    <div className={cx("wrapper")}>
        <span onClick={()  => onChange(1)} className={cx(tab === 1 && "active")}><AiFillSetting style={{marginRight: 5}} />Cài đặt chung</span>
        <span onClick={()  => onChange(2)} className={cx(tab === 2 && "active")}><FaUserCircle style={{marginRight: 5}} />Thông tin cá nhân</span>
        <span onClick={()  => onChange(3)} className={cx(tab === 3 && "active")}><AiFillMessage style={{marginRight: 5}} />Tin nhắn liên hệ <span className={cx("badge")}>{totalMessage}</span></span>
    </div>
  )
}
