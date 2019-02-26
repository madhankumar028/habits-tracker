import React, { useEffect, useState } from "react";

import AddHabit from "../AddHabit";
import HabitActions from "../HabitActions";
import localStorageUtils from "../localStorageUtils";

import AddSVG from "./add.svg";
import TickSVG from "./tick.svg";

import "./styles.scss";

const Habits = props => {
  const [state, setState] = useState({
    habits: props.habits,
    show: false,
    actions: false,
    selected: {}
  });

  const { habits, show, actions, selected } = state;

  useEffect(() => {
    setState({
      ...state,
      habits: props.habits
    });
  }, [props.habits]);

  const updatedHabit = currentHabit => {
    let updateKey = null;
    habits.forEach(habit => {
      if (habit.id === currentHabit.id) {
        updateKey = habit.createdDate;
        habit.done = !habit.done;
        if (habit.done) habit.steaks = 1;
        else {
          habit.steaks -= 1;
        }
      }
    });
    if (updateKey) {
      localStorageUtils.update(updateKey, habits);
      setState({ ...state, habits });
    }
  };

  const onHabitAdd = habits => {
    setState({ habits, show: false });
  };

  const onUpdate = habits => {
    setState({ ...state, habits, actions: false, selected: {} });
  };

  const renderHabits = () => {
    if (!habits.length) {
      return (
        <div className="Habits__empty">
          <h2>
            Add a new habit
            <span role="img" aria-label="geeky emoji">
              🤓
            </span>
          </h2>
        </div>
      );
    }

    return (
      <>
        {habits.map(habit => {
          return (
            <div className="card" key={habit.id}>
              <div className="card__left">
                <label className="card__checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={habit.done}
                    onClick={() => {
                      updatedHabit(habit);
                    }}
                  />
                  <span>
                    <img src={TickSVG} alt="done" />
                  </span>
                </label>

                <div className="card__info">
                  <h3 className="name">{habit.name}</h3>
                  <span className="time">{habit.time}</span>
                  <span className="notes">{habit.notes}</span>
                </div>
              </div>
              <div className="card__right">
                <span className="steaks">{habit.steaks} in a row</span>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="Habits">
      {renderHabits(habits)}
      <div className="AddHabits">
        <button onClick={() => setState({ ...state, show: !show })} className="primary">
          <img src={AddSVG} alt="Add" /> Add Habits
        </button>
      </div>

      <AddHabit
        onClose={() => {
          setState({ ...state, show: !show });
        }}
        show={show}
        onAdd={onHabitAdd}
      />

      <HabitActions
        onClose={() => {
          setState({ ...state, actions: !actions });
        }}
        show={actions}
        selected={selected}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default Habits;
