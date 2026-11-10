import { useEffect, useRef, useState } from 'react'
import { Icon, Field, Sheet, Btn } from './ui.jsx'

const POSITIONS = ['Junior Full Stack Developer', 'Senior Frontend Developer', 'Product Designer', 'QA Engineer', 'Project Manager']
const TERMS = [
  ['Terms and Conditions', 'Acceptance: By using the Work Mate app, you agree to comply with all applicable terms and conditions.'],
  ['Usage', 'This app is for personal use only and may not be used for commercial purposes without permission.'],
  ['Account', 'You are responsible for the security of your account and all activities that occur within it.'],
  ['Content', 'You must not upload content that violates copyright, privacy, or applicable laws.'],
  ['Changes', 'We reserve the right to change these terms at any time and will notify you of changes through the app or email.'],
  ['Privacy Policy', 'Data Collection: We collect personal data such as name, email, and location to process transactions and improve our services.'],
  ['Data Usage', 'Your data is used for internal purposes such as account management, usage analysis, and service offerings.'],
  ['Security', 'We protect your data with appropriate security measures to prevent unauthorized access.'],
  ['Data Sharing', 'We do not share your personal data with third parties without your consent, except as required by law.'],
  ['Your Rights', 'You can access, update, or delete your personal data by contacting our support team.'],
]
const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [sheet, setSheet] = useState(null)
  const [account, setAccount] = useState({ email: '', phone: '', company: '', password: '', agreed: false })
  const [profile, setProfile] = useState({ first: '', last: '', dob: '', position: '', address: '', photo: '', done: false })
  const [tab, setTab] = useState('home')

  const name = profile.done ? `${profile.first} ${profile.last}` : cap((account.email.split('@')[0] || 'Your name').replace(/[._]/g, ' '))
  const go = (s) => { setSheet(s === 'welcome' ? 'welcome' : null); setScreen(s) }
  const ctx = { account, setAccount, profile, setProfile, name, go, sheet, setSheet, tab, setTab }

  const S = { welcome: Home, splash: Splash, signin: SignIn, signup: SignUp, home: Home, profile: Profile, work: WorkProfile }[screen]
  return (
    <div className="stage">
      <div className="shell">
        <aside className="brand">
          <div className="logo"><Icon n="layers" /></div>
          <h1>Navigate your work journey, efficient &amp; easy.</h1>
          <p>Work Mate keeps your meetings, tasks and career profile in one place. Sign up on the right to try the full flow.</p>
        </aside>
        <main className="phone"><S {...ctx} /></main>
      </div>
    </div>
  )
}

function Splash({ go }) {
  return (
    <>
      <div className="splash-top">
        <div className="mock" aria-hidden="true">
          <div>Today's Task<small>The tasks assigned to you for today</small>Wiring Dashboard Analytics <span className="pill red">High</span></div>
          <div>Working Period<small>Average your working period</small>
            <svg viewBox="0 0 200 60" width="100%"><path d="M0 50 L30 40 L60 44 L90 28 L120 36 L150 12 L200 30" fill="none" stroke="#6c4cf1" strokeWidth="2" /></svg></div>
        </div>
      </div>
      <div className="splash-bot">
        <h2>Navigate Your Work Journey<br />Efficient &amp; Easy</h2>
        <p>Increase your work management &amp; career development radically</p>
        <div className="stack"><Btn onClick={() => go('signin')}>Sign In</Btn><Btn out onClick={() => go('signup')}>Sign Up</Btn></div>
      </div>
    </>
  )
}

const Header = ({ title, sub }) => (
  <div className="auth">
    <div className="logo" style={{ margin: '0 auto' }}><Icon n="layers" /></div>
    <h1>{title}</h1><div className="sub">{sub}</div>
  </div>
)

function SignIn({ go, account, setAccount }) {
  const [pw, setPw] = useState('')
  const ok = /\S+@\S+\.\S+/.test(account.email) && pw.length >= 8
  return (
    <div className="scroll auth" style={{ paddingTop: 48 }}>
      <Header title="Work Mate" sub="Sign in with your credentials" />
      <Field label="Email" icon="mail" value={account.email} placeholder="Enter Your Email" onChange={(v) => setAccount({ ...account, email: v })} />
      <Field label="Password" icon="lock" type="password" value={pw} placeholder="My Password" onChange={setPw} />
      <div style={{ height: 8 }} />
      <Btn disabled={!ok} onClick={() => go('home')}>Sign In</Btn>
      <p className="foot">Don't have an account? <button className="link" onClick={() => go('signup')}>Sign up here</button></p>
    </div>
  )
}

