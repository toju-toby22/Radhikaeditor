import React from 'react'
import image from "./Assets/first-image.jpeg"
import "./style.css"
const HomePage = () => {
  return (
    <div className='contain'>
        <div className="image_container">
            <img  className='image' src={image} alt="" />
            <h1>MY Radhikar Editor</h1>
        </div>
    </div>
  )
}

export default HomePage