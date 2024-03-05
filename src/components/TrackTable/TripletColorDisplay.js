import React from 'react';

const TripletColorDisplay = (props) => {
  const { colors, left, middle, right } = props;
  return (
    <div className="track-data-square">
      <div className="track-data-triangle-left-data"
           style={{ backgroundColor: colors.left }} >
        {left}
      </div>
      <div className="track-data-triangle track-data-triangle-left-pad"
           style={{ borderBottomColor: colors.left }} />
      <div className="track-data-triangle track-data-triangle-middle-data"
           style={{ backgroundColor: colors.middle }} >
        {middle}
      </div>
      <div className="track-data-triangle track-data-triangle-middle-pad"
           style={{ borderBottomColor: colors.middle }} />
      <div className="track-data-triangle track-data-triangle-right-data"
           style={{ backgroundColor: colors.right }} >
        {right}
      </div>
      <div className="track-data-triangle track-data-triangle-right-pad"
           style={{ borderBottomColor: colors.right }} />
    </div>
  );
};

export default TripletColorDisplay;