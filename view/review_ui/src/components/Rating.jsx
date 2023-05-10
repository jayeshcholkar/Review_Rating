import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {
  console.log(props);
  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <label key={idx}>
            <input
              type="radio"
              className="hidden"
              name="rating"
              onChange={() => props.setRating(idx)}
              value={props.ratingValue}
              checked={idx === props.ratingValue}
            />
            <FaStar color={idx < props.ratingValue ? "#01af93" : "#bbb"} />
          </label>
        ))}
    </div>
  );
};


export const RatingContainer = () => {
  const [rate, setRate] = useState(5);

  return (
    <div>
      <StarRating setRating={(val) => setRate(val)} ratingValue={rate} />
    </div>
  );
};