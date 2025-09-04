// Minimal toast facade to avoid UI coupling
type ToastType = 'success'|'error'|'info';
export const Toast = {
  show(message: string, type: ToastType = 'info') {
    // In production, forward to a UI toast lib.
    console.log(`[${type.toUpperCase()}]`, message);
  }
};

