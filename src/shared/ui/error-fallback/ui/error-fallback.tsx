export const ErrorFallback = ({ error }: { error: any }) => (
  <div style={{ padding: 20 }}>
    <h2>Something went wrong 😬</h2>
    <pre>{String(error?.message || error)}</pre>
    <button onClick={() => location.reload()}>Reload</button>
  </div>
);
