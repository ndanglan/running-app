import React from 'react';

import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn,
} from 'react-hook-form';

import {AppInput, TextFieldProps} from './AppInput';

export function AppInputController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AppInputControllerProps<TFieldValues, TName>) {
  const {control, name, render, ...inputProps} = props;
  const renderDefault = ({
    field: {onChange, onBlur, value},
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => (
    <AppInput
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      {...inputProps}
    />
  );
  const renderComponent = render ? render : renderDefault;
  return <Controller control={control} render={renderComponent} name={name} />;
}

type AppInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TextFieldProps & {
  control?: Control<TFieldValues>;
  name: TName;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  render?: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};
