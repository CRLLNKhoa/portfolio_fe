import React from 'react'
import stylesCpn from "./styleCpn.module.scss"
import classNames from 'classnames/bind'
import { socialConstant, socialConstantSetting } from '../../constants'

const cx = classNames.bind(stylesCpn)

export default function Home(props) {
  const {data} = props
  return (
    <div name="hone" id='home' className={cx("home")}>
        <div className={cx("avatar")} style={{backgroundImage: `url("${data?.avatar}")`}}>
        </div>
        <div className={cx("info")}>
            <span className={cx("name")}>{data?.full_name}</span>
            <span className={cx("short-about")}>{data?.job_position}</span>
            <span className={cx("hello")}>Welcome to visit my portfolio</span>
            <div className={cx("list-social")}>
                {data?.social?.map(item =>  <a rel={'noreferrer'} title={item.name} href={`${item.link}`}  target="_blank"  >{socialConstantSetting[item.name]}</a>)}
            </div>
        </div>
    </div>
  )
}
