import * as React from 'react'
import Svg, {SvgProps, Path} from 'react-native-svg'
const SVGComponent = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.98077 3.50788C10.3711 3.11732 11.0041 3.11706 11.3948 3.50728L12.4921 4.60332C12.8829 4.9937 12.8831 5.62702 12.4926 6.01774L6.161 12.3529C6.02172 12.4922 5.84437 12.5873 5.65122 12.6262L2.7998 13.2008L3.37539 10.3527C3.41435 10.1599 3.50927 9.98292 3.64828 9.84384L9.98077 3.50788Z"
      stroke="#172832"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
)
export default SVGComponent
