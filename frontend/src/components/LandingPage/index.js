import { useState } from "react"
import { useDispatch } from "react-redux"
import { createRoom, joinRoom } from "../../store/rooms"




export default function LandingPage() {
  const dispatch = useDispatch()


  const onRandom = async (e) => {

  }

  return (
    <>
      <div>LandingPage</div>
      <input />
      <button
        onClick={onRandom}
      >
        random
      </button>
    </>
  )
}
