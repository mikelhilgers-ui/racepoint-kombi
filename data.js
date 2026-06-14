/* =====================================================================
   RACEPOINT KOMBI-PROTOTYP · WEGWERF-CODE (THROWAWAY)
   Bike-Daten = REALISTISCHE PLATZHALTER (echte Modellnamen + plausible
   Preis-Ranges + Specs), KEINE Live-Daten. Echte Quelle (Specialized/
   Cervelo-Feed vs. Sanity-Pflege) = offener Punkt fuer Produktivphase.
   ===================================================================== */
window.RP_BIKES = [
  // ---- RENNRAD ----
  { id:'tarmac-sl8-ltd', name:'S-Works Tarmac SL8 LTD', brand:'specialized', cat:'rennrad', styles:['racer'],            price:11990, video:'9KIh7oOIPT4', specs:['SRAM Red AXS','Roval Rapide','6,8 kg'],          claim:'Aero trifft Leichtbau. Das Allround-Flaggschiff.' },
  { id:'aethos',          name:'S-Works Aethos',          brand:'specialized', cat:'rennrad', styles:['racer','sportlich'], price:10990, video:'vV_rL9yq620', specs:['SRAM Red AXS','Roval Alpinist','6,1 kg'],       claim:'Pures Fahrgefuehl, kompromissloser Leichtbau.' },
  { id:'tarmac-sl7-clx',  name:'Tarmac SL7 S-Works',      brand:'specialized', cat:'rennrad', styles:['racer'],            price:9990,  video:'MHXDMPbMypQ', specs:['SRAM Red AXS','Roval Rapide CLX','Aero'],      claim:'Der Klassiker unter den Dreambuilds.' },
  { id:'cervelo-s5',      name:'Cervelo S5',              brand:'cervelo',     cat:'rennrad', styles:['racer'],            price:8990,  video:'5TcRRpUy5T4', specs:['Dura-Ace Di2','Reserve','Aero'],               claim:'Kompromisslose Aero-Maschine, gebaut fuer Tempo.' },
  { id:'tarmac-sl7-comp', name:'Tarmac SL7 Comp',         brand:'specialized', cat:'rennrad', styles:['sportlich'],        price:3990,  img:'roadbike-shop.jpg', specs:['Shimano 105 Di2','DT Swiss','Carbon'],     claim:'Der Aero-Allrounder fuer ambitionierte Fahrer.' },
  { id:'allez-sport',     name:'Specialized Allez Sport', brand:'specialized', cat:'rennrad', styles:['alltag','sportlich'], price:1490, img:'roadbike-shop.jpg', specs:['Shimano Tiagra','Alu-Rahmen','Einstieg'],  claim:'Ein sauberer, ehrlicher Einstieg ins Rennrad.' },

  // ---- GRAVEL ----
  { id:'crux',            name:'S-Works Crux',            brand:'specialized', cat:'gravel',  styles:['racer','sportlich'], price:9490, video:'cIBBbESSOoc', specs:['SRAM Force XPLR','Pathfinder Pro','7,25 kg'], claim:'Das leichteste Gravelbike von Specialized. Fuer die Ardennen.' },
  { id:'cervelo-aspero',  name:'Cervelo Aspero',          brand:'cervelo',     cat:'gravel',  styles:['racer'],            price:6490,  img:'gravel-ride.jpg', specs:['SRAM Rival XPLR','Reserve','Race-Gravel'],   claim:'Gravel im Renntempo. Schnell auf jedem Untergrund.' },
  { id:'diverge-str',     name:'Specialized Diverge STR', brand:'specialized', cat:'gravel',  styles:['sportlich','alltag'], price:5490, img:'gravel-ride.jpg', specs:['Future Shock 2.0','SRAM Rival','Bikepacking'], claim:'Federung vorn und hinten. Komfort fuer die langen Touren.' },
  { id:'diverge-e5',      name:'Specialized Diverge E5',  brand:'specialized', cat:'gravel',  styles:['alltag'],           price:1690,  img:'gravel-ride.jpg', specs:['Shimano GRX','Alu-Rahmen','Einstieg'],       claim:'Robust und vielseitig. Der Allrounder fuer jeden Tag.' },

  // ---- MTB ----
  { id:'epic-8',          name:'S-Works Epic 8',          brand:'specialized', cat:'mtb',     styles:['racer'],            price:11490, video:'2zD31t7mWCw', specs:['SRAM XX SL','RockShox SID','Marathon'],       claim:'Vollgefedert, federleicht. Fuer den Renntag im Wald.' },
  { id:'enduro',          name:'Specialized Enduro',      brand:'specialized', cat:'mtb',     styles:['sportlich'],        price:5490,  img:'mtb-ridge.jpg', specs:['170 mm Federweg','Enduro','Coil-Option'],     claim:'Maximale Reserven bergab. Die Abfahrtsmaschine fuer ruppiges Gelaende.' },
  { id:'stumpjumper-evo', name:'Stumpjumper EVO',         brand:'specialized', cat:'mtb',     styles:['sportlich'],        price:4990,  img:'mtb-ridge.jpg', specs:['Fox 36','SRAM GX','Trail / Enduro'],          claim:'Vom Trail bis zur ruppigen Abfahrt. Dein Spielgeraet.' },
  { id:'stumpjumper',     name:'Stumpjumper',             brand:'specialized', cat:'mtb',     styles:['sportlich','alltag'], price:3490, img:'mtb-action.jpg', specs:['130 mm Federweg','Trail','Vielseitig'],      claim:'Der vielseitige Trail-Allrounder. Fuer lange Touren und flowige Abfahrten.' },
  { id:'rockhopper',      name:'Rockhopper Comp',         brand:'specialized', cat:'mtb',     styles:['alltag'],           price:890,   img:'mtb-action.jpg', specs:['Shimano Deore','Hardtail','Einstieg'],        claim:'Solides Hardtail. Der Einstieg ins Gelaende.' },

  // ---- E-BIKE ----
  { id:'turbo-levo-sl',   name:'Turbo Levo SL',           brand:'specialized', cat:'ebike',   styles:['sportlich','racer'], price:7490, img:'mtb-action.jpg', specs:['SL 1.1 Motor','Fox-Fahrwerk','E-MTB'],       claim:'E-MTB mit ganz natuerlichem Fahrgefuehl.' },
  { id:'turbo-creo-sl',   name:'Turbo Creo SL',           brand:'specialized', cat:'ebike',   styles:['sportlich'],        price:8990,  img:'gravel-ride.jpg', specs:['SL 1.1 Motor','Carbon','E-Road / Gravel'],  claim:'Der Rueckenwind fuer deine grossen Touren.' },
  { id:'turbo-vado-sl',   name:'Turbo Vado SL',           brand:'specialized', cat:'ebike',   styles:['alltag'],           price:4290,  img:'roadbike-shop.jpg', specs:['SL 1.1 Motor','Gepaecktraeger','Alltag'], claim:'Leicht und wendig. Fuer Pendeln und Touren.' },

  // ---- FAMILIE & ALLTAG (Einsteiger, Kinder, Trekking) ----
  { id:'turbo-vado-4',    name:'Turbo Vado 4.0',          brand:'specialized', cat:'familie', styles:['alltag'],           price:3500,  img:'roadbike-shop.jpg', specs:['E-Trekking','Vollausstattung','Gepaecktraeger'], claim:'Das E-Trekkingrad fuer Alltag und Familientouren. Mit voller Ausstattung.' },
  { id:'sirrus-x',        name:'Specialized Sirrus X 3.0', brand:'specialized', cat:'familie', styles:['sportlich','alltag'], price:1190, img:'gravel-ride.jpg', specs:['Fitness','Hydraulik-Disc','vielseitig'],   claim:'Fitnessbike fuer Stadt und Schotter. Sportlich und alltagstauglich.' },
  { id:'roll-3',          name:'Specialized Roll 3.0',    brand:'specialized', cat:'familie', styles:['alltag'],           price:950,   img:'shop-interior.jpg', specs:['Comfort-Geometrie','aufrecht','Alltag'],   claim:'Aufrecht, bequem, zuverlaessig. Der entspannte Begleiter fuer jeden Tag.' },
  { id:'jett-24',         name:'Specialized Jett 24',     brand:'specialized', cat:'familie', styles:['alltag'],           price:480,   img:'mtb-action.jpg', specs:['Kinderrad','leicht','24 Zoll'],               claim:'Leichtes Kinderrad, das mitwaechst. Fuer die ersten grossen Runden.' },
];

