/* ============================ Styles ============================ */
export function Styles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root{
  --bg:#0a0a0c; --bg2:#0e0e11; --panel:#121215; --panel2:#16161a;
  --border:#23232a; --border2:#2e2e37;
  --text:#f3f3f5; --muted:#a0a0aa; --muted2:#6c6c76;
  --accent:#fb5d6a; --accent2:#ff7a85; --accent-soft:rgba(251,93,106,.12);
  --green:#34d399; --amber:#fbbf24; --red:#f43f5e;
}
*{box-sizing:border-box;}
.app-root{min-height:100vh;background:
  radial-gradient(1200px 600px at 80% -10%, rgba(251,93,106,.10), transparent 60%),
  radial-gradient(900px 500px at -10% 110%, rgba(52,211,153,.06), transparent 55%),
  var(--bg);
  color:var(--text);font-family:'Hanken Grotesk',sans-serif;-webkit-font-smoothing:antialiased;}
.mono{font-family:'JetBrains Mono',monospace;font-feature-settings:"tnum";}

/* ---------- auth ---------- */
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;}
.auth-glow{position:absolute;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(251,93,106,.18),transparent 60%);filter:blur(40px);
  top:-120px;animation:float 8s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(30px)}}
.auth-card{position:relative;width:100%;max-width:440px;background:rgba(18,18,21,.72);
  border:1px solid var(--border);border-radius:20px;padding:34px 30px;backdrop-filter:blur(12px);
  box-shadow:0 30px 80px rgba(0,0,0,.5);}
.brand{display:flex;align-items:center;gap:9px;font-family:'Bricolage Grotesque';font-weight:700;font-size:15px;letter-spacing:-.02em;}
.brand.sm{font-size:14px;}
.brand-mark{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;
  background:var(--accent-soft);color:var(--accent);}
.auth-title{font-family:'Bricolage Grotesque';font-weight:800;font-size:32px;line-height:1.08;
  letter-spacing:-.03em;margin:22px 0 10px;}
.auth-sub{color:var(--muted);font-size:14.5px;line-height:1.5;margin-bottom:26px;}
.field-label{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted2);font-weight:600;}
.auth-input-row{display:flex;gap:10px;margin-top:9px;}
.auth-input{flex:1;background:var(--bg2);border:1px solid var(--border2);border-radius:11px;
  padding:13px 15px;color:var(--text);font-size:15px;outline:none;transition:border .15s;font-family:'JetBrains Mono';}
.auth-input:focus{border-color:var(--accent);}
.auth-foot{color:var(--muted2);font-size:12.5px;margin-top:14px;}

/* ---------- buttons ---------- */
.btn-accent{display:inline-flex;align-items:center;gap:7px;background:var(--accent);color:#fff;
  border:none;border-radius:11px;padding:12px 17px;font-weight:600;font-size:14px;cursor:pointer;
  transition:transform .1s,background .15s;font-family:inherit;}
.btn-accent:hover{background:var(--accent2);}
.btn-accent:active{transform:scale(.97);}
.btn-accent:disabled{opacity:.4;cursor:not-allowed;}
.ghost-btn{display:inline-flex;align-items:center;gap:6px;background:transparent;color:var(--muted);
  border:1px solid var(--border2);border-radius:9px;padding:7px 11px;font-size:13px;cursor:pointer;
  transition:.15s;font-family:inherit;}
.ghost-btn:hover{color:var(--text);border-color:var(--muted2);}
.ghost-btn:disabled{opacity:.4;cursor:not-allowed;}
.icon-btn{background:transparent;border:none;color:var(--muted);cursor:pointer;padding:6px;border-radius:8px;display:grid;place-items:center;}
.icon-btn:hover{color:var(--text);background:var(--panel2);}

/* ---------- dashboard ---------- */
.dash{max-width:1080px;margin:0 auto;padding:22px 20px 60px;}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.topbar-right{display:flex;align-items:center;gap:10px;}
.roll-chip{display:inline-flex;align-items:center;gap:6px;background:var(--panel);border:1px solid var(--border);
  border-radius:9px;padding:7px 11px;font-size:13px;font-family:'JetBrains Mono';color:var(--text);}
