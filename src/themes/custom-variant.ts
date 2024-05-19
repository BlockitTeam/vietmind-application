import {Dict} from 'native-base/lib/typescript/theme/tools';
export const primaryButton = (props: Dict) => {
  return {
    bg: props.disabled ? 'background.medium' : 'primary.medium',
    _text: {
      color: props.disabled ? 'text.neutral_teriary' : 'text.default',
      fontWeight: '600',
    },
    _pressed: {
      bg: 'primary.medium',
      opacity: 0.8,
    },
  };
};
