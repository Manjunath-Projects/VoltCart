import React from 'react'
import "../style/title.css"
const Title = ({ text1, text2}) => {
  return (
    <div className="title-container">
      <p className="title-text">{text1} <span className="title-highlight">{text2}</span></p>
    </div>
  )
}

export default Title;
