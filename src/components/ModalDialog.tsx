import { Dialog, IconButton, useTheme } from "@mui/material"
import { Cross } from "@prenda-school/prenda-icons"

export interface ModalDialogProps {
  open: boolean
  onClose: () => void
  closeable?: boolean
  children: React.ReactNode
  maxWidth?: number
  scroll?: "paper" | "body"
  fullScreen?: boolean
}

export const ModalDialog = ({
  open,
  onClose,
  closeable = true,
  children,
  maxWidth = 640,
  scroll = "paper",
  fullScreen = false,
}: ModalDialogProps) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal"
      scroll={scroll}
      fullScreen={fullScreen}
      sx={{
        "& .MuiDialog-paper": {
          padding: 0,
          width: "100%",
          // In fullScreen mode, defer to MUI's paperFullScreen styles —
          // this sx outranks them, so clamping width or rounding corners
          // here would visibly break fullscreen dialogs.
          maxWidth: fullScreen ? "100%" : maxWidth,
          borderRadius: fullScreen ? 0 : "8px",
        },
      }}
    >
      {closeable && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            zIndex: 10,
            color: theme.palette.prendaGrey[500],
            backgroundColor: theme.palette.prendaGrey[0],
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
            padding: 0.5,
            "&:hover": {
              backgroundColor: theme.palette.prendaGrey[90],
            },
          }}
        >
          <Cross />
        </IconButton>
      )}
      {children}
    </Dialog>
  )
}
