import {
  Checkbox,
  type CheckboxProps,
  FormControlLabel,
  type FormControlLabelProps,
  FormHelperText,
  styled,
} from "@mui/material"
import { type ReactNode, useId } from "react"

export interface CheckboxFieldProps
  extends Omit<FormControlLabelProps, "control"> {
  /**
   * If `true`, the helper text appears in an error state.
   */
  error?: boolean
  /**
   * The helper text content, rendered below the checkbox and label.
   */
  helperText?: ReactNode
  /**
   * If `true`, the checkbox appears in an indeterminate state.
   */
  indeterminate?: boolean
  /**
   * Props applied to the `Checkbox` element.
   */
  CheckboxProps?: CheckboxProps
}

export const CheckboxField = ({
  error,
  helperText,
  indeterminate,
  CheckboxProps: checkboxProps,
  id: idProp,
  ...other
}: CheckboxFieldProps) => {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperTextId = helperText ? `${id}-helper-text` : undefined

  return (
    <Root>
      <FormControlLabel
        id={id}
        control={
          <Checkbox
            indeterminate={indeterminate}
            slotProps={{ input: { "aria-describedby": helperTextId } }}
            {...checkboxProps}
          />
        }
        {...other}
      />
      {helperText ? (
        <HelperText error={error} id={helperTextId}>
          {helperText}
        </HelperText>
      ) : null}
    </Root>
  )
}

const Root = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  gap: 4,
})

// Indent under the checkbox control (icon width + label gap)
const HelperText = styled(FormHelperText)({
  marginLeft: 40,
})
