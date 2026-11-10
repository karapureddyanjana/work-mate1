import { useState } from 'react'

const P = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  lock: <><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  building: <path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M3 21h18" />,
  phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeoff: <path d="M3 3l18 18M6.6 7.6C3.9 9.3 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1M10 6.1A9.8 9.8 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.9M9.9 9.9a3 3 0 0 0 4.2 4.2" />,
  r: <path d="m9 6 6 6-6 6" />, l: <path d="m15 6-6 6 6 6" />, d: <path d="m6 9 6 6 6-6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  cal: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  folder: <path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 15h2" /></>,
  crown: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z" />,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01" /></>,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  check: <path d="m5 12 5 5 9-10" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />,
  img: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></>,
  video: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 11 6-3v8l-6-3" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />,
  home: <path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" />,
  list: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  layers: <path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.2 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
  trophy: <path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 14v4M8 21h8" />,
  msg: <path d="M4 5h16v11H9l-5 4z" />,
  swap: <path d="M4 9h14l-3-3M20 15H6l3 3" />,
}
export const Icon = ({ n, className = '' }) => (
  <svg className={'i ' + className} viewBox="0 0 24 24" aria-hidden="true">{P[n]}</svg>
)

export function Field({ label, icon, type = 'text', value, onChange, placeholder, error, prefix, children }) {
  const [show, setShow] = useState(false)
  const pw = type === 'password'
  return (
    <div className="field">
      <label>{label}</label>
      <div className={'box' + (error ? ' err' : '')}>
        {icon && <Icon n={icon} />}
        {prefix && <span className="cc">{prefix}</span>}
        {children || (
          <input type={pw && show ? 'text' : type} value={value} placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)} />
        )}
        {pw && (
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
            <Icon n={show ? 'eye' : 'eyeoff'} />
          </button>
        )}
      </div>
      {error && <div className="err-t">{error}</div>}
    </div>
  )
}

export function Sheet({ icon, title, text, tall, onClose, children }) {
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className={'sheet' + (tall ? ' tall' : '')} role="dialog" aria-modal="true" aria-label={title}>
        {icon && <div className="ico"><Icon n={icon} /></div>}
        <h3>{title}</h3>
        {text && <p>{text}</p>}
        {children}
      </div>
    </>
  )
}

export const Btn = ({ out, ...p }) => <button className={'btn' + (out ? ' out' : '')} {...p} />