function SignUp({ go, account, setAccount, sheet, setSheet }) {
  const [c, setC] = useState('')
  const [tried, setTried] = useState(false)
  const [code, setCode] = useState(Array(6).fill(''))
  const [wait, setWait] = useState(0)
  const refs = useRef([])
  const set = (k) => (v) => setAccount({ ...account, [k]: v })
  const err = {
    email: !/\S+@\S+\.\S+/.test(account.email) && 'Enter a valid email address',
    phone: account.phone.replace(/\D/g, '').length < 8 && 'Enter a valid phone number',
    company: !account.company && 'Company ID is required',
    password: account.password.length < 8 && 'Use at least 8 characters',
    c: c !== account.password && 'Passwords do not match',
  }
  const submit = () => {
    setTried(true)
    if (Object.values(err).some(Boolean) || !account.agreed) return
    setSheet('verify'); setWait(30)
  }
  useEffect(() => { if (wait > 0) { const t = setTimeout(() => setWait(wait - 1), 1000); return () => clearTimeout(t) } }, [wait])
  const type = (i, v) => {
    const d = v.replace(/\D/g, '')
    if (d.length > 1) { const n = d.slice(0, 6).split(''); setCode([...n, ...Array(6 - n.length).fill('')]); refs.current[Math.min(n.length, 5)]?.focus(); return }
    const n = [...code]; n[i] = d; setCode(n)
    if (d && i < 5) refs.current[i + 1]?.focus()
  }
  const e = (k) => tried && err[k]
  return (
    <>
      <div className="scroll auth">
        <Header title="Work Mate" sub="Register Using Your Credentials" />
        <Field label="Email" icon="mail" value={account.email} placeholder="Enter Your Email" onChange={set('email')} error={e('email')} />
        <Field label="Phone Number" prefix="INA" icon={null} value={account.phone} placeholder="+62 0000 0000 0000" onChange={set('phone')} error={e('phone')} />
        <Field label="Company ID" icon="building" value={account.company} placeholder="Enter Company ID" onChange={set('company')} error={e('company')} />
        <Field label="Password" icon="lock" type="password" value={account.password} placeholder="My Password" onChange={set('password')} error={e('password')} />
        <Field label="Confirm Password" icon="lock" type="password" value={c} placeholder="Confirm My Password" onChange={setC} error={e('c')} />
        <div className="check">
          <input id="ag" type="checkbox" checked={account.agreed} onChange={(x) => set('agreed')(x.target.checked)} />
          <span>I agree with <button className="link" onClick={() => setSheet('terms')}>terms &amp; conditions</button> and <button className="link" onClick={() => setSheet('terms')}>privacy policy</button></span>
        </div>
        {tried && !account.agreed && <div className="err-t" style={{ textAlign: 'left', marginTop: -12, marginBottom: 12 }}>Accept the terms to continue</div>}
        <Btn onClick={submit}>Sign Up</Btn>
        <p className="foot">Already have an account? <button className="link" onClick={() => go('signin')}>Sign in here</button></p>
      </div>
      {sheet === 'terms' && (
        <Sheet tall title="Terms & Conditions and Privacy Policy" onClose={() => setSheet(null)}>
          <div className="terms">{TERMS.map(([h, t]) => <div key={h}><b>{h}</b>{t}</div>)}</div>
          <div className="stack">
            <Btn onClick={() => { set('agreed')(true); setSheet(null) }}>I Agree</Btn>
            <Btn out onClick={() => { set('agreed')(false); setSheet(null) }}>Decline</Btn>
          </div>
        </Sheet>
      )}
      {sheet === 'verify' && (
        <Sheet icon="mail" title="Email Verification Sent!" onClose={() => setSheet(null)}
          text={`A verification code will be sent to the email ${account.email} for your account verification process.`}>
          <div className="otp">
            {code.map((v, i) => (
              <input key={i} ref={(el) => (refs.current[i] = el)} inputMode="numeric" value={v} placeholder="0" aria-label={`Digit ${i + 1}`}
                onChange={(x) => type(i, x.target.value)}
                onKeyDown={(x) => x.key === 'Backspace' && !v && i > 0 && refs.current[i - 1]?.focus()} />
            ))}
          </div>
          <p>Haven't received the verification code?{' '}
            {wait ? `Resend in ${wait}s` : <button className="link" onClick={() => setWait(30)}>Resend it.</button>}</p>
          <Btn disabled={code.join('').length < 6} onClick={() => go('welcome')}>Submit</Btn>
        </Sheet>
      )}
    </>
  )
}

