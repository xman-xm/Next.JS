import React from 'react'
import * as ReactLoading from "react-loading";

export default function Spinner() {
  return (
            <div className="flex justify-center items-center h-screen">
   <ReactLoading.default type="spin" color="blue" />

    </div>
  )
}
