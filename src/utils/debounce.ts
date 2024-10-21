export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function(this: any, ...args: Parameters<F>) {
    const context = this
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func.apply(context, args), wait)
  } as F
}
