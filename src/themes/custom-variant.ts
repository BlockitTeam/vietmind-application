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
export const outlineButton = (props: Dict) => {
  return {
    _text: {
      color: props.disabled ? 'text.neutral_teriary' : 'text.default',
      fontWeight: '600',
      fontSize: 16,
      fontFamily: 'SFProDisplay',
    },
    bgColor: props.bgColor ? props.bgColor : 'white',
    borderWidth: 1,

    borderColor: props.disabled ? 'background.medium' : 'primary.medium',
    _pressed: {
      bg: 'primary.medium50',
    },
    _web: {
      outlineWidth: 0,
    },
  };
};

