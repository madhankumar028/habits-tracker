import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'redux-react-hook'

import AddSVG from './add.svg'
import EditSVG from './edit.svg'
import AllSVG from './all.svg'
import constants from '../constants'

const IntroScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  padding: 20px;

  h1 {
    margin-top: 20px;
    font-size: 40px !important;
  }

  h1,
  h2,
  > p {
    text-align: center;
  }

  h2 {
    margin-top: 5px;
    color: #0d61fd;
    font-size: 29px !important;
  }

  > p {
    font-size: 16px;
    line-height: 25px;
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
  }

  ul {
    font-size: 17px;
    text-align: left;
    max-width: 360px;
    margin: 0 auto;
    margin-top: 30px;
  }

  li {
    padding-top: 30px;
    display: flex;
  }

  button {
    display: block;
    margin: 50px auto;
    background-color: #0d61fd;
    color: #fff;
    font-size: 17px;
    border: 1px solid #0d61fd;
    max-width: 360px;
    text-transform: uppercase;
    font-weight: 600;
  }

  li b {
    font-size: 17px;
  }

  li p {
    margin-top: 6px;
    line-height: 25px;
    font-size: 15px;
    width: 90%;
  }

  img {
    width: 60px;
    height: 60px;
    margin-top: 10px;
  }

  li div:last-child {
    margin-left: 35px;
  }

  li div:first-child {
    margin-left: 10px;
  }
`

const IntroScreen = props => {
  const dispatch = useDispatch()

  const hideIntroScreen = () => {
    dispatch({ type: constants.HIDE_INTRO_SCREEN, payload: false })
    window.localStorage.setItem('showIntroScreen', false)
  }

  return (
    <IntroScreenContainer>
      <h1>Welcome to</h1>
      <h2>Habits Tracker</h2>
      <p>An awesome tool to help you to form or keep track of your existing habits.</p>
      <ul>
        <li>
          <div>
            <img src={AddSVG} alt="Add" />
          </div>
          <div>
            <b>Add any habits</b>
            <p>Create or add any of your habits with time and day to track it.</p>
          </div>
        </li>
        <li>
          <div>
            <img src={EditSVG} alt="Edit" />
          </div>
          <div>
            <b>Edit habits</b>
            <p>Want to change an habit, edit it by press and an holding the habit card.</p>
          </div>
        </li>
        <li>
          <div>
            <img src={AllSVG} alt="All" />
          </div>
          <div>
            <b>All habits</b>
            <p>See all the habits sorted by month in all habits.</p>
          </div>
        </li>
      </ul>
      <button onClick={hideIntroScreen}>Continue</button>
    </IntroScreenContainer>
  )
}

export default IntroScreen