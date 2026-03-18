let _allProps=[];
(async function(){
  try{
    const r=await fetch('data/properties.json');
    _allProps=await r.json();
    window._allPropsReady=true;
    applyFilters();
  }catch(e){
    const g=document.getElementById('props-grid');
    if(g)g.innerHTML='<div class="no-results"><div class="no-results-icon">😔</div><h3>Could not load properties</h3><p style="color:var(--muted)">Please refresh.</p></div>';
  }
})();
function filterAndSort(s){
  let r=_allProps.filter(p=>{
    if(s.text){const h=(p.title+' '+p.area+' '+p.type+' '+(p.description||'')).toLowerCase();if(!h.includes(s.text))return false;}
    if(s.area!=='All'&&p.area!==s.area)return false;
    if(s.type!=='All'&&p.type!==s.type)return false;
    if(p.price>s.maxPrice)return false;
    if(s.beds!=='Any'){if(s.beds==='4+'){if(p.beds<4)return false;}else if(p.beds!==parseInt(s.beds))return false;}
    if(s.furnished!=='Any'){const f=p.furnished===true;if(s.furnished==='Furnished'&&!f)return false;if(s.furnished==='Unfurnished'&&f)return false;}
    if(s.amenities&&s.amenities.length){if(!s.amenities.every(a=>p.amenities&&p.amenities.includes(a)))return false;}
    return true;
  });
  switch(s.sort){
    case 'newest':r.sort((a,b)=>new Date(b.postedDate)-new Date(a.postedDate));break;
    case 'price-asc':r.sort((a,b)=>a.price-b.price);break;
    case 'price-desc':r.sort((a,b)=>b.price-a.price);break;
    default:r.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||b.views-a.views);
  }
  return r;
}
function getSaved(){try{return JSON.parse(localStorage.getItem('rt_saved')||'[]');}catch{return[];}}
function toggleSave(id,btn){let s=getSaved();if(s.includes(id)){s=s.filter(x=>x!==id);btn.classList.remove('saved');}else{s.push(id);btn.classList.add('saved');}localStorage.setItem('rt_saved',JSON.stringify(s));}
```

Press `Ctrl + S`.

---

**Switch to `properties.html` tab in VS Code.**

Press `Ctrl + F`, search for:
```
function applyFilters() {