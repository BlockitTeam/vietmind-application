import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M17.0767 13.0769H5.38439C4.02492 13.0769 2.92285 14.179 2.92285 15.5385M17.0767 13.0769V16.7692C17.0767 17.449 16.5257 18 15.8459 18H5.38439C4.02492 18 2.92285 16.8979 2.92285 15.5385M17.0767 13.0769V3.23077C17.0767 2.55103 16.5257 2 15.8459 2H6.92285M2.92285 15.5385V4.46154C2.92285 3.10207 4.02492 2 5.38439 2H6.92285M10.0476 5.69231H13.4229M10.0476 9.38461H13.4229M6.92285 13V2"
      stroke="#5F7581"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  </Svg>
);
export default SVGComponent;