/* Budget-Tier aus Preis ableiten: b1<2500 · b2 2500-5000 · b3 5000-8000 · b4 8000+ */
window.RP_BUDGET = [
  { key:'b1', label:'bis 2.500 €',     test:p => p < 2500 },
  { key:'b2', label:'2.500–5.000 €', test:p => p >= 2500 && p < 5000 },
  { key:'b3', label:'5.000–8.000 €', test:p => p >= 5000 && p < 8000 },
  { key:'b4', label:'8.000 €+',         test:p => p >= 8000 },
];
window.RP_STYLES = [
  { key:'alltag',    label:'Alltag / Komfort', sub:'Pendeln, Touren, entspannt' },
  { key:'sportlich', label:'Sportlich / Fitness', sub:'Training, schnelle Runden' },
  { key:'racer',     label:'Racer / Wettkampf', sub:'Tempo, Rennen, kompromisslos' },
];
window.RP_BRANDS = [
  { key:'any',         label:'Egal' },
  { key:'specialized', label:'Specialized' },
  { key:'cervelo',     label:'Cervelo' },
];

window.rpBikeImg = b => b.video
  ? 'https://img.youtube.com/vi/' + b.video + '/maxresdefault.jpg'
  : 'assets/' + b.img;
window.rpPrice = p => 'ab ' + p.toLocaleString('de-DE') + ' €';
