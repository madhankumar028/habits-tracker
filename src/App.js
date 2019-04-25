import { createGlobalStyle } from 'styled-components'
import { useDispatch, useMappedState } from 'redux-react-hook'
import React, { useCallback, useEffect } from 'react'

import { Button, Title } from './Components'
import AddHabits from './AddHabits'
import AllHabits from './AllHabits'
import Calender from './Calender'
import constants from './constants'
import db from './database'
import Habits from './Habits'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root, .App {
    height: 100%;
  }

  body {
    background-color: #f7f7f7;
    color: #272730;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 500;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  h1 {
    font-size: 28px;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .form__days {
    min-width: 300px;
    max-width: 350px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      width: 40px;
      height: 40px;
      background-color: #EEEEEE;
      border-radius: 50%;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: space-around;

      &.active {
        background-color: #2974ff;
        color: #fff;
      }
    }
  }

  button {
    width: 50%;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    margin: 5px 0;
    cursor: pointer;
    margin-top: 15px;
    user-select: none;
  }

  button + button {
    margin-left: 20px;
  }

  .readonly {
    opacity: 0.6;
    pointer-events: none;
  }
`

const App = () => {
  const dispatch = useDispatch()
  const mapState = useCallback(
    state => ({
      habits: state.habits,
      showToday: state.showToday,
      isAllHabitsModalVisible: state.isAllHabitsModalVisible,
      selectedDate: state.selectedDate,
      selectedHabit: state.selectedHabit
    }),
    []
  )

  const { habits, isAllHabitsModalVisible, showToday, selectedHabit, selectedDate } = useMappedState(mapState)

  useEffect(() => {
    getAndSaveHabitsToStore()
  })

  const getAndSaveHabitsToStore = async () => {
    const habits = await db.habits.toArray()
    dispatch({ type: constants.HABITS, payload: habits })
  }

  const onClickAllHabits = () => {
    dispatch({ type: constants.TOGGLE_ALL_HABITS_MODAL, payload: true })
  }

  const goToToday = () => {
    dispatch({ type: constants.GO_TO_TODAY, payload: true })
  }

  return (
    <div className="App">
      <GlobalStyles />
      <Title
        onClick={() => {
          goToToday()
        }}
      >
        My Habits{' '}
        <Button
          appearance="primary"
          size="small"
          onClick={() => {
            onClickAllHabits()
          }}
        >
          All Habits
        </Button>
      </Title>
      <Calender showToday={showToday} />
      <AddHabits onUpdate={getAndSaveHabitsToStore} selectedHabit={selectedHabit} />
      <Habits allHabits={habits} selectedDate={selectedDate} onUpdate={getAndSaveHabitsToStore} />
      <AllHabits show={isAllHabitsModalVisible} />
    </div>
  )
}

export default App
