export function Button({
  loading,
  ...props
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> & { loading?: boolean }): JSX.Element {
  return (
    <button
      className="ui-py-1 ui-px-3 ui-rounded ui-bg-neutral-800 disabled:ui-bg-neutral-900 hover:ui-bg-neutral-900 ui-text-white ui-min-w-[10ch] ui-text-xs disabled:ui-cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : props.children}
    </button>
  );
}