.panel{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:16px;}
.panel-head{display:flex;align-items:center;gap:8px;font-family:'Bricolage Grotesque';font-weight:700;font-size:15px;margin-bottom:15px;letter-spacing:-.01em;}
.panel-title{font-family:'Bricolage Grotesque';font-weight:700;font-size:16px;margin-bottom:14px;letter-spacing:-.01em;}

/* goal bar */
.goal-bar{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;}
.goal-left{display:flex;align-items:center;gap:12px;}
.goal-label{font-family:'Bricolage Grotesque';font-weight:700;font-size:15px;}
.goal-sub{color:var(--muted2);font-size:12.5px;}
.goal-right{display:flex;align-items:center;gap:14px;flex:1;min-width:240px;justify-content:flex-end;}
.goal-range{flex:1;max-width:380px;accent-color:var(--accent);height:4px;cursor:pointer;}
.goal-num{width:78px;background:var(--bg2);border:1px solid var(--border2);border-radius:10px;
  padding:9px 11px;color:var(--accent);font-size:18px;font-weight:600;text-align:center;outline:none;}
.goal-num:focus{border-color:var(--accent);}

/* stat cards */
.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.stat-card{background:var(--panel2);border:1px solid var(--border);border-radius:13px;padding:15px 16px;}
.tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--muted2);
  background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:2px 7px;margin-bottom:9px;}
.stat-val{font-family:'JetBrains Mono';font-weight:600;font-size:30px;line-height:1;letter-spacing:-.02em;}
.stat-desc{color:var(--muted);font-size:13px;margin-top:8px;line-height:1.4;}
.stat-src{color:var(--muted2);font-size:11.5px;margin-top:5px;}

