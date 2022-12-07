import { useSpring } from 'react-spring';
export default function Segment(
  Name = '',
  segmentNumber = 0,
  fromX = 0,
  fromY = 0,
  toX = 0,
  toY = 0,
  opacity = true,
  delay = 1,
  onStart = null
) {
  // sl data кубики
  const [stylesSLData, apiSLData] = useSpring(() => ({
    loop: { reverse: true },
    from: { x: fromX, y: fromY },
    to: { x: toX, toY: 30 - Math.random() * 5 },
    delay: Math.random() * delay,
    pause: true,
    opacity: opacity,
    onStart: onStart,
  }));
  return {
    stylesSLData: stylesSLData,
    apiSLData: apiSLData,
    segmentNumber: segmentNumber,
    segmentName: Name,
  };
}
