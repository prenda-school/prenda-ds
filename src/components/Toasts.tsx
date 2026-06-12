import { Grow, IconButton, Portal, styled } from "@mui/material"
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Cross,
  Info,
} from "@prenda-school/prenda-icons"
import type React from "react"
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
import {
  PrendaBlues,
  PrendaGreens,
  PrendaGreys,
  PrendaReds,
  PrendaYellows,
} from "../colors"

export type ToastId = string | number

export type ToastSeverity = "error" | "info" | "success" | "warning"

export type ToastPlacement = "bottom-left" | "bottom-center" | "bottom-right"

export interface EnqueueToastOptions {
  /**
   * Identifier to reference the toast later (e.g. to close it
   * programmatically). Generated when omitted.
   */
  id?: ToastId
  severity?: ToastSeverity
  /**
   * Keep the toast open until closed programmatically or by the user.
   */
  persist?: boolean
  /**
   * Show a close button at the end of the toast.
   */
  closeable?: boolean
  /**
   * Milliseconds before the toast hides itself. Ignored when `persist` is
   * set. Defaults to the provider's `autoHideDuration`.
   */
  autoHideDuration?: number
}

type Enqueue = (children: ReactNode, options?: EnqueueToastOptions) => ToastId

export interface ToastsContextValue {
  /**
   * Dismiss a specific toast by the id returned from `enqueue`.
   */
  close: (id: ToastId) => void
  /**
   * Dismiss all open toasts.
   */
  closeAll: () => void
  /**
   * Add a toast to the queue. `enqueue.error` / `enqueue.info` /
   * `enqueue.success` / `enqueue.warning` preset the severity.
   */
  enqueue: Enqueue & {
    error: Enqueue
    info: Enqueue
    success: Enqueue
    warning: Enqueue
  }
}

const ToastsContext = createContext<ToastsContextValue | null>(null)

export const useToasts = (): ToastsContextValue => {
  const context = useContext(ToastsContext)
  if (!context) {
    throw new Error("useToasts must be used within a ToastsProvider")
  }
  return context
}

export type ToastsProviderProps = PropsWithChildren<{
  /**
   * The corner of the screen where toasts appear.
   */
  placement?: ToastPlacement
  /**
   * The maximum number of toasts shown at once; the oldest is dropped first.
   */
  limit?: number
  /**
   * Default milliseconds before a toast hides itself.
   */
  autoHideDuration?: number
}>

type ToastEntry = Required<Pick<EnqueueToastOptions, "id">> &
  Omit<EnqueueToastOptions, "id"> & {
    children: ReactNode
  }

export const ToastsProvider = ({
  children,
  placement = "bottom-center",
  limit = 3,
  autoHideDuration = 5000,
}: ToastsProviderProps) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const counter = useRef(0)

  const close = useCallback((id: ToastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const closeAll = useCallback(() => {
    setToasts([])
  }, [])

  const value = useMemo<ToastsContextValue>(() => {
    const baseEnqueue: Enqueue = (toastChildren, options = {}) => {
      counter.current += 1
      const id = options.id ?? `prenda-toast-${counter.current}`
      setToasts((current) =>
        [
          ...current.filter((toast) => toast.id !== id),
          { ...options, id, children: toastChildren },
        ].slice(-limit),
      )
      return id
    }

    const enqueue = baseEnqueue as ToastsContextValue["enqueue"]
    enqueue.error = (c, options = {}) =>
      enqueue(c, { severity: "error", ...options })
    enqueue.info = (c, options = {}) =>
      enqueue(c, { severity: "info", ...options })
    enqueue.success = (c, options = {}) =>
      enqueue(c, { severity: "success", ...options })
    enqueue.warning = (c, options = {}) =>
      enqueue(c, { severity: "warning", ...options })

    return { close, closeAll, enqueue }
  }, [close, closeAll, limit])

  return (
    <ToastsContext.Provider value={value}>
      {children}
      <Portal>
        <ToastStack placement={placement} aria-label="Notifications">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              defaultAutoHideDuration={autoHideDuration}
              onClose={close}
            />
          ))}
        </ToastStack>
      </Portal>
    </ToastsContext.Provider>
  )
}

const severityIcons: Record<ToastSeverity, React.ComponentType> = {
  error: AlertOctagon,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
}

const severityColors: Record<ToastSeverity, string> = {
  error: PrendaReds[300],
  warning: PrendaYellows[400],
  info: PrendaBlues[300],
  success: PrendaGreens[300],
}

const ToastItem = ({
  toast,
  defaultAutoHideDuration,
  onClose,
}: {
  toast: ToastEntry
  defaultAutoHideDuration: number
  onClose: (id: ToastId) => void
}) => {
  const { id, children, severity, persist, closeable, autoHideDuration } = toast

  useEffect(() => {
    if (persist) return
    const timer = setTimeout(
      () => onClose(id),
      autoHideDuration ?? defaultAutoHideDuration,
    )
    return () => clearTimeout(timer)
  }, [id, persist, autoHideDuration, defaultAutoHideDuration, onClose])

  const Icon = severity ? severityIcons[severity] : null

  return (
    <Grow in>
      <ToastRoot role="alert">
        {Icon ? (
          <ToastIcon
            style={{ color: severityColors[severity as ToastSeverity] }}
          >
            <Icon />
          </ToastIcon>
        ) : null}
        <ToastMessage>{children}</ToastMessage>
        {closeable ? (
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => onClose(id)}
            sx={{ color: PrendaGreys[80], alignSelf: "flex-start", padding: 0 }}
          >
            <Cross />
          </IconButton>
        ) : null}
      </ToastRoot>
    </Grow>
  )
}

const ToastStack = styled("section", {
  shouldForwardProp: (prop) => prop !== "placement",
})<{ placement: ToastPlacement }>(({ theme, placement }) => ({
  position: "fixed",
  bottom: 24,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  zIndex: theme.zIndex.snackbar,
  ...(placement === "bottom-left" && { left: 24 }),
  ...(placement === "bottom-right" && { right: 24 }),
  ...(placement === "bottom-center" && {
    left: "50%",
    transform: "translateX(-50%)",
  }),
}))

const ToastRoot = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundColor: PrendaGreys[600],
  color: PrendaGreys[0],
  borderRadius: 8,
  boxShadow: theme.shadows[3],
  display: "flex",
  gap: 8,
  minHeight: 54,
  minWidth: 288,
  maxWidth: 568,
  padding: "11px 16px",
}))

const ToastIcon = styled("span")({
  display: "flex",
  fontSize: 24,
  lineHeight: 1,
})

const ToastMessage = styled("div")({
  flexGrow: 1,
  fontSize: 16,
  lineHeight: "24px",
})
