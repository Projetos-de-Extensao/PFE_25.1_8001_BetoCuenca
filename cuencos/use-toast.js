
import { toast } from "./sonner";

export function useToast() {
  return {
    toast: toast,
    dismiss: toast.dismiss,
    error: (message) => toast.error(message),
    success: (message) => toast.success(message),
    warning: (message) => toast.warning(message),
    info: (message) => toast.info(message),
  };
}

export { toast };