const Avatar = ({ profile, name }) => (
  <div className="avatar">{profile.photo ? <img src={profile.photo} alt="" /> : name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
)

function Home({ go, profile, name, account, sheet, setSheet, tab, setTab }) {
  const done = profile.done
  const tabs = ['home', 'cal', 'list', 'folder', 'layers']
  const labels = { home: 'Home', cal: 'Calendar', list: 'Tasks', folder: 'Files', layers: 'More' }
  useEffect(() => { if (!sheet && !done && !sessionStorage.wm) { setSheet('welcome'); sessionStorage.wm = 1 } }, [])
  return (
    <>
      <div className="hhead">
        <button onClick={() => go('profile')} aria-label="Open profile"><Avatar profile={profile} name={name} /></button>
        <div style={{ flex: 1 }}><b>{name} <Icon n="check" /></b><small>{done ? profile.position : account.email}</small></div>
        <button className="circ" aria-label="Messages"><Icon n="chat" /></button>
        <button className="circ" aria-label="Notifications"><Icon n="bell" /></button>
      </div>
      {tab === 'home' ? (
        <div className="homebg">
          <div className="banner"><div><b>My Work Summary</b><small>Today task &amp; presence activity</small></div><Icon n="star" className="" /></div>
          <section className="panel">
            <h4>Today Meeting {done && <span>2</span>}</h4><div className="s">Your schedule for the day</div>
            {done ? [['Townhall Meeting'], ['Dashboard Report']].map(([t]) => (
              <div className="item" key={t}><div className="t"><span className="circ"><Icon n="video" /></span>{t}<em>01:30 AM - 02:00 AM</em></div>
                <div className="b"><span className="faces"><i /><i /><i /></span><button className="mini">Join Meet</button></div></div>
            )) : <div className="empty"><div className="grid">{Array(6).fill(0).map((_, i) => <i key={i}><Icon n="user" /></i>)}</div>
              <b>No Meeting Available</b><p>It looks like you don't have any meetings scheduled at the moment. This space will be updated as new meetings are added!</p></div>}
          </section>
          <section className="panel">
            <h4>Today Task {done && <span>1</span>}</h4><div className="s">The tasks assigned to you for today</div>
            {done ? <div className="item"><div className="t"><span className="circ"><Icon n="bolt" /></span>Wiring Dashboard Analytics</div>
              <div style={{ marginTop: 10 }}><span className="pill">In Progress</span><span className="pill red">High</span></div>
              <div className="bar"><i /></div><div className="b"><span className="faces"><i /><i /></span><span>27 April · 2 comments</span></div></div>
              : <div className="empty"><Icon n="list" className="" /><b>No Tasks Assigned</b><p>It looks like you don't have any tasks assigned to you right now. Don't worry, this space will be updated as new tasks become available.</p></div>}
          </section>
        </div>
      ) : <div className="homebg"><div className="panel empty"><b>{labels[tab]} is coming soon</b><p>This section isn't part of the current design flow.</p></div></div>}
      <nav className="nav" aria-label="Main">
        {tabs.map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)} aria-label={labels[t]}><Icon n={t} /></button>)}
      </nav>
      {sheet === 'welcome' && (
        <Sheet icon="user" title="Welcome To Work Mate!" onClose={() => setSheet(null)}
          text="To enhance your user experience, please set up your profile first. This will help us tailor the app to your needs and ensure you get the most out of our features!">
          <div className="stack"><Btn onClick={() => go('profile')}>Set Up My Profile</Btn><Btn out onClick={() => setSheet(null)}>Explore The App First</Btn></div>
        </Sheet>
      )}
    </>
  )
}

const Rows = ({ items, onPick }) => (
  <div className="list">{items.map(([i, t, danger]) => (
    <button key={t} className={'row' + (danger ? ' danger' : '')} onClick={() => onPick(t)}>
      <Icon n={i} className="ri" />{t}<Icon n="r" className="go" /></button>))}</div>
)

