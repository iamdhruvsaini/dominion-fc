import React from 'react'

const PopupSelect = (props) => {
  if(props.trigger){
    return <>{props.children}</>
  }
  return ""
}

export default PopupSelect