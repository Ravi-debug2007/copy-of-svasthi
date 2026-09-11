import { FormEvent, useState } from 'react';

const tiles = ['Chat with Dawn', 'Diary Analysis', 'Guess My Mood', 'Survey Based Diagnosis', 'Helpline Numbers', 'Profile Page', 'Tracker', 'Exercises'];

function BotanicalHead() { return <div className="botanical" aria-hidden="true"><div className="leaf leaf-a"/><div className="leaf leaf-b"/><div className="stem stem-a"/><div className="stem stem-b"/><div className="flower flower-a">✿</div><div className="flower flower-b">✦</div><div className="head"/><div className="neck"/><div className="shoulders"/></div>; }
function HeartHands() { return <div className="heart-art" aria-hidden="true"><div className="wreath wreath-a">✿</div><div className="wreath wreath-b">✿</div><div className="heart">♡</div><div className="hand hand-a"/><div className="hand hand-b"/><div className="figure-head"/><div className="shirt"/></div>; }

function Login() {
  const [email, setEmail] = useState('');
  const submit = (e: FormEvent) => { e.preventDefault(); alert(`Welcome${email ? `, ${email}` : ''}.`); };
  return <section className="phone login-phone"><div className="phone-top"><span>9:41</span><span>•••</span></div><div className="login-inner"><BotanicalHead/><div className="brand">svasthi</div><h1>Login</h1><p className="subcopy">A quiet place to feel, reflect, and grow.</p><form onSubmit={submit}><label>Enter Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required/></label><label>Enter Password<input type="password" placeholder="••••••••" required/></label><div className="login-options"><label className="check"><input type="checkbox"/> <span>Remember Me</span></label><button type="button" className="text-button">Forgot Password?</button></div><button className="primary">Login <span>→</span></button></form><p className="switch">Don't have an account? <button type="button">Sign Up</button></p></div></section>;
}

function Dashboard() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="phone dashboard-phone"><div className="phone-top ink"><span>9:41</span><span>•••</span></div><main className="dashboard"><div className="greeting"><div><p>your gentle space</p><h1>Hi, there <span>✦</span></h1></div><div className="avatar">S</div></div><div className="today"><span>Today</span><strong>How can we care for you?</strong></div><div className="tile-grid">{tiles.map((tile, index) => <button key={tile} className={`tile t${index + 1} ${active === tile ? 'active' : ''}`} onClick={() => setActive(tile)}><i>{['☏','✎','☁','⌁','✚','☺','◷','◌'][index]}</i><span>{tile}</span></button>)}</div>{active && <div className="toast">Opening {active}</div>}</main><button className="logout" aria-label="Log out">↪</button></section>;
}

function Signup() {
  const [registered, setRegistered] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setRegistered(true); };
  return <section className="phone signup-phone"><div className="phone-top ink"><span>9:41</span><span>•••</span></div><div className="signup-inner"><HeartHands/><div className="brand dark-brand">svasthi</div><h1>Sign Up</h1><p className="subcopy dark-sub">Begin your soft, steady wellness journey.</p><form onSubmit={submit}><div className="split"><label>First Name<input placeholder="First name" required/></label><label>Last Name<input placeholder="Last name" required/></label></div><label>Email<input type="email" placeholder="you@example.com" required/></label><label>Password<span className="input-wrap"><input type="password" placeholder="Create password" required/><b>◉</b></span></label><label>Confirm Password<span className="input-wrap"><input type="password" placeholder="Confirm password" required/><b>◉</b></span></label><button className="primary warm">Register <span>→</span></button></form>{registered ? <p className="success">Your sanctuary is ready.</p> : <p className="switch dark-switch">Have an account? <button type="button">Login</button></p>}</div></section>;
}

export default function App() { return <div className="canvas"><header className="page-title"><span className="title-flower">✦</span><div><p>MENTAL WELLNESS COMPANION</p><h2>Svasthi, a space to come home to yourself.</h2></div></header><div className="phones"><Login/><Dashboard/><Signup/></div><p className="footer-note">breathe in • make space • begin again</p></div>; }
