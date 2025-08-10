"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DateTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      setIsDayTime(hour >= 6 && hour < 19); // Daytime: 6 AM to 6:59 PM
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    hours = hours % 12 || 12;
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <StyledWrapper isDay={isDayTime}>
      <div className="card">
        <p className="time-text">
          <span>{formatTime(currentTime)}</span>
          <span className="time-sub-text">
            {currentTime.getHours() >= 12 ? "PM" : "AM"}
          </span>
        </p>
        <p className="day-text">{formatDate(currentTime)}</p>
        <div className="icon">
          {isDayTime ? <span className="text-4xl">☀️</span> : <span className="text-4xl">🌙</span>}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ isDay: boolean }>`
  .card {
    width: 255px;
    height: 120px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    position: relative;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    padding: 0 1rem;

    background: ${({ isDay }) =>
      isDay
    ? "linear-gradient(to right, #00b4d8, #caf0f8)"
    : "linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))" 
   };

    color: ${({ isDay }) => (isDay ? "#000" : "#fff")};
  }

  .time-text {
    font-size: 50px;
    margin-top: 0px;
    margin-left: 15px;
    font-weight: 600;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .time-sub-text {
    font-size: 15px;
    margin-left: 5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .day-text {
    font-size: 18px;
    margin-top: 0px;
    margin-left: 15px;
    font-weight: 500;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .icon {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 24px;
    transition: all 0.3s ease-in-out;
  }

  .card:hover .icon {
    font-size: 27px;
  }
`;

export default DateTimeCard;
