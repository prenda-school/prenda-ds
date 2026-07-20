import { Alert, type AlertProps, IconButton } from "@mui/material"
import { Cross } from "@prenda-school/prenda-icons"
import {
  type CustomContentProps,
  SnackbarContent,
  type SnackbarKey,
  type SnackbarOrigin,
  SnackbarProvider,
  useSnackbar,
} from "notistack"
import {
  type PropsWithChildren,
  type ReactNode,
  forwardRef,
  useMemo,
} from "react"

export type ToastId = SnackbarKey

export type ToastSeverity = "error" | "info" | "success" | "warning"

export type ToastPlacement = "bottom-left" | "bottom-center" | "bottom-right"

// Must be a `type` alias, not an `interface`: notistack's VariantOverrides
// mechanism requires each variant's extra props to be assignable to
// `Record<string, unknown>`, which interfaces are not (they can be augmented,
// so TS withholds an implicit index signature). A type alias satisfies it.
type ToastExtraProps = {
  /**
   * Whether a close button is shown at the end of the toast.
   * @default true
   */
  closeable?: boolean
  /**
   * Override the severity icon.
   */
  icon?: AlertProps["icon"]
}

declare module "notistack" {
  interface VariantOverrides {
    default: ToastExtraProps
    error: ToastExtraProps
    info: ToastExtraProps
    success: ToastExtraProps
    warning: ToastExtraProps
  }
}

export interface ToastEnqueueOptions {
  /**
   * Milliseconds before the toast dismisses itself. `null` keeps it open.
   * @default 5000
   */
  autoHideDuration?: number | null
  /**
   * Whether a close button is shown at the end of the toast.
   * @default true
   */
  closeable?: boolean
  /**
   * Override the severity icon.
   */
  icon?: AlertProps["icon"]
  /**
   * Unique identifier to reference the toast later (i.e. dismiss it).
   */
  id?: ToastId
  /**
   * The placement of the toast on the screen.
   * @default 'bottom-left'
   */
  placement?: ToastPlacement
  /**
   * The severity of the toast, controlling its color and icon.
   * @default 'info'
   */
  severity?: ToastSeverity
}

type EnqueueFn = (children: ReactNode, options?: ToastEnqueueOptions) => ToastId

export type ToastsEnqueue = EnqueueFn & {
  error: EnqueueFn
  info: EnqueueFn
  success: EnqueueFn
  warning: EnqueueFn
}

export interface ToastsContextValue {
  /**
   * Dismiss a specific toast by its `id`, returned from `enqueue`.
   */
  close: (id: ToastId) => void
  /**
   * Dismiss all open toasts.
   */
  closeAll: () => void
  /**
   * Add a toast to the queue. Convenience variants set the severity:
   * `enqueue.error("...")`, `enqueue.success("...")`, etc.
   */
  enqueue: ToastsEnqueue
}

export interface ToastsProviderProps extends PropsWithChildren {
  /**
   * The maximum number of toasts shown at once; the oldest is dismissed to
   * make room for new ones.
   * @default 3
   */
  limit?: number
}

const PLACEMENT_TO_ORIGIN: Record<ToastPlacement, SnackbarOrigin> = {
  "bottom-left": { vertical: "bottom", horizontal: "left" },
  "bottom-center": { vertical: "bottom", horizontal: "center" },
  "bottom-right": { vertical: "bottom", horizontal: "right" },
}

const Toast = forwardRef<HTMLDivElement, CustomContentProps & ToastExtraProps>(
  ({ id, message, variant, closeable = true, icon }, ref) => {
    const { closeSnackbar } = useSnackbar()

    return (
      <SnackbarContent ref={ref}>
        <Alert
          severity={variant === "default" ? "info" : variant}
          icon={icon}
          action={
            closeable ? (
              <IconButton
                aria-label="close"
                size="small"
                color="inherit"
                onClick={() => closeSnackbar(id)}
              >
                <Cross fontSize="small" />
              </IconButton>
            ) : undefined
          }
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {message}
        </Alert>
      </SnackbarContent>
    )
  },
)

Toast.displayName = "Toast"

export const ToastsProvider = ({
  children,
  limit = 3,
}: ToastsProviderProps) => (
  <SnackbarProvider
    maxSnack={limit}
    autoHideDuration={5000}
    anchorOrigin={PLACEMENT_TO_ORIGIN["bottom-left"]}
    Components={{
      default: Toast,
      error: Toast,
      info: Toast,
      success: Toast,
      warning: Toast,
    }}
  >
    {children}
  </SnackbarProvider>
)

export const useToasts = (): ToastsContextValue => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return useMemo(() => {
    const push: EnqueueFn = (content, options = {}) =>
      enqueueSnackbar(content, {
        variant: options.severity ?? "default",
        key: options.id,
        persist: options.autoHideDuration === null,
        autoHideDuration:
          options.autoHideDuration === null
            ? undefined
            : options.autoHideDuration,
        anchorOrigin: options.placement
          ? PLACEMENT_TO_ORIGIN[options.placement]
          : undefined,
        closeable: options.closeable,
        icon: options.icon,
      })
    const withSeverity =
      (severity: ToastSeverity): EnqueueFn =>
      (content, options = {}) =>
        push(content, { ...options, severity })
    const enqueue = Object.assign(push, {
      error: withSeverity("error"),
      info: withSeverity("info"),
      success: withSeverity("success"),
      warning: withSeverity("warning"),
    })
    return {
      close: (id: ToastId) => closeSnackbar(id),
      closeAll: () => closeSnackbar(),
      enqueue,
    }
  }, [enqueueSnackbar, closeSnackbar])
}
