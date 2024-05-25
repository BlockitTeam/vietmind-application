import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M15.8333 8.75065V5.00065C15.8333 4.08018 15.0871 3.33398 14.1667 3.33398H4.16667C3.24619 3.33398 2.5 4.08018 2.5 5.00065V11.5224C2.5 12.4429 3.24619 13.1891 4.16667 13.1891H5.47101V16.6673L8.94928 13.1891H9.16667M13.4692 15.3267L15.6431 17.5007V15.3267H15.8333C16.7538 15.3267 17.5 14.5805 17.5 13.6601V10.834C17.5 9.91351 16.7538 9.16732 15.8333 9.16732H10.8333C9.91286 9.16732 9.16667 9.91351 9.16667 10.834V13.6601C9.16667 14.5805 9.91286 15.3267 10.8333 15.3267H13.4692Z"
      stroke="#5F7581"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
