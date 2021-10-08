import React from 'react'
import axios from 'axios'
const FeachData = () => {
  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:3000/v1/users')
      console.log(res.data)
    } catch (error) {
      console.log("🚀 ~ file: FeachData.tsx ~ line 9 ~ handleClick ~ error", error)
    }
  };
  return (
    <div>
      <h1>Fetch Data</h1>
      <button
        onClick={handleClick}
      >
        button
      </button>
    </div>
  )
}

export default FeachData