.add-row{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.add-hint{color:var(--muted2);font-size:13px;}

/* tables */
.table-scroll{overflow-x:auto;margin:0 -4px;}
.data-table{width:100%;border-collapse:collapse;font-size:13.5px;min-width:760px;}
.data-table th{text-align:left;color:var(--muted2);font-weight:600;font-size:11px;text-transform:uppercase;
  letter-spacing:.06em;padding:0 12px 11px;border-bottom:1px solid var(--border);}
.data-table th.num,.data-table td.num{text-align:right;}
.data-table td{padding:13px 12px;border-bottom:1px solid var(--border);vertical-align:top;}
.data-table tr:last-child td{border-bottom:none;}
.subj{font-weight:600;color:var(--text);}
.pill{display:inline-block;padding:3px 9px;border-radius:7px;font-size:12px;font-weight:600;font-family:'JetBrains Mono';}
.muted-sm{color:var(--muted2);font-size:12.5px;}
.of-max{color:var(--muted2);font-size:11px;}
.pending-cell{display:flex;flex-direction:column;gap:6px;align-items:flex-start;}
.pending-keys{display:flex;gap:4px;flex-wrap:wrap;}
.pend-chip{font-family:'JetBrains Mono';font-size:10px;color:var(--amber);background:rgba(251,191,36,.1);
  border:1px solid rgba(251,191,36,.25);border-radius:5px;padding:1px 5px;}
.empty-state{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;
  padding:36px 16px;color:var(--muted);}
.empty-state p{font-size:13.5px;max-width:380px;line-height:1.5;}
.first-run{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:40px 22px;}
.first-run-title{font-family:'Bricolage Grotesque';font-weight:800;font-size:22px;letter-spacing:-.02em;}
.first-run-sub{color:var(--muted);font-size:14px;line-height:1.55;max-width:460px;margin-bottom:6px;}
.chips{display:flex;flex-wrap:wrap;gap:6px;max-width:260px;}
.chip{display:inline-flex;align-items:center;gap:3px;background:var(--accent-soft);color:var(--accent2);
  border:1px solid rgba(251,93,106,.25);border-radius:8px;padding:4px 8px;font-size:12px;cursor:pointer;
  transition:.15s;font-family:inherit;}
.chip:hover{background:rgba(251,93,106,.22);}
.table-foot{color:var(--muted2);font-size:12px;margin-top:13px;line-height:1.5;padding-top:12px;border-top:1px dashed var(--border);}

.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.kv-table{width:100%;border-collapse:collapse;font-size:13.5px;}
.kv-table td{padding:10px 0;border-bottom:1px solid var(--border);}
.kv-k{color:var(--muted);}
.kv-v{text-align:right;color:var(--text);font-weight:500;}
.verdict-box{border:1px solid var(--border);border-left-width:3px;border-radius:12px;padding:15px;background:var(--panel2);}
.verdict-label{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:13px;
  padding:5px 11px;border-radius:8px;font-family:'Bricolage Grotesque';}
.verdict-note{color:var(--muted);font-size:13.5px;line-height:1.55;margin-top:11px;}
.foot{color:var(--muted2);font-size:12px;text-align:center;margin-top:8px;line-height:1.5;}

/* ---------- wizard ---------- */
.wizard-overlay{position:fixed;inset:0;background:var(--bg);z-index:60;display:flex;flex-direction:column;animation:fadeIn .2s;}
.wizard-top{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;}
.wizard-count{font-family:'JetBrains Mono';color:var(--muted2);font-size:13px;}
.wizard-progress{height:2px;background:var(--border);margin:0 22px;border-radius:2px;overflow:hidden;}
.wizard-progress span{display:block;height:100%;background:var(--accent);transition:width .35s cubic-bezier(.4,0,.2,1);}
.wizard-stage{flex:1;display:flex;align-items:center;justify-content:center;padding:24px;overflow:hidden;}
.wizard-step{width:100%;max-width:480px;}
.wizard-q{font-family:'Bricolage Grotesque';font-weight:800;font-size:30px;letter-spacing:-.03em;line-height:1.12;}
.wizard-sub{color:var(--muted2);font-size:14px;margin-top:8px;}
.wizard-input{width:100%;background:transparent;border:none;border-bottom:2px solid var(--border2);
  font-size:26px;color:var(--text);padding:14px 2px;outline:none;margin-top:22px;font-family:'JetBrains Mono';
  transition:border .2s;}
.wizard-input:focus{border-color:var(--accent);}
.wizard-next{margin-top:26px;}
.wizard-hint{color:var(--muted2);font-size:12px;margin-top:12px;font-family:'JetBrains Mono';}
.wizard-actions{display:flex;align-items:center;gap:12px;margin-top:24px;flex-wrap:wrap;}
.wizard-next{margin-top:0;}
.skip-btn{background:transparent;border:1px solid var(--border2);color:var(--muted);border-radius:11px;
  padding:12px 16px;font-size:14px;cursor:pointer;font-family:inherit;transition:.15s;}
.skip-btn:hover{color:var(--text);border-color:var(--muted2);}
.choice-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;}
.choice-btn{flex:1;min-width:140px;text-align:center;background:var(--panel);border:1px solid var(--border2);
  border-radius:13px;padding:18px;color:var(--text);font-size:16px;font-weight:600;cursor:pointer;
  transition:.15s;font-family:inherit;}
.choice-btn:hover{border-color:var(--muted2);background:var(--panel2);}
.choice-btn.on{border-color:var(--accent);background:var(--accent-soft);color:var(--accent2);}
.sprint-head td{padding:16px 12px 8px!important;border-bottom:none!important;}
.sprint-group:first-of-type .sprint-head td{padding-top:4px!important;}
.sprint-badge{display:inline-block;font-family:'Bricolage Grotesque';font-weight:700;font-size:13px;
  color:var(--accent2);background:var(--accent-soft);border:1px solid rgba(251,93,106,.25);
  border-radius:7px;padding:3px 10px;margin-right:10px;}
