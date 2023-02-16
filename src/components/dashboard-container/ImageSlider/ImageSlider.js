import React, { useEffect, useState } from "react";
import "../ImageSlider/ImageSlider.scss";
const Image1 = require("../../../assets/symbol.jpg");
const Image2 = require("../../../assets/reactworld.png");
const Image3 = require("../../../assets/closure.png");
const Image4 = require("../../../assets/life.jpg");
const Image5 = require("../../../assets/coder.jpg");
const leftArrow = require("../../../assets/leftArrow.jpg");
const RightArrow = require("../../../assets/RightArrow.jpg");
const ImageSlider = () => {
  const Images = [Image1, Image2, Image3, Image4, Image5];
  const [count, setCount] = useState(0);
  const [leftInterval, setLeftInterval] = useState("");
  const [rightInterval, setRightInterval] = useState("");
  const forwardIntervalHandler = () => {
    stopInterval();
    const IntervalId = setInterval(() => {
      setCount((prev) => {
        if (Images.length === prev + 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
    setLeftInterval(IntervalId);
  };
  const backwardIntervalHandler = () => {
    stopInterval();
    const IntervalId = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          return Images.length - 1;
        }
        return prev - 1;
      });
    }, 2000);
    setRightInterval(IntervalId);
  };
  const stopInterval = () => {
    const interval_id = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    clearInterval(leftInterval);
    setLeftInterval("");
    clearInterval(rightInterval);
    setRightInterval("");
  };
  useEffect(() => {
    forwardIntervalHandler();
  }, []);

  return (
    <>
      <div className="imageSliderConatiner">
        <img
          className="arrow leftArrow"
          src={leftArrow}
          onClick={backwardIntervalHandler}
          alt="leftArrow"
        />

        <img
          id="leftArrow"
          onClick={forwardIntervalHandler}
          className="arrow RightArrow"
          src={RightArrow}
          alt="RightArrow"
        />
        {count}
        <img className="sliderImages" src={Images[count]} alt="sliderImages" />
      </div>
      <div className="actionsButton">
        {/* <button
          type="button"
          onClick={forwardIntervalHandler}
          className="greenColor"
        >
          Left To Right
        </button> */}
        <button
          type="button"
          onClick={() => {
            stopInterval();
          }}
          className="redColor"
        >
          stop
        </button>
        {/* <button
          type="button"
          onClick={backwardIntervalHandler}
          className="rightToLeft"
        >
          Right to Left
        </button> */}
      </div>
    </>
  );
};
export default ImageSlider;
