import {Dict} from 'native-base/lib/typescript/theme/tools';
const textDefaultBtn = (props: Dict) => {
  return {
    color: props.disabled ? 'text.neutral_teriary' : 'text.default',
    // fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SFProDisplay',
  };
};

export const primaryButton = (props: Dict) => {
  return {
    bg: props.disabled ? 'background.medium' : 'primary.medium',
    _text: {...textDefaultBtn(props)},
    _pressed: {
      bg: 'primary.medium',
      opacity: 0.8,
    },
  };
};
export const outlineButton = (props: Dict) => {
  return {
    _text: textDefaultBtn(props),
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
export const cusSelected = (props: Dict) => {
  return {
    _text: textDefaultBtn(props),
    bgColor: 'primary.medium',
    borderWidth: 1,
    borderColor: 'primary.medium',
    _pressed: {
      bg: 'primary.medium50',
    },
    _web: {
      outlineWidth: 0,
    },
  };
};