.sprint-meta{color:var(--muted2);font-size:12px;}

/* ---------- drawer ---------- */
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:70;animation:fadeIn .25s;backdrop-filter:blur(2px);}
.drawer{position:fixed;top:0;right:0;height:100vh;width:min(560px,94vw);background:var(--bg2);
  border-left:1px solid var(--border2);z-index:80;display:flex;flex-direction:column;
  box-shadow:-30px 0 80px rgba(0,0,0,.5);}
.drawer-head{display:flex;align-items:flex-start;justify-content:space-between;padding:20px 22px 16px;border-bottom:1px solid var(--border);}
.drawer-topic{font-family:'Bricolage Grotesque';font-weight:800;font-size:21px;letter-spacing:-.02em;line-height:1.15;}
.drawer-subject{color:var(--accent2);font-size:13px;margin-top:4px;font-weight:500;}
.drawer-tabs{display:flex;align-items:center;gap:8px;padding:13px 22px;border-bottom:1px solid var(--border);}
.dtab{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--border2);
  color:var(--muted);border-radius:9px;padding:7px 12px;font-size:13px;cursor:pointer;font-family:inherit;transition:.15s;}
.dtab.on{background:var(--accent-soft);border-color:rgba(251,93,106,.35);color:var(--accent2);}
.dtab:disabled{opacity:.4;cursor:not-allowed;}
.dtab-spacer{flex:1;}
.drawer-body{flex:1;overflow-y:auto;padding:20px 22px 40px;}

.loading{display:flex;flex-direction:column;align-items:center;padding:34px 0;}
.loader-ring{width:34px;height:34px;border:3px solid var(--border2);border-top-color:var(--accent);
  border-radius:50%;animation:spin .8s linear infinite;}
.loading-msg{color:var(--muted);font-size:14px;margin-top:16px;}
.skel-stack{width:100%;margin-top:28px;display:flex;flex-direction:column;gap:11px;}
.skel{height:13px;border-radius:6px;background:linear-gradient(90deg,var(--panel),var(--panel2),var(--panel));
  background-size:200% 100%;animation:shimmer 1.4s infinite;}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.spin{animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}

.error-box{display:flex;flex-direction:column;align-items:center;gap:13px;text-align:center;padding:30px 10px;color:var(--muted);}
.error-box p{font-size:14px;line-height:1.5;}

.study-view section{margin-bottom:26px;}
.sec-h{display:flex;align-items:center;gap:8px;font-family:'Bricolage Grotesque';font-weight:700;
  font-size:14px;color:var(--text);margin-bottom:12px;letter-spacing:-.01em;}
.sec-h svg{color:var(--accent);}
.bullet-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px;}
.bullet-list li{position:relative;padding-left:18px;color:var(--muted);font-size:13.8px;line-height:1.55;}
.bullet-list li:before{content:"";position:absolute;left:2px;top:8px;width:5px;height:5px;border-radius:50%;background:var(--accent);}
.bullet-list.warn li:before{background:var(--amber);}

.qcard{background:var(--panel);border:1px solid var(--border);border-radius:13px;padding:15px;margin-bottom:12px;}
.qcard.flagged{border-color:rgba(251,191,36,.4);}
.flag-banner{display:flex;align-items:center;gap:6px;color:var(--amber);font-size:12px;font-weight:600;margin-bottom:10px;}
.qhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.qnum{font-family:'JetBrains Mono';font-size:12px;color:var(--accent2);font-weight:600;}
.flag-btn{background:transparent;border:1px solid var(--border2);color:var(--muted2);border-radius:8px;
  padding:5px 7px;cursor:pointer;display:grid;place-items:center;transition:.15s;}
