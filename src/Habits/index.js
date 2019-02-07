import React from "react";

import tickSVG from "./tick.svg";

import "./styles.scss";

const Habits = props => {
  if (!props.habits.length)
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

  return (
    <div className="Habits">
      {props.habits.map(habit => {
        return (
          <div className="card" key={habit.id}>
            <div className="card__left">
              <label className="card__checkbox">
                <input type="checkbox" checked={habit.done} />
                <span>
                  <img src={tickSVG} alt="done" />
                </span>
              </label>

              <div className="card__info">
                <h3 className="name">{habit.name}</h3>
                <span className="time">{habit.time}</span>
              </div>
            </div>
            <div className="card__right">
              <span className="steaks">2 in a row</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Habits;
