import React, { FC, Ref } from 'react';
import {
  Button,
  ButtonIconAlign,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '../';

// TODO: Remove in Octuple v3.0.0, use `<Button variant={ButtonVariant.Neutral} />` instead.
export const NeutralButton: FC<ButtonProps> = React.forwardRef(
  (
    {
      alignIcon = ButtonIconAlign.Left,
      alignText = ButtonTextAlign.Center,
      allowDisabledFocus = false,
      ariaLabel,
      buttonWidth,
      checked = false,
      classNames,
      counter,
      disabled = false,
      dropShadow = false,
      floatingButtonProps,
      htmlType,
      iconProps,
      nudgeProps,
      onClick,
      text,
      shape = ButtonShape.Pill,
      size = ButtonSize.Medium,
      split,
      splitButtonProps,
      splitButtonChecked = false,
      style,
      toggle,
      ...rest
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Button
        {...rest}
        ref={ref}
        alignIcon={alignIcon}
        alignText={alignText}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={ariaLabel}
        buttonWidth={buttonWidth}
        checked={checked}
        classNames={classNames}
        counter={counter}
        disabled={disabled}
        dropShadow={dropShadow}
        floatingButtonProps={floatingButtonProps}
        htmlType={htmlType}
        iconProps={iconProps}
        nudgeProps={nudgeProps}
        onClick={onClick}
        shape={shape}
        size={size}
        split={split}
        splitButtonChecked={splitButtonChecked}
        splitButtonProps={splitButtonProps}
        style={style}
        text={text}
        toggle={toggle}
        variant={ButtonVariant.Neutral}
      />
    );
  }
);
