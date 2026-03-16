/* ═══════════════════════════════════════════════════════════════
   RENTECH PROPERTIES — WORLD-CLASS DESIGN SYSTEM
   East Africa's premier property marketplace
   Built for Mo & his daughter. Built for Kenya. Built for Africa.
═══════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

/* ── DARK MODE (default) ────────────────── */
:root, [data-theme="dark"] {
  --bg:         #080810;
  --bg-2:       #0e0e1a;
  --card:       #13131f;
  --card-2:     #1a1a2a;
  --border:     #252538;
  --border-2:   #1e1e30;
  --text:       #f2f2f8;
  --text-2:     #c8c8de;
  --muted:      #8888a8;
  --dim:        #5a5a78;
  --gold:       #ffc947;
  --gold-2:     #ffb800;
  --gold-dim:   rgba(255,201,71,.12);
  --gold-glow:  rgba(255,201,71,.22);
  --emerald:    #10b981;
  --em-dim:     rgba(16,185,129,.12);
  --blue:       #6366f1;
  --red:        #ef4444;
  --wa:         #25d366;
  --nav-h:      72px;
  --nav-bg:     rgba(8,8,16,.88);
  --radius:     10px;
  --radius-lg:  18px;
  --radius-xl:  26px;
  --shadow:     0 4px 24px rgba(0,0,0,.35);
  --shadow-lg:  0 12px 48px rgba(0,0,0,.5);
  --shadow-glow:0 0 40px var(--gold-glow);
}

/* ── LIGHT MODE ─────────────────────────── */
[data-theme="light"] {
  --bg:         #f5f5fa;
  --bg-2:       #ededf5;
  --card:       #ffffff;
  --card-2:     #f8f8fd;
  --border:     #e0e0ee;
  --border-2:   #eaeaf5;
  --text:       #0d0d1a;
  --text-2:     #2a2a42;
  --muted:      #606080;
  --dim:        #9090b0;
  --gold:       #c8900a;
  --gold-2:     #b07a00;
  --gold-dim:   rgba(200,144,10,.1);
  --gold-glow:  rgba(200,144,10,.18);
  --emerald:    #059669;
  --em-dim:     rgba(5,150,105,.1);
  --blue:       #4f46e5;
  --red:        #dc2626;
  --wa:         #25d366;
  --nav-bg:     rgba(245,245,250,.92);
  --shadow:     0 4px 16px rgba(0,0,0,.06);
  --shadow-lg:  0 12px 40px rgba(0,0,0,.1);
  --shadow-glow:0 0 32px var(--gold-glow);
}

/* ── RESET & BASE ─────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
body{
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--text);
  line-height:1.6;
  transition:background .3s,color .3s;
  overflow-x:hidden;
  min-height:100vh;
}
img{max-width:100%;height:auto;display:block;}
a{color:inherit;text-decoration:none;}
button{font-family:inherit;cursor:pointer;}
ul,ol{list-style:none;}
input,select,textarea{font-family:inherit;}

/* ── CONTAINER ────────────────────────── */
.container{width:100%;max-width:1280px;margin:0 auto;padding:0 28px;}
.container-sm{max-width:900px;margin:0 auto;padding:0 28px;}

