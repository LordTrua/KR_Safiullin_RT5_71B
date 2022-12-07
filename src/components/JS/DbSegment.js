import { useState } from 'react';
import { useSpring } from 'react-spring';
import '../styles/style.css';

export default function DbSegment(segmentNumber = 0) {
  const [styleDataSigment, apiDataSigment] = useSpring(() => ({
    margin: 20,
    width: 300,
    height: 80,
    backgroundColor: 'rgb(160, 101, 120)',
    borderRadius: 16,
    opacity: 1,
    pause: true,
  }));
  const [segmentDataCount, setSegmentDataCount] = useState(
    parseInt(Math.random() * 100, 10)
  );
  return {
    styleDataSigment: styleDataSigment,
    apiDataSigment: apiDataSigment,
    segmentNumber: segmentNumber,
    segmentDataCount: segmentDataCount,
    setSegmentDataCount: setSegmentDataCount,
    isFall: false,
  };
}