.flag-btn:hover{color:var(--amber);border-color:var(--amber);}
.flag-btn.on{color:var(--amber);border-color:var(--amber);background:rgba(251,191,36,.1);}
.flag-btn.inline{display:inline-flex;align-items:center;gap:6px;font-size:12px;margin-top:14px;width:auto;}
.qtext{font-size:14.5px;line-height:1.5;color:var(--text);margin-bottom:12px;}
.qtext.lg{font-size:17px;line-height:1.45;}
.opts{display:flex;flex-direction:column;gap:7px;}
.opt{display:flex;align-items:flex-start;gap:9px;background:var(--bg2);border:1px solid var(--border);
  border-radius:9px;padding:10px 12px;font-size:13.8px;color:var(--muted);line-height:1.4;}
.opt.clickable{cursor:pointer;text-align:left;width:100%;font-family:inherit;transition:.12s;color:var(--text);}
.opt.clickable:hover:not(:disabled){border-color:var(--muted2);}
.opt.clickable:disabled{cursor:default;}
.opt.correct{border-color:var(--green);background:rgba(52,211,153,.1);color:var(--text);}
.opt.wrong{border-color:var(--red);background:rgba(244,63,94,.1);color:var(--text);}
.opt-key{font-family:'JetBrains Mono';font-weight:600;color:var(--muted2);font-size:12px;min-width:14px;}
.reveal-btn{margin-top:12px;background:transparent;border:1px dashed var(--border2);color:var(--muted);
  border-radius:9px;padding:8px 12px;font-size:12.5px;cursor:pointer;width:100%;font-family:inherit;transition:.15s;}
.reveal-btn:hover{color:var(--text);border-color:var(--muted2);}
.explain{margin-top:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;
  padding:13px;font-size:13.5px;line-height:1.6;color:var(--muted);}

.practice-bar{display:flex;align-items:center;gap:12px;margin-bottom:20px;font-size:12px;}
.practice-track{flex:1;height:4px;background:var(--border);border-radius:3px;overflow:hidden;}
.practice-track span{display:block;height:100%;background:var(--accent);transition:width .3s;}
.practice-q .qnum{font-size:13px;margin-bottom:10px;}
.next-q{margin-top:14px;}
.empty-practice{color:var(--muted2);text-align:center;padding:40px 10px;font-size:14px;}
.summary-screen{display:flex;flex-direction:column;align-items:center;text-align:center;padding:40px 10px;gap:8px;}
.summary-score{font-size:48px;font-weight:600;letter-spacing:-.03em;}
.summary-score span{color:var(--muted2);font-size:26px;}
.summary-pct{color:var(--muted);font-size:15px;}
.summary-line{color:var(--muted);font-size:13.8px;line-height:1.55;max-width:320px;margin:8px 0 18px;}

/* animations */
.fade-up{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) both;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.glide-in{animation:glideIn .4s cubic-bezier(.16,1,.3,1) both;}
@keyframes glideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
.drawer-in{animation:drawerIn .38s cubic-bezier(.16,1,.3,1) both;}
@keyframes drawerIn{from{transform:translateX(100%)}to{transform:none}}

@media (max-width:680px){
  .card-grid{grid-template-columns:repeat(2,1fr);}
  .summary-grid{grid-template-columns:1fr;}
  .auth-title{font-size:27px;}
  .wizard-q{font-size:24px;}
}

/* ---------- print: questions then answer key, black on white ---------- */
#print-root{display:none;}
@media print{
  body * {visibility:hidden;}
  #print-root, #print-root *{visibility:visible;}
  #print-root{display:block;position:absolute;left:0;top:0;width:100%;
    color:#000;background:#fff;font-family:Georgia,serif;padding:28px;}
  #print-root h1{font-size:20px;margin:0 0 4px;}
  #print-root h2{font-size:15px;margin:22px 0 10px;border-bottom:1px solid #000;padding-bottom:4px;}
  #print-root .p-q{margin-bottom:14px;}
  #print-root .p-q p{margin:0 0 4px;font-size:13px;}
  #print-root ol{margin:0 0 0 18px;font-size:12.5px;}
  #print-root .p-a p{margin:0 0 10px;font-size:12.5px;line-height:1.45;}
  .page-break{page-break-before:always;}
}
`}</style>
  );
}
