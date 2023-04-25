import { Spin } from 'antd'
import React from 'react'

export default function Loading({tip}) {
    const styles ={
        spin: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#9e9a9a60",
            zIndex: 99999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }
    }
  return (
    <div style={styles.spin}>
        <Spin size='large' tip={tip}></Spin>
    </div>
  )
}
