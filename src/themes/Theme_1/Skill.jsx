import React from 'react'
import stylesCpn from "./styleCpn.module.scss"
import classNames from 'classnames/bind'
import { skillConstant } from '../../constants'
import { Fade, Roll } from 'react-awesome-reveal'
import parse from "html-react-parser"

const cx = classNames.bind(stylesCpn)

export default function Skill(props) {
  const {data} = props
  return (
    <div id='skill' name="skill" className={cx("skill")}>
      <h2>Skill</h2>
      <div className={cx("list-skill")}>
       <Roll>
       {data?.skill?.map((item) =><p key={item}>{Object.values(skillConstant)[item]}</p>)}
       </Roll >
      </div>
      <div className={cx("content")}>
        <div className={cx("block")}>
          <h3>Hardskill</h3>
         <Fade cascade>
       {data && parse(data?.hard_skill || "")}
         </Fade>
        </div>
        <div className={cx("block")}>
          <h3>Softskill</h3>
        <Fade cascade>
    {data && parse(data?.soft_skill || "")}
        </Fade >
        </div>
      </div>
    </div>
  )
}
