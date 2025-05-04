import React from 'react';
import Svg, {Path, G, Text as SvgText} from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 200,
  height = 200,
  color = '#2196F3',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200">
      {/* Gavel head */}
      <G transform="translate(100, 80) rotate(45)">
        <Path
          d="M-30,-10 h60 v20 h-60 z"
          fill={color}
        />
      </G>
      
      {/* Gavel handle */}
      <G transform="translate(60, 120)">
        <Path
          d="M0,0 v40 h15 v-40 z"
          fill={color}
        />
      </G>

      {/* App name */}
      <SvgText
        x="100"
        y="180"
        fontSize="24"
        fontWeight="bold"
        fill={color}
        textAnchor="middle">
        VERDICT
      </SvgText>
    </Svg>
  );
};

export default Logo; 