/* ══════════════════════════════════════════════
   NAVIGATION — world-class sticky nav
══════════════════════════════════════════════ */
.navbar{
  position:fixed;top:0;left:0;right:0;
  height:var(--nav-h);
  display:flex;align-items:center;
  background:var(--nav-bg);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid transparent;
  z-index:1000;
  transition:all .3s;
}
.navbar.scrolled{border-bottom-color:var(--border);box-shadow:var(--shadow);}
.nav-container{
  display:flex;align-items:center;
  justify-content:space-between;
  width:100%;max-width:1280px;
  margin:0 auto;padding:0 28px;
  gap:32px;
}
/* Logo */
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0;}
.logo-img{
  width:38px;height:38px;
  border-radius:9px;overflow:hidden;
  background:var(--gold-dim);
  border:1px solid rgba(255,201,71,.2);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.logo-img img{width:100%;height:100%;object-fit:cover;}
.logo-text{
  font-family:'Syne',sans-serif;
  font-weight:800;font-size:.98rem;
  letter-spacing:.03em;line-height:1;
  color:var(--text);
  display:flex;flex-direction:column;
}
.logo-text span{font-size:.55rem;letter-spacing:.14em;opacity:.6;font-weight:700;}
/* Nav links */
.nav-links{
  display:flex;align-items:center;gap:2px;
  flex:1;justify-content:center;
}
.nav-links a{
  color:var(--muted);font-size:.86rem;font-weight:500;
  padding:7px 13px;border-radius:8px;
  transition:all .18s;white-space:nowrap;
}
.nav-links a:hover{color:var(--text);background:var(--bg-2);}
.nav-links a.active{color:var(--gold);font-weight:600;}
/* Nav actions */
.nav-actions{display:flex;align-items:center;gap:9px;flex-shrink:0;}
.nav-btn-ghost{
  padding:8px 16px;background:transparent;
  color:var(--text);border:1px solid var(--border);
  border-radius:var(--radius);font-size:.84rem;font-weight:500;
  transition:all .18s;
}
.nav-btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
.nav-btn-gold{
  padding:8px 18px;background:var(--gold);
  color:#0a0a0a;border:none;
  border-radius:var(--radius);
  font-family:'Syne',sans-serif;
  font-size:.84rem;font-weight:700;
  transition:all .2s;
  box-shadow:0 4px 14px var(--gold-glow);
}
.nav-btn-gold:hover{transform:translateY(-1px);box-shadow:0 6px 20px var(--gold-glow);}
.theme-btn{
  width:36px;height:36px;
  border-radius:9px;border:1px solid var(--border);
  background:var(--bg-2);font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  transition:all .18s;
}
.theme-btn:hover{border-color:var(--gold);}
/* Hamburger */
.hamburger{
  display:none;flex-direction:column;gap:5px;
  background:none;border:none;padding:6px;
  border-radius:8px;
}
.hamburger span{
  width:22px;height:2px;
  background:var(--text);border-radius:2px;
  display:block;transition:all .28s ease;
}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
/* Mobile menu */
.mobile-menu{
  position:fixed;top:var(--nav-h);left:0;right:0;
  background:var(--card);
  border-bottom:1px solid var(--border);
  padding:14px 20px 20px;z-index:999;
  display:flex;flex-direction:column;gap:3px;
  transform:translateY(-110%);
  transition:transform .3s ease;
  box-shadow:var(--shadow-lg);
}
.mobile-menu.open{transform:translateY(0);}
.mobile-menu a{
  color:var(--muted);font-size:.93rem;font-weight:500;
  padding:11px 14px;border-radius:9px;
  transition:all .18s;display:block;
}
.mobile-menu a:hover,.mobile-menu a.active{color:var(--gold);background:var(--gold-dim);}

/* ══════════════════════════════════════════════
   BUTTONS
══════════════════════════════════════════════ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;
  gap:8px;padding:11px 22px;border-radius:var(--radius);
  font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;
  text-decoration:none;cursor:pointer;transition:all .22s;
  border:none;white-space:nowrap;
}
.btn-gold{background:var(--gold);color:#0a0a0a;box-shadow:0 4px 14px var(--gold-glow);}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 22px var(--gold-glow);}
.btn-outline{background:transparent;color:var(--text);border:1px solid var(--border);}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);}
.btn-emerald{background:var(--emerald);color:#fff;}
.btn-emerald:hover{background:#059669;transform:translateY(-2px);}
.btn-ghost{background:var(--bg-2);color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
.btn-wa{background:var(--wa);color:#fff;}
.btn-wa:hover{background:#128C7E;}
.btn-lg{padding:15px 36px;font-size:1rem;}
.btn-sm{padding:7px 14px;font-size:.8rem;}

/* ══════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════ */
.section{padding:100px 0;}
.section-alt{padding:100px 0;background:var(--bg-2);}
.section-tag{
  display:inline-flex;align-items:center;gap:8px;
  font-size:.7rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.12em;color:var(--gold);margin-bottom:14px;
}
.section-tag::before{content:'';width:18px;height:2px;background:var(--gold);border-radius:1px;}
.section-tag.center{justify-content:center;}
.section-tag.center::before,.section-tag.center::after{content:'';width:18px;height:2px;background:var(--gold);border-radius:1px;}
.section-h{
  font-family:'Syne',sans-serif;
  font-size:clamp(1.9rem,4vw,2.9rem);
  font-weight:800;line-height:1.1;margin-bottom:14px;
}
.section-h span{color:var(--gold);}
.section-p{
  color:var(--muted);font-size:.95rem;
  line-height:1.74;max-width:580px;margin-bottom:52px;
}
.section-p.wide{max-width:760px;}

/* ══════════════════════════════════════════════
   PROPERTY CARD SYSTEM
══════════════════════════════════════════════ */
.prop-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:24px;
}
.prop-card{
  background:var(--card);border:1px solid var(--border);
  border-radius:var(--radius-lg);overflow:hidden;
  transition:transform .28s,border-color .28s,box-shadow .28s;
  display:flex;flex-direction:column;
  position:relative;
}
.prop-card:hover{
  transform:translateY(-6px);
  border-color:var(--gold);
  box-shadow:0 16px 48px var(--gold-glow);
}
.prop-card.featured-card{border-color:rgba(255,201,71,.3);}
.pc-img-wrap{position:relative;height:215px;overflow:hidden;flex-shrink:0;}
.pc-img-wrap img{
  width:100%;height:100%;object-fit:cover;
  transition:transform .5s ease;
}
.prop-card:hover .pc-img-wrap img{transform:scale(1.07);}
.pc-badge-row{
  position:absolute;top:12px;left:12px;
  display:flex;gap:6px;flex-wrap:wrap;z-index:2;
}
.badge{
  padding:3px 10px;border-radius:5px;
  font-size:.67rem;font-weight:700;
  letter-spacing:.03em;backdrop-filter:blur(8px);
}
.badge-verified{background:rgba(16,185,129,.92);color:#fff;}
.badge-featured{background:rgba(255,201,71,.96);color:#0a0a0a;}
.badge-new{background:rgba(99,102,241,.92);color:#fff;}
.badge-rent{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);}
/* Save button on card */
.pc-save{
  position:absolute;top:12px;right:12px;z-index:2;
  width:34px;height:34px;border-radius:50%;
  background:rgba(0,0,0,.5);border:none;
  color:#fff;font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(4px);
}
.pc-save:hover{background:rgba(255,201,71,.9);color:#0a0a0a;}
.pc-save.saved{background:rgba(255,201,71,.9);color:#0a0a0a;}
.pc-body{padding:18px 20px 20px;flex:1;display:flex;flex-direction:column;}
.pc-type-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;}
.pc-type{font-size:.72rem;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:.07em;}
.pc-loc{font-size:.8rem;color:var(--muted);display:flex;align-items:center;gap:4px;margin-bottom:7px;}
.pc-title{
  font-family:'Syne',sans-serif;font-weight:700;
  font-size:1.05rem;margin-bottom:7px;line-height:1.3;color:var(--text);
}
.pc-price{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:1.28rem;color:var(--emerald);margin-bottom:12px;
}
.pc-price em{
  font-style:normal;font-family:'DM Sans',sans-serif;
  font-weight:400;font-size:.75rem;color:var(--muted);
}
.pc-specs{
  display:flex;gap:12px;color:var(--muted);
  font-size:.8rem;margin-bottom:12px;flex-wrap:wrap;
}
.pc-spec{display:flex;align-items:center;gap:4px;}
.pc-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px;}
.ptag{
  font-size:.69rem;padding:2px 8px;
  background:var(--bg-2);border:1px solid var(--border);
  border-radius:100px;color:var(--muted);
}
.pc-actions{display:flex;gap:8px;margin-top:auto;}
.btn-det{
  flex:1;padding:10px;background:transparent;
  border:1px solid var(--border);color:var(--text);
  border-radius:var(--radius);font-size:.82rem;text-align:center;
  font-family:'DM Sans',sans-serif;font-weight:500;
  transition:all .18s;
}
.btn-det:hover{border-color:var(--gold);color:var(--gold);}
.btn-wa-card{
  flex:1;padding:10px;background:var(--wa);color:#fff;
  border:none;border-radius:var(--radius);font-size:.82rem;
  text-align:center;font-family:'DM Sans',sans-serif;
  font-weight:600;transition:all .18s;
  display:flex;align-items:center;justify-content:center;gap:4px;
}
.btn-wa-card:hover{background:#128C7E;}

/* ══════════════════════════════════════════════
   PAGE HEADER — inner pages
══════════════════════════════════════════════ */
.page-header{
  padding:120px 0 56px;
  background:linear-gradient(180deg,var(--bg-2) 0%,var(--bg) 100%);
  border-bottom:1px solid var(--border);
  position:relative;overflow:hidden;
}
.page-header::before{
  content:'';position:absolute;
  top:-30%;right:-8%;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,var(--gold-dim) 0%,transparent 70%);
  pointer-events:none;
}
.breadcrumb{
  display:flex;align-items:center;gap:8px;
  font-size:.79rem;color:var(--muted);margin-bottom:18px;flex-wrap:wrap;
}
.breadcrumb a{color:var(--muted);transition:color .18s;}
.breadcrumb a:hover{color:var(--gold);}
.breadcrumb .sep{opacity:.4;}

/* ══════════════════════════════════════════════
   FORM SYSTEM
══════════════════════════════════════════════ */
.form-group{margin-bottom:20px;}
.form-label{
  display:block;font-size:.72rem;font-weight:700;
  text-transform:uppercase;letter-spacing:.09em;
  color:var(--muted);margin-bottom:8px;
}
.form-input,.form-select,.form-textarea{
  width:100%;padding:12px 15px;
  background:var(--bg-2);border:1.5px solid var(--border);
  color:var(--text);border-radius:var(--radius);
  font-family:'DM Sans',sans-serif;font-size:.9rem;
  outline:none;transition:all .2s;box-sizing:border-box;
}
.form-input:focus,.form-select:focus,.form-textarea:focus{
  border-color:var(--gold);
  box-shadow:0 0 0 3px var(--gold-dim);
  background:var(--card);
}
.form-textarea{resize:vertical;min-height:110px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
.form-hint{font-size:.74rem;color:var(--dim);margin-top:6px;}
.form-error{font-size:.74rem;color:var(--red);margin-top:6px;}
.form-success{font-size:.74rem;color:var(--emerald);margin-top:6px;}
.check-label{
  display:flex;align-items:center;gap:10px;
  margin-bottom:10px;font-size:.88rem;color:var(--muted);cursor:pointer;
}
.check-label input{width:16px;height:16px;accent-color:var(--gold);}

/* ══════════════════════════════════════════════
   CARD BASE
══════════════════════════════════════════════ */
.card{
  background:var(--card);border:1px solid var(--border);
  border-radius:var(--radius-lg);padding:28px;
  transition:border-color .2s;
}
.card-hover{transition:border-color .2s,transform .2s,box-shadow .2s;}
.card-hover:hover{transform:translateY(-3px);border-color:var(--gold);box-shadow:var(--shadow);}

/* ══════════════════════════════════════════════
   TRUST BADGES
══════════════════════════════════════════════ */
.badge-verified-lg{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--em-dim);color:var(--emerald);
  border:1px solid rgba(16,185,129,.25);
  padding:4px 12px;border-radius:100px;
  font-size:.75rem;font-weight:700;
}
.badge-gold-lg{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--gold-dim);color:var(--gold);
  border:1px solid rgba(255,201,71,.25);
  padding:4px 12px;border-radius:100px;
  font-size:.75rem;font-weight:700;
}

/* ══════════════════════════════════════════════
   FLOATING ELEMENTS
══════════════════════════════════════════════ */
.wa-float{
  position:fixed;bottom:28px;right:28px;
  width:58px;height:58px;
  background:var(--wa);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:1.75rem;z-index:950;
  box-shadow:0 8px 24px rgba(37,211,102,.4);
  transition:all .3s;
  animation:wa-pulse 3s ease-in-out infinite;
}
.wa-float:hover{transform:scale(1.12);box-shadow:0 12px 32px rgba(37,211,102,.6);}
@keyframes wa-pulse{0%,100%{box-shadow:0 8px 24px rgba(37,211,102,.4);}50%{box-shadow:0 8px 36px rgba(37,211,102,.65);}}

.scroll-top{
  position:fixed;bottom:98px;right:28px;
  width:42px;height:42px;
  background:var(--card);border:1px solid var(--border);
  color:var(--text);border-radius:50%;font-size:1.1rem;
  cursor:pointer;z-index:900;opacity:0;pointer-events:none;
  transition:all .25s;
  display:flex;align-items:center;justify-content:center;
}
.scroll-top.show{opacity:1;pointer-events:all;}
.scroll-top:hover{border-color:var(--gold);color:var(--gold);}

/* ══════════════════════════════════════════════
   AI CHAT WIDGET
══════════════════════════════════════════════ */
.chat-fab{
  position:fixed;bottom:100px;left:28px;
  width:52px;height:52px;
  background:linear-gradient(135deg,var(--gold),var(--emerald));
  border:none;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:1.4rem;cursor:pointer;z-index:900;
  box-shadow:0 6px 20px var(--gold-glow);
  transition:transform .2s;
}
.chat-fab:hover{transform:scale(1.1);}
.chat-window{
  position:fixed;bottom:164px;left:28px;
  width:320px;height:440px;
  background:var(--card);border:1px solid var(--gold);
  border-radius:18px;display:flex;flex-direction:column;
  z-index:901;overflow:hidden;
  box-shadow:var(--shadow-lg);
  transform:translateY(14px) scale(.97);
  opacity:0;pointer-events:none;
  transition:all .22s ease;
}
.chat-window.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}
.chat-win-hdr{
  background:linear-gradient(135deg,var(--gold),var(--emerald));
  padding:13px 15px;
  display:flex;justify-content:space-between;align-items:center;flex-shrink:0;
}
.chat-win-hdr-info{display:flex;align-items:center;gap:10px;}
.chat-win-icon{
  width:34px;height:34px;background:rgba(0,0,0,.15);
  border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;
}
.chat-win-name{font-weight:700;color:#0a0a0a;font-size:.9rem;}
.chat-win-status{font-size:.68rem;color:#0a0a0a;opacity:.75;}
.chat-win-close{
  background:rgba(0,0,0,.1);border:none;color:#0a0a0a;
  font-size:1.2rem;cursor:pointer;
  width:30px;height:30px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
}
.chat-messages{
  flex:1;padding:13px;overflow-y:auto;
  display:flex;flex-direction:column;gap:9px;
}
.chat-messages::-webkit-scrollbar{width:3px;}
.chat-messages::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
.chat-msg{max-width:84%;padding:9px 13px;border-radius:14px;font-size:.85rem;line-height:1.5;}
.chat-msg.bot{
  background:var(--bg-2);border:1px solid var(--border);
  border-bottom-left-radius:3px;align-self:flex-start;color:var(--text);
}
.chat-msg.user{
  background:var(--emerald);color:#fff;
  border-bottom-right-radius:3px;align-self:flex-end;
}
.chat-quick-btns{
  padding:7px 11px;display:flex;flex-wrap:wrap;gap:5px;
  border-top:1px solid var(--border);flex-shrink:0;
}
.chat-quick-btns button{
  padding:4px 9px;background:var(--bg-2);
  border:1px solid var(--border);border-radius:100px;
  color:var(--muted);font-size:.71rem;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .15s;
}
.chat-quick-btns button:hover{border-color:var(--gold);color:var(--gold);}
.chat-input-row{
  padding:11px 12px;border-top:1px solid var(--border);
  display:flex;gap:7px;flex-shrink:0;
}
.chat-input-row input{
  flex:1;padding:9px 12px;background:var(--bg-2);
  border:1px solid var(--border);border-radius:9px;
  color:var(--text);font-family:'DM Sans',sans-serif;
  font-size:.85rem;outline:none;transition:border-color .18s;
}
.chat-input-row input:focus{border-color:var(--gold);}
.chat-input-row button{
  width:42px;height:42px;background:var(--gold);
  color:#0a0a0a;border:none;border-radius:9px;
  font-size:1.1rem;font-weight:700;cursor:pointer;flex-shrink:0;
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
.footer{
  background:var(--bg-2);border-top:1px solid var(--border);
  padding:64px 0 0;
}
.footer-grid{
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1fr;
  gap:48px;padding-bottom:48px;
  border-bottom:1px solid var(--border);
}
.footer-brand p{
  color:var(--muted);font-size:.87rem;
  line-height:1.75;margin-bottom:16px;
}
.footer-brand a{color:var(--muted);transition:color .18s;}
.footer-brand a:hover{color:var(--gold);}
.footer-col h5{
  font-family:'Syne',sans-serif;font-weight:700;
  font-size:.78rem;text-transform:uppercase;
  letter-spacing:.1em;color:var(--muted);margin-bottom:16px;
}
.footer-col ul{display:flex;flex-direction:column;gap:9px;}
.footer-col ul li a{
  color:var(--muted);font-size:.85rem;transition:color .18s;
}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{
  display:flex;justify-content:space-between;align-items:center;
  padding:20px 0;flex-wrap:wrap;gap:12px;
  font-size:.78rem;color:var(--dim);
}
.social-row{display:flex;gap:9px;}
.social-row a{
  width:36px;height:36px;border-radius:9px;
  border:1px solid var(--border);background:var(--card);
  display:flex;align-items:center;justify-content:center;
  font-size:.88rem;color:var(--muted);font-weight:700;
  transition:all .18s;
}
.social-row a:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-2px);}
/* Footer app badges */
.footer-app-row{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px;}
.footer-app-btn{
  display:flex;align-items:center;gap:9px;padding:9px 14px;
  border-radius:11px;background:var(--card);border:1px solid var(--border);
  transition:all .18s;
}
.footer-app-btn:hover{border-color:var(--gold);}
.fab-icon{font-size:1.4rem;}
.fab-sub{font-size:.58rem;color:var(--muted);display:block;line-height:1.2;}
.fab-main{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;line-height:1;}

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */
.text-gold{color:var(--gold);}
.text-emerald{color:var(--emerald);}
.text-muted{color:var(--muted);}
.text-center{text-align:center;}
.flex-center{display:flex;align-items:center;justify-content:center;}
.hidden{display:none!important;}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;}

/* ══════════════════════════════════════════════
   ANIMATIONS
══════════════════════════════════════════════ */
@keyframes fade-up{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes fade-in{from{opacity:0;}to{opacity:1;}}
@keyframes scale-in{from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
@keyframes float-orb{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-28px) scale(1.05);}}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}

.animate-fade-up{animation:fade-up .6s ease forwards;}
.skeleton{
  background:linear-gradient(90deg,var(--bg-2) 25%,var(--border) 50%,var(--bg-2) 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
  border-radius:6px;
}

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */
@media(max-width:1024px){
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .section,.section-alt{padding:72px 0;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .container,.container-sm{padding:0 18px;}
  .footer-grid{grid-template-columns:1fr 1fr;gap:24px;}
  .section,.section-alt{padding:56px 0;}
  .prop-grid{grid-template-columns:1fr;}
  .form-row,.form-row-3{grid-template-columns:1fr;}
  .chat-fab{bottom:92px;left:20px;}
  .chat-window{width:calc(100vw - 36px);left:18px;bottom:156px;}
  .wa-float{bottom:20px;right:20px;width:54px;height:54px;}
}
@media(max-width:480px){
  .footer-grid{grid-template-columns:1fr;}
  .footer-bottom{flex-direction:column;text-align:center;}
  .footer-app-row{flex-direction:column;}
  .nav-container{padding:0 16px;}
}