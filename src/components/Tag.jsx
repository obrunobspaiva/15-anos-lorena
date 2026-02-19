/**
 * type: 'success' | 'warn' | 'danger' | 'info'
 */
export default function Tag({ type = 'info', children }) {
  return <span className={`tag tag-${type}`}>{children}</span>
}
