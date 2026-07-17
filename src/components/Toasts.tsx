import { Alert, type AlertProps, Box, IconButton, Slide } from "@mui/material"
import { Cross } from "@prenda-school/prenda-icons"
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export type ToastId = string | number

export type ToastSeverity = "error" | "info" | "success" | "warning"

export type ToastPlacement = "bottom-left" | "bottom-center" | "bottom-right"

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

const ToastsContext = createContext<ToastsContextValue | null>(null)

export interface ToastsProviderProps extends PropsWithChildren {
  /**
   * The limit of toasts shown at once per placement; extras queue up.
   * @default 3
   */
  limit?: number
}

interface ToastRecord {
  autoHideDuration: number | null
  children: ReactNode
  closeable: boolean
  icon?: AlertProps["icon"]
  id: ToastId
  placement: ToastPlacement
  severity?: ToastSeverity
}

const PLACEMENTS: ToastPlacement[] = [
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

const placementSx = (placement: ToastPlacement) =>
  ({
    "bottom-left": { left: 24, alignItems: "flex-start" },
    "bottom-center": {
      left: "50%",
      transform: "translateX(-50%)",
      alignItems: "center",
    },
    "bottom-right": { right: 24, alignItems: "flex-end" },
  })[placement]

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: ToastRecord
  onClose: (id: ToastId) => void
}) => {
  const { autoHideDuration, id } = toast

  useEffect(() => {
    if (autoHideDuration === null) return
    const timer = setTimeout(() => onClose(id), autoHideDuration)
    return () => clearTimeout(timer)
  }, [autoHideDuration, id, onClose])

  return (
    <Slide direction="up" in>
      <Alert
        severity={toast.severity}
        icon={toast.icon}
        action={
          toast.closeable ? (
            <IconButton
              aria-label="close"
              size="small"
              color="inherit"
              onClick={() => onClose(toast.id)}
            >
              <Cross fontSize="small" />
            </IconButton>
          ) : undefined
        }
        sx={{ pointerEvents: "auto", boxShadow: 3 }}
      >
        {toast.children}
      </Alert>
    </Slide>
  )
}

export const ToastsProvider = ({
  children,
  limit = 3,
}: ToastsProviderProps) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const counter = useRef(0)

  const close = useCallback((id: ToastId) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const closeAll = useCallback(() => {
    setToasts([])
  }, [])

  const enqueue = useMemo<ToastsEnqueue>(() => {
    const push: EnqueueFn = (content, options = {}) => {
      counter.current += 1
      const id = options.id ?? `toast-${counter.current}`
      setToasts((prev) => [
        ...prev.filter((toast) => toast.id !== id),
        {
          autoHideDuration:
            options.autoHideDuration === undefined
              ? 5000
              : options.autoHideDuration,
          children: content,
          closeable: options.closeable ?? true,
          icon: options.icon,
          id,
          placement: options.placement ?? "bottom-left",
          severity: options.severity,
        },
      ])
      return id
    }
    const withSeverity =
      (severity: ToastSeverity): EnqueueFn =>
      (content, options = {}) =>
        push(content, { ...options, severity })
    return Object.assign(push, {
      error: withSeverity("error"),
      info: withSeverity("info"),
      success: withSeverity("success"),
      warning: withSeverity("warning"),
    })
  }, [])

  const value = useMemo(
    () => ({ close, closeAll, enqueue }),
    [close, closeAll, enqueue],
  )

  return (
    <ToastsContext.Provider value={value}>
      {children}
      {PLACEMENTS.map((placement) => {
        const visible = toasts
          .filter((toast) => toast.placement === placement)
          .slice(0, limit)
        if (visible.length === 0) return null
        return (
          <Box
            key={placement}
            sx={{
              position: "fixed",
              bottom: 24,
              zIndex: (theme) => theme.zIndex.snackbar,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              pointerEvents: "none",
              ...placementSx(placement),
            }}
          >
            {visible.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onClose={close} />
            ))}
          </Box>
        )
      })}
    </ToastsContext.Provider>
  )
}

export const useToasts = (): ToastsContextValue => {
  const context = useContext(ToastsContext)
  if (!context) {
    throw new Error("useToasts must be used within a ToastsProvider")
  }
  return context
}