function Profile({ go, profile, name, account }) {
  const done = profile.done
  const pick = (t) => { if (t === 'Logout') go('splash'); else if (/Work Profile|Personal Data/.test(t)) go('work') }
  const B = [['shield', '#4ade80', 'Probation Sayat'], ['star', '#818cf8', 'Junior Of The Month'], ['crown', '#fb923c', 'Employee Of The Year'], ['trophy', '#f43f5e', 'Top Performer']]
  return (
    <div style={{ overflowY: 'auto', flex: 1 }}>
      <div className="phead"><button className="back" onClick={() => go('home')} aria-label="Back"><Icon n="l" /></button><h2>My Profile</h2><Avatar profile={profile} name={name} /></div>
      <div className="pbody">
        <h3>{name} <Icon n="check" /></h3>
        <div className="role">{done ? profile.position : account.email}</div>
        {done && <><div className="sec">Achievement</div><div className="badges">{B.map(([i, c, t]) => <div className="badge" key={t}><i style={{ background: c }}><Icon n={i} /></i>{t}</div>)}</div>
          <div className="sec">Contact</div><div className="list"><div className="row"><Icon n="mail" className="ri" />{account.email}</div></div></>}
        <div className="sec">Account</div>
        <Rows onPick={pick} items={[['user', done ? 'Personal Data' : 'My Work Profile'], ['folder', 'Office Assets'], ['wallet', 'Payroll & Tax'], ['crown', 'Roles']]} />
        <div className="sec">Settings</div>
        <Rows onPick={pick} items={[['key', 'Change Password'], ['swap', 'Versioning'], ['help', 'FAQ and Help'], ['logout', 'Logout', 1]]} />
      </div>
    </div>
  )
}

function WorkProfile({ go, profile, setProfile, sheet, setSheet }) {
  const [f, setF] = useState(profile)
  const set = (k) => (v) => setF({ ...f, [k]: v })
  const ok = f.first && f.last && f.dob && f.position
  const photo = (file) => file && setF({ ...f, photo: URL.createObjectURL(file) })
  return (
    <>
      <div className="fhead"><button className="back" onClick={() => go('profile')} aria-label="Back"><Icon n="l" /></button>My Work Profile</div>
      <div className="formbg">
        <section className="card"><h4>Personal Data Information</h4><div className="s">Your personal data information</div>
          <label className="upload">{f.photo ? <img src={f.photo} alt="Profile preview" /> : <Icon n="img" />}
            <input type="file" accept="image/jpeg,image/png" hidden onChange={(e) => photo(e.target.files[0])} /></label>
          <div className="hint">Upload Photo<br />Format should be in .jpeg, .png at least 800×800px and less than 5MB</div>
          <Field label="First Name" icon="user" value={f.first} placeholder="Tonald" onChange={set('first')} />
          <Field label="Last Name" icon="user" value={f.last} placeholder="Drump" onChange={set('last')} />
          <Field label="Date of Birth" icon="cal"><input type="date" value={f.dob} onChange={(e) => set('dob')(e.target.value)} /></Field>
          <Field label="Position" icon="list"><select value={f.position} onChange={(e) => set('position')(e.target.value)}>
            <option value="">Select Position</option>{POSITIONS.map((p) => <option key={p}>{p}</option>)}</select></Field>
        </section>
        <section className="card"><h4>Address</h4><div className="s">Your current domicile</div>
          <textarea className="box" placeholder="Enter your address" value={f.address} onChange={(e) => set('address')(e.target.value)} /></section>
      </div>
      <div className="sticky"><Btn disabled={!ok} onClick={() => setSheet('confirm')}>Update Profile</Btn></div>
      {sheet === 'confirm' && (
        <Sheet icon="user" title="Update Profile" onClose={() => setSheet(null)}
          text="Are you sure you want to update your profile? This will help us improve your experience and provide personalized features.">
          <div className="stack"><Btn onClick={() => { setProfile({ ...f, done: true }); setSheet('done') }}>Yes, Update Profile</Btn><Btn out onClick={() => setSheet(null)}>No, Let me check</Btn></div>
        </Sheet>
      )}
      {sheet === 'done' && (
        <Sheet icon="user" title="Profile Updated!" onClose={() => go('profile')}
          text="Your profile has been successfully updated. We're excited to see you take this step!">
          <Btn onClick={() => go('profile')}>Visit My Profile</Btn>
        </Sheet>
      )}
    </>
  )
}
