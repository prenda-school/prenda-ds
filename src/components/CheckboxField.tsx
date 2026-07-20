import {
  Checkbox,
  type CheckboxProps,
  FormControl,
  FormControlLabel,
  type FormControlLabelProps,
  FormHelperText,
  type FormHelperTextProps,
} from "@mui/material"
import { type ReactNode, forwardRef } from "react"

export interface CheckboxFieldProps
  extends Omit<FormControlLabelProps, "control"> {
  /**
   * Props applied to the underlying `Checkbox` element.
   */
  CheckboxProps?: Partial<CheckboxProps>
  /**
   * Props applied to the `FormHelperText` element.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>
  /**
   * If `true`, the component appears in an error state.
   */
  error?: boolean
  /**
   * The helper text content.
   */
  helperText?: ReactNode
  /**
   * If `true`, the checkbox appears in an indeterminate state.
   */
  indeterminate?: boolean
}

/**
 * A labeled checkbox with optional helper text and error state.
 * `onChange` receives `(event, checked)`.
 */
export const CheckboxField = forwardRef<HTMLLabelElement, CheckboxFieldProps>(
  (
    {
      CheckboxProps: checkboxProps,
      FormHelperTextProps: formHelperTextProps,
      error = false,
      helperText,
      indeterminate = false,
      ...formControlLabelProps
    },
    ref,
  ) => (
    <FormControl error={error}>
      <FormControlLabel
        ref={ref}
        control={<Checkbox indeterminate={indeterminate} {...checkboxProps} />}
        {...formControlLabelProps}
      />
      {helperText ? (
        <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  ),
)

CheckboxField.displayName = "CheckboxField"
