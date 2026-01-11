import React, { useState } from 'react';
import { Sparkles, Book, Moon, Leaf, Gem, Palette, Star, Calendar } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [answer, setAnswer] = useState('');
  const [tarotReading, setTarotReading] = useState(null);
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnRunes, setDrawnRunes] = useState([]);
  const [selectedRuneSpread, setSelectedRuneSpread] = useState(null);
  const [astroPage, setAstroPage] = useState(null);
  const [selectedSign, setSelectedSign] = useState(null);
  const [birthData, setBirthData] = useState({ date: '', time: '', place: '' });
  const [birthChart, setBirthChart] = useState(null);
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [herbSearch, setHerbSearch] = useState('');
  const [selectedCrystal, setSelectedCrystal] = useState(null);
  const [crystalSearch, setCrystalSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  // Database Colori
  const colorsDatabase = [
    {
      id: 1,
      name: 'Rosso',
      hex: '#DC2626',
      element: 'Fuoco',
      planet: 'Marte',
      chakra: 'Radice',
      day: 'Martedì',
      properties: 'Passione, coraggio, forza, vitalità, azione, energia fisica, desiderio',
      magical: 'Usa candele rosse per: magia d\'amore passionale, coraggio in situazioni difficili, aumentare energia fisica, vincere battaglie, protezione attiva, sessualità, forza di volontà. Attira attenzione e potere.',
      emotional: 'Stimola energia, aumenta passione, dona coraggio. Aiuta superare paura e letargia. Aumenta determinazione. Può aumentare aggressività se usato eccessivamente.',
      practical: 'Indossa rosso per: colloqui importanti, eventi dove servono coraggio ed energia, sport, situazioni che richiedono presenza forte. Usa in casa con moderazione (camera da letto per passione).',
      combinations: 'Con Nero: potere e controllo. Con Bianco: purezza d\'intenti forti. Con Oro: successo rapido e potere materiale.',
      foods: 'Peperoncino, pomodori, fragole, melograno, barbabietole, carne rossa',
      crystals: 'Diaspro Rosso, Granato, Rubino, Corniola',
      herbs: 'Peperoncino, Rosa rossa, Zenzero, Ortica, Basilico',
      zodiac: 'Ariete, Scorpione',
      emoji: '🔴'
    },
    {
      id: 2,
      name: 'Arancione',
      hex: '#F97316',
      element: 'Fuoco',
      planet: 'Sole, Mercurio',
      chakra: 'Sacrale',
      day: 'Domenica, Mercoledì',
      properties: 'Creatività, gioia, successo, energia, entusiasmo, attrazione, fertilità',
      magical: 'Candele arancioni per: creatività e ispirazione, successo rapido, attrazione di opportunità, fertilità, gioia e celebrazione, stimolare appetito (anche per vita), adattabilità.',
      emotional: 'Porta gioia e ottimismo. Stimola creatività e socialità. Incoraggia entusiasmo. Aiuta depressione lieve. Aumenta fiducia senza aggressività del rosso.',
      practical: 'Indossa per: eventi sociali, brainstorming creativi, quando serve energia gioiosa. Ottimo in cucina e spazi creativi. Stimola appetito e conversazione.',
      combinations: 'Con Giallo: creatività intellettuale. Con Rosso: passione creativa. Con Verde: crescita abbondante e fertilità.',
      foods: 'Arance, carote, zucca, albicocche, papaya, melone',
      crystals: 'Corniola, Calcite Arancione, Ambra, Pietra del Sole',
      herbs: 'Calendula, Zafferano, Arancia, Cannella',
      zodiac: 'Leone, Sagittario',
      emoji: '🟠'
    },
    {
      id: 3,
      name: 'Giallo',
      hex: '#EAB308',
      element: 'Aria, Fuoco',
      planet: 'Sole, Mercurio',
      chakra: 'Plesso Solare',
      day: 'Domenica, Mercoledì',
      properties: 'Intelligenza, comunicazione, concentrazione, felicità, successo, fiducia',
      magical: 'Candele gialle per: studio e apprendimento, esami e test, comunicazione chiara, sicurezza in sé, successo negli affari, chiarezza mentale, persuasione.',
      emotional: 'Stimola mente e intelletto. Porta chiarezza e ottimismo. Aumenta fiducia in sé. Combatte confusione mentale. Può causare ansia se eccessivo.',
      practical: 'Indossa per: esami, presentazioni, studio, meeting importanti. Ottimo in uffici e spazi studio. Stimola conversazione intelligente e concentrazione.',
      combinations: 'Con Arancione: successo creativo. Con Verde: prosperità intellettuale. Con Bianco: chiarezza pura e illuminazione.',
      foods: 'Limoni, banane, ananas, mais, zafferano, tuorli d\'uovo',
      crystals: 'Citrino, Ambra, Quarzo Citrino, Topazio Giallo',
      herbs: 'Camomilla, Calendula, Iperico, Finocchio',
      zodiac: 'Gemelli, Leone, Vergine',
      emoji: '🟡'
    },
    {
      id: 4,
      name: 'Verde',
      hex: '#16A34A',
      element: 'Terra, Acqua',
      planet: 'Venere',
      chakra: 'Cuore',
      day: 'Venerdì',
      properties: 'Prosperità, crescita, fertilità, guarigione, abbondanza, natura, equilibrio',
      magical: 'Candele verdi per: magia del denaro e prosperità, crescita in tutti gli ambiti, fertilità e gravidanza, guarigione fisica, fortuna nel gioco, connessione con natura.',
      emotional: 'Equilibrio emotivo e armonia. Guarigione del cuore. Porta pace e rinnovamento. Favorisce crescita personale. Riduce stress e ansia.',
      practical: 'Indossa per: colloqui di lavoro, quando serve fortuna, guarigione. Ottimo in spazi di guarigione, uffici (prosperità), casa (armonia). Calma e rinnova.',
      combinations: 'Con Oro: prosperità materiale. Con Rosa: guarigione del cuore. Con Marrone: ricchezza radicata e crescita stabile.',
      foods: 'Verdure a foglia verde, mele verdi, kiwi, lime, basilico, menta',
      crystals: 'Avventurina Verde, Giada, Malachite, Smeraldo, Quarzo Verde',
      herbs: 'Basilico, Menta, Salvia, Timo, Rosmarino',
      zodiac: 'Toro, Bilancia',
      emoji: '🟢'
    },
    {
      id: 5,
      name: 'Blu',
      hex: '#2563EB',
      element: 'Acqua, Aria',
      planet: 'Giove, Nettuno',
      chakra: 'Gola, Terzo Occhio',
      day: 'Giovedì',
      properties: 'Comunicazione, verità, saggezza, pace, protezione, guarigione emotiva',
      magical: 'Candele blu per: comunicazione sincera, verità e onestà, guarigione emotiva, pace e calma, protezione psichica, sviluppo spirituale, saggezza e comprensione.',
      emotional: 'Calma profonda e pace interiore. Favorisce comunicazione autentica. Riduce ansia e insonnia. Porta chiarezza emotiva. Può causare freddezza se eccessivo.',
      practical: 'Indossa per: quando serve calma, negoziazioni, parlare in pubblico. Ottimo in camera da letto (riposo), bagni (rilassamento). Favorisce meditazione.',
      combinations: 'Con Bianco: pace spirituale. Con Viola: saggezza spirituale. Con Verde: guarigione completa corpo-mente.',
      foods: 'Mirtilli, more, prugne, fichi, cavolo viola, melanzane',
      crystals: 'Lapislazzuli, Sodalite, Zaffiro, Turchese, Calcedonio Blu',
      herbs: 'Lavanda, Salvia, Verbena, Camomilla',
      zodiac: 'Sagittario, Acquario, Pesci',
      emoji: '🔵'
    },
    {
      id: 6,
      name: 'Viola',
      hex: '#9333EA',
      element: 'Aria, Acqua',
      planet: 'Giove, Nettuno',
      chakra: 'Terzo Occhio, Corona',
      day: 'Giovedì',
      properties: 'Spiritualità, intuizione, divinazione, potere psichico, trasformazione, regalità',
      magical: 'Candele viola per: sviluppo psichico e divinazione, connessione spirituale profonda, meditazione avanzata, lavoro con spiriti e angeli, ambizione spirituale, potere e autorità.',
      emotional: 'Eleva coscienza e spiritualità. Stimola intuizione. Favorisce trasformazione profonda. Porta saggezza interiore. Può causare distacco se eccessivo.',
      practical: 'Indossa per: pratiche spirituali, divinazione, quando serve autorità con saggezza. Ottimo in spazi meditativi. Favorisce sogni profetici.',
      combinations: 'Con Bianco: illuminazione spirituale. Con Nero: magia potente e mistero. Con Argento: intuizione lunare.',
      foods: 'Melanzane, uva nera, cavolo viola, prugne, more, fichi',
      crystals: 'Ametista, Fluorite Viola, Sugilite, Charoite',
      herbs: 'Lavanda, Artemisia, Verbena, Malva',
      zodiac: 'Sagittario, Pesci, Acquario',
      emoji: '🟣'
    },
    {
      id: 7,
      name: 'Rosa',
      hex: '#EC4899',
      element: 'Acqua',
      planet: 'Venere',
      chakra: 'Cuore',
      day: 'Venerdì',
      properties: 'Amore romantico, amicizia, compassione, dolcezza, guarigione emotiva, tenerezza',
      magical: 'Candele rosa per: amore romantico e tenero (non passionale), amicizie e riconciliazione, autostima e amor proprio, guarigione del bambino interiore, compassione, armonia familiare.',
      emotional: 'Apre cuore all\'amore gentile. Guarisce ferite emotive. Porta pace emotiva. Favorisce perdono e compassione. Nutre il sé interiore.',
      practical: 'Indossa per: appuntamenti romantici, quando serve dolcezza, auto-cura. Ottimo in camere da letto (romanticismo), bagni (auto-amore). Calma tensioni.',
      combinations: 'Con Bianco: amore puro. Con Rosso: passione romantica. Con Verde: guarigione del cuore profonda.',
      foods: 'Rose (petali), fragole, lamponi, anguria, pompelmo rosa',
      crystals: 'Quarzo Rosa, Rodonite, Rodocrosite, Kunzite',
      herbs: 'Rosa, Verbena, Melissa, Malva',
      zodiac: 'Toro, Bilancia',
      emoji: '🩷'
    },
    {
      id: 8,
      name: 'Bianco',
      hex: '#F5F5F5',
      element: 'Tutti',
      planet: 'Luna',
      chakra: 'Corona',
      day: 'Lunedì',
      properties: 'Purezza, protezione, pace, verità, nuovi inizi, connessione divina, purificazione',
      magical: 'Candele bianche per: purificazione e pulizia, protezione spirituale, verità e sincerità, nuovi inizi, pace e benedizioni. Sostituisce qualsiasi colore. Universale.',
      emotional: 'Pace assoluta e chiarezza. Purifica emozioni negative. Porta verità e onestà. Nuovo inizio emotivo. Connessione con il divino.',
      practical: 'Indossa per: nuovi inizi, quando serve purezza d\'intenti, cerimonie spirituali. Universalmente appropriato. Amplifica altri colori.',
      combinations: 'Con qualsiasi colore: purifica e potenzia intenzione. Può essere usato da solo per qualsiasi scopo con intenzione chiara.',
      foods: 'Riso bianco, latte, yogurt, cavolfiore, aglio, cipolle bianche',
      crystals: 'Quarzo Ialino, Selenite, Pietra di Luna, Howlite',
      herbs: 'Salvia bianca, Fiori bianchi, Angelica, Vischio',
      zodiac: 'Tutti, specialmente Cancro',
      emoji: '⚪'
    },
    {
      id: 9,
      name: 'Nero',
      hex: '#171717',
      element: 'Terra',
      planet: 'Saturno',
      chakra: 'Radice',
      day: 'Sabato',
      properties: 'Protezione potente, bando, assorbimento negatività, mistero, trasformazione profonda',
      magical: 'Candele nere per: protezione contro magia nera, bando e allontanamento, assorbimento negatività, lavoro ombra, fine di cicli, dissoluzione ostacoli. Molto potente.',
      emotional: 'Assorbe e trasforma emozioni negative. Protegge da vampirismo energetico. Favorisce lavoro ombra profondo. Mistero e introspezione.',
      practical: 'Indossa per: protezione in ambienti negativi, eleganza e autorità, quando serve invisibilità energetica. Assorbe energie, necessita pulizia frequente.',
      combinations: 'Con Bianco: equilibrio perfetto, protezione pura. Con Rosso: potere e controllo. Con Viola: magia profonda.',
      foods: 'Fagioli neri, olive nere, more, liquirizia, sesamo nero',
      crystals: 'Ossidiana Nera, Tormalina Nera, Onice, Ematite',
      herbs: 'Assenzio, Ortica, Aglio, Cipresso',
      zodiac: 'Capricorno, Scorpione',
      emoji: '⚫'
    },
    {
      id: 10,
      name: 'Grigio',
      hex: '#6B7280',
      element: 'Tutti',
      planet: 'Luna (calante)',
      chakra: 'Tutti',
      day: 'Sabato',
      properties: 'Neutralità, equilibrio, contemplazione, invisibilità, quiete, saggezza antica',
      magical: 'Candele grigie per: neutralizzare situazioni, invisibilità psichica, contemplazione profonda, lavoro in zone grigie morali, equilibrio tra opposti, saggezza antica.',
      emotional: 'Calma e neutralità emotiva. Riduce drammi. Favorisce distacco sano. Contemplazione saggia. Può sembrare troppo neutrale.',
      practical: 'Indossa per: quando serve discrezione, professionalità neutra, riflessione. Ottimo per meditazione. Calma senza sedare.',
      combinations: 'Con altri colori: bilancia e modera effetti. Con Nero: protezione discreta. Con Bianco: equilibrio perfetto.',
      foods: 'Funghi, semi di chia, sardine, ostriche',
      crystals: 'Quarzo Fumé, Ematite, Labradorite (grigia)',
      herbs: 'Salvia, Artemisia',
      zodiac: 'Bilancia',
      emoji: '⚪'
    },
    {
      id: 11,
      name: 'Marrone',
      hex: '#92400E',
      element: 'Terra',
      planet: 'Terra, Saturno',
      chakra: 'Radice',
      day: 'Sabato',
      properties: 'Radicamento, stabilità, casa, animali, terra, concentrazione, praticità',
      magical: 'Candele marroni per: radicamento forte, connessione con terra e natura, magia per casa e animali domestici, stabilità finanziaria graduale, concentrazione, lavoro pratico.',
      emotional: 'Radicamento profondo e stabilità. Sicurezza e comfort. Connessione con terra madre. Praticità e senso comune.',
      practical: 'Indossa per: quando serve stabilità, lavoro con terra/giardino, connessione con animali. Ottimo in casa per senso di sicurezza e comfort.',
      combinations: 'Con Verde: ricchezza radicata e crescita stabile. Con Arancione: creatività pratica. Con Oro: abbondanza materiale.',
      foods: 'Patate, cioccolato, caffè, pane integrale, noci, legumi',
      crystals: 'Diaspro, Occhio di Tigre, Quarzo Fumé, Bronzite',
      herbs: 'Cedro, Patchouli, Vetiver, Quercia',
      zodiac: 'Toro, Capricorno, Vergine',
      emoji: '🟤'
    },
    {
      id: 12,
      name: 'Oro',
      hex: '#F59E0B',
      element: 'Fuoco',
      planet: 'Sole',
      chakra: 'Plesso Solare, Corona',
      day: 'Domenica',
      properties: 'Successo, ricchezza, potere solare, prosperità, lusso, energia divina maschile',
      magical: 'Candele oro per: attrazione ricchezza materiale, successo rapido e potente, potere e autorità, energia solare e divina, lusso e abbondanza, vittoria.',
      emotional: 'Autostima elevata e fiducia radiante. Porta senso di abbondanza. Favorisce successo. Può causare egocentrismo se eccessivo.',
      practical: 'Indossa per: quando serve potere e prestigio, occasioni importanti, attrazione abbondanza. Ottimo in uffici e spazi di lavoro per successo.',
      combinations: 'Con Verde: prosperità completa. Con Rosso: potere materiale rapido. Con Bianco: benedizioni divine.',
      foods: 'Miele, zafferano, ananas, mango dorato, curcuma',
      crystals: 'Pirite, Citrino, Ambra, Topazio Dorato',
      herbs: 'Calendula, Iperico, Alloro, Cannella',
      zodiac: 'Leone',
      emoji: '🟡'
    },
    {
      id: 13,
      name: 'Argento',
      hex: '#C0C0C0',
      element: 'Acqua',
      planet: 'Luna',
      chakra: 'Terzo Occhio, Corona',
      day: 'Lunedì',
      properties: 'Intuizione, femminilità, sogni, emozioni, magia lunare, mistero, riflessione',
      magical: 'Candele argento per: magia lunare e cicli, sviluppo intuizione, lavoro con sogni, energie femminili divine, divinazione e scrying, protezione psichica.',
      emotional: 'Intuizione profonda ed emozioni fluide. Connessione con cicli lunari. Favorisce sogni. Energia femminina sacra. Mistero e riflessione.',
      practical: 'Indossa per: pratiche lunari, quando serve intuizione, lavoro psichico. Ottimo per meditazioni notturne e lavoro con sogni.',
      combinations: 'Con Bianco: chiarezza lunare. Con Viola: intuizione spirituale. Con Blu: pace emotiva profonda.',
      foods: 'Pesce, alghe, riso, cetrioli, melone bianco',
      crystals: 'Pietra di Luna, Selenite, Quarzo Ialino, Labradorite',
      herbs: 'Artemisia, Melissa, Verbena, Gelsomino',
      zodiac: 'Cancro, Pesci',
      emoji: '⚪'
    },
    {
      id: 14,
      name: 'Turchese',
      hex: '#06B6D4',
      element: 'Acqua, Aria',
      planet: 'Venere, Nettuno',
      chakra: 'Gola',
      day: 'Venerdì',
      properties: 'Comunicazione dal cuore, protezione viaggi, guarigione, fortuna, amicizia',
      magical: 'Candele turchesi per: comunicazione autentica e dal cuore, protezione in viaggi (specialmente acqua), guarigione emotiva e fisica, attrazione fortuna, amicizie durature.',
      emotional: 'Equilibrio tra mente e cuore. Comunicazione autentica. Guarigione emotiva dolce. Porta fortuna e protezione. Calma ansia.',
      practical: 'Indossa per: quando serve comunicare con il cuore, viaggi, guarigione. Ottimo in spazi di comunicazione e guarigione. Protettivo e fortunato.',
      combinations: 'Con Rosa: comunicazione amorevole. Con Blu: verità del cuore. Con Verde: guarigione completa.',
      foods: 'Pesce, alghe spirulina, acqua marina',
      crystals: 'Turchese, Amazzonite, Acquamarina, Crisocolla',
      herbs: 'Salvia, Lavanda, Menta',
      zodiac: 'Scorpione, Sagittario, Pesci',
      emoji: '🩵'
    },
    {
      id: 15,
      name: 'Indaco',
      hex: '#4F46E5',
      element: 'Acqua',
      planet: 'Nettuno, Saturno',
      chakra: 'Terzo Occhio',
      day: 'Giovedì, Sabato',
      properties: 'Visione psichica, meditazione profonda, sogni lucidi, saggezza interiore, mistero',
      magical: 'Candele indaco per: apertura terzo occhio, sogni lucidi e visioni, meditazione profonda, accesso saggezza interiore, lavoro con inconscio, mistici rituali notturni.',
      emotional: 'Intuizione profondissima e visioni interiori. Accesso inconscio. Saggezza antica. Mistero e profondità. Meditazione avanzata.',
      practical: 'Indossa per: pratiche psichiche profonde, meditazioni avanzate, quando serve saggezza interiore. Favorisce sogni lucidi e visioni.',
      combinations: 'Con Viola: poteri psichici massimi. Con Nero: mistero profondo. Con Argento: visioni lunari.',
      foods: 'More, mirtilli, uva nera, fichi, prugne',
      crystals: 'Lapislazzuli, Sodalite, Azzurrite, Zaffiro',
      herbs: 'Artemisia, Assenzio, Lavanda',
      zodiac: 'Acquario, Pesci',
      emoji: '🔵'
    }
  ];

  // Database Cristalli
  const crystalsDatabase = [
    {
      id: 1,
      name: 'Quarzo Ialino',
      type: 'Quarzo',
      color: 'Trasparente',
      chakra: 'Tutti, specialmente Corona',
      element: 'Tutti',
      planet: 'Sole, Luna',
      properties: 'Amplificazione, purificazione, guarigione, chiarezza, programmabilità',
      magical: 'Il maestro guaritore. Amplifica energie e intenzioni. Programmabile per qualsiasi scopo. Sostituisce qualsiasi cristallo. Crea griglie energetiche.',
      healing: 'Armonizza tutti i chakra. Rinforza aura. Stimola sistema immunitario. Amplifica energia vitale. Riequilibra corpo-mente-spirito.',
      cleansing: 'Sole, luna, acqua corrente, terra, fumo, suono. Molto versatile.',
      zodiac: 'Tutti',
      hardness: '7',
      emoji: '💎'
    },
    {
      id: 2,
      name: 'Ametista',
      type: 'Quarzo',
      color: 'Viola',
      chakra: 'Terzo Occhio, Corona',
      element: 'Aria, Acqua',
      planet: 'Giove, Nettuno',
      properties: 'Protezione spirituale, intuizione, purificazione, meditazione, sobrietà',
      magical: 'Protegge da energie negative. Potenzia intuizione e visioni. Favorisce sogni lucidi. Aiuta meditazione profonda. Connessione spirituale.',
      healing: 'Calma mente, riduce ansia e stress. Aiuta insonnia. Allevia mal di testa. Protegge da dipendenze. Equilibrio emotivo.',
      cleansing: 'Luna (no sole diretto - sbiadisce), fumo, suono, terra',
      zodiac: 'Pesci, Acquario, Sagittario',
      hardness: '7',
      emoji: '💜'
    },
    {
      id: 3,
      name: 'Quarzo Rosa',
      type: 'Quarzo',
      color: 'Rosa',
      chakra: 'Cuore',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Amore incondizionato, compassione, guarigione emotiva, perdono',
      magical: 'La pietra dell\'amore. Attira amore romantico e amicizia. Guarisce ferite del cuore. Aumenta autostima. Perdono di sé e altri.',
      healing: 'Guarisce traumi emotivi. Apre cuore all\'amore. Riduce stress e tensione. Buono per pelle. Armonizza cuore fisico.',
      cleansing: 'Luna, fumo, terra. No sole diretto (sbiadisce)',
      zodiac: 'Toro, Bilancia',
      hardness: '7',
      emoji: '💗'
    },
    {
      id: 4,
      name: 'Quarzo Citrino',
      type: 'Quarzo',
      color: 'Giallo-Oro',
      chakra: 'Plesso Solare, Sacrale',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Abbondanza, manifestazione, gioia, successo, energia solare',
      magical: 'La pietra del mercante - attira prosperità. Manifesta desideri. Aumenta autostima e fiducia. Porta gioia e ottimismo. Non accumula negatività.',
      healing: 'Energizza corpo e mente. Stimola digestione. Aumenta motivazione. Aiuta depressione. Rinforza volontà.',
      cleansing: 'Raramente necessaria (auto-pulente). Luna, suono',
      zodiac: 'Gemelli, Ariete, Leone, Bilancia',
      hardness: '7',
      emoji: '💛'
    },
    {
      id: 5,
      name: 'Ametrina',
      type: 'Quarzo',
      color: 'Viola e Giallo',
      chakra: 'Terzo Occhio, Plesso Solare, Corona',
      element: 'Aria, Fuoco',
      planet: 'Sole, Giove',
      properties: 'Equilibrio, chiarezza mentale, creatività, trasformazione',
      magical: 'Unisce spiritualità (ametista) e manifestazione (citrino). Equilibra maschile-femminile. Trasformazione consapevole. Creatività spirituale.',
      healing: 'Armonizza corpo-mente-spirito. Aiuta concentrazione. Riduce stress. Equilibrio emotivo. Metabolismo.',
      cleansing: 'Luna, suono, raramente necessaria',
      zodiac: 'Bilancia',
      hardness: '7',
      emoji: '💜💛'
    },
    {
      id: 6,
      name: 'Quarzo Fumé',
      type: 'Quarzo',
      color: 'Marrone-Grigio',
      chakra: 'Radice',
      element: 'Terra',
      planet: 'Terra, Saturno',
      properties: 'Radicamento, protezione, dissoluzione negatività, praticità',
      magical: 'Scioglie energia negativa. Radica fortemente. Protegge da radiazioni elettromagnetiche. Dissolve blocchi. Praticità e manifestazione terrena.',
      healing: 'Allevia depressione. Riduce ansia. Aiuta dolori fisici. Disintossica. Rafforza corpo fisico.',
      cleansing: 'Luna, terra, fumo. No sole prolungato',
      zodiac: 'Scorpione, Capricorno, Sagittario',
      hardness: '7',
      emoji: '🤎'
    },
    {
      id: 7,
      name: 'Agata',
      type: 'Calcedonio',
      color: 'Vari (stratificata)',
      chakra: 'Varia per colore',
      element: 'Terra',
      planet: 'Mercurio',
      properties: 'Stabilità, protezione, forza, equilibrio, radicamento',
      magical: 'Protegge viaggiatori. Stabilizza aura. Assorbe negatività. Diverse agate per scopi diversi. Forza interiore graduale.',
      healing: 'Stabilizza energia fisica. Rinforza corpo. Aiuta digestione. Equilibrio emotivo dolce. Longevità.',
      cleansing: 'Luna, acqua, terra, fumo',
      zodiac: 'Gemelli, Vergine',
      hardness: '6.5-7',
      emoji: '🌈'
    },
    {
      id: 8,
      name: 'Lapislazzuli',
      type: 'Metamorfica',
      color: 'Blu intenso con oro',
      chakra: 'Terzo Occhio, Gola',
      element: 'Acqua',
      planet: 'Venere, Giove',
      properties: 'Saggezza, verità, comunicazione, intuizione, realizzazione spirituale',
      magical: 'Pietra sacra degli Egizi. Connessione con saggezza antica. Potenzia abilità psichiche. Verità interiore. Protezione spirituale.',
      healing: 'Stimola ghiandola pineale. Aiuta gola e tiroide. Riduce pressione. Allevia insonnia. Rafforza sistema immunitario.',
      cleansing: 'Luna, fumo. No acqua prolungata (pirite interna)',
      zodiac: 'Sagittario, Capricorno',
      hardness: '5-6',
      emoji: '💙'
    },
    {
      id: 9,
      name: 'Turchese',
      type: 'Fosfato',
      color: 'Blu-Verde',
      chakra: 'Gola, Terzo Occhio',
      element: 'Aria',
      planet: 'Venere, Nettuno',
      properties: 'Protezione, guarigione, comunicazione, fortuna, saggezza',
      magical: 'Pietra sacra dei nativi americani. Protegge viaggiatori. Assorbe negatività (cambia colore). Porta fortuna. Guarigione ancestrale.',
      healing: 'Anti-infiammatoria. Aiuta respirazione. Protegge da inquinamento. Rafforza tutto il corpo. Disintossica.',
      cleansing: 'Fumo, suono. No acqua (poroso), no sole',
      zodiac: 'Scorpione, Sagittario, Pesci',
      hardness: '5-6',
      emoji: '🩵'
    },
    {
      id: 10,
      name: 'Ossidiana Nera',
      type: 'Vetro vulcanico',
      color: 'Nero lucido',
      chakra: 'Radice',
      element: 'Fuoco, Terra',
      planet: 'Saturno, Plutone',
      properties: 'Protezione potente, verità, radicamento, specchio dell\'anima',
      magical: 'Scudo psichico potentissimo. Rivela verità nascoste. Taglia cordoni energetici. Lavoro ombra. Protegge da magia nera.',
      healing: 'Estrae energia negativa. Aiuta shock e traumi. Disintossica fisicamente. Radica profondamente. Molto potente - usare con cautela.',
      cleansing: 'Terra, fumo, acqua corrente rapida',
      zodiac: 'Scorpione, Sagittario, Capricorno',
      hardness: '5-5.5',
      emoji: '🖤'
    },
    {
      id: 11,
      name: 'Labradorite',
      type: 'Feldspato',
      color: 'Grigio con iridescenza blu-verde',
      chakra: 'Terzo Occhio, Corona, Gola',
      element: 'Acqua',
      planet: 'Luna, Urano',
      properties: 'Magia, trasformazione, protezione aurica, intuizione, sincronicità',
      magical: 'La pietra degli stregoni. Risveglia abilità magiche. Protegge aura da fughe energetiche. Facilita viaggi astrali. Sincronicità.',
      healing: 'Bilancia ormoni. Aiuta metabolismo. Riduce stress e ansia. Protegge da radiazioni. Rinforza aura.',
      cleansing: 'Luna, fumo, suono',
      zodiac: 'Leone, Scorpione, Sagittario',
      hardness: '6-6.5',
      emoji: '✨'
    },
    {
      id: 12,
      name: 'Occhio di Tigre',
      type: 'Quarzo',
      color: 'Marrone-Oro striato',
      chakra: 'Plesso Solare, Radice',
      element: 'Fuoco, Terra',
      planet: 'Sole',
      properties: 'Protezione, coraggio, prosperità, fiducia, radicamento',
      magical: 'Riflette negatività al mittente. Aumenta coraggio e volontà. Manifesta abbondanza. Protezione in viaggi. Fortuna.',
      healing: 'Rafforza volontà. Riduce ansia. Aiuta digestione. Aumenta energia vitale. Equilibrio emotivo.',
      cleansing: 'Luna, fumo. No acqua salata, no sole prolungato',
      zodiac: 'Capricorno, Leone',
      hardness: '6.5-7',
      emoji: '🐯'
    },
    {
      id: 13,
      name: 'Malachite',
      type: 'Carbonato di rame',
      color: 'Verde con bande',
      chakra: 'Cuore, Plesso Solare',
      element: 'Fuoco',
      planet: 'Venere, Plutone',
      properties: 'Trasformazione, protezione, guarigione emotiva, cambiamento',
      magical: 'Pietra del cambiamento. Rompe schemi vecchi. Protegge viaggiatori e bambini. Assorbe negatività (attenzione: non pulirla abbastanza = esaurimento).',
      healing: 'Detossifica fegato. Aiuta crampi mestruali. Riduce dolore. Estrae energia negativa. Potente - usare con moderazione.',
      cleansing: 'Fumo, terra, suono. No acqua (tossica), no sole',
      zodiac: 'Scorpione, Capricorno',
      hardness: '3.5-4',
      emoji: '💚'
    },
    {
      id: 14,
      name: 'Selenite',
      type: 'Gesso',
      color: 'Bianco traslucido',
      chakra: 'Corona, Terzo Occhio',
      element: 'Aria',
      planet: 'Luna',
      properties: 'Purificazione, chiarezza, connessione angelica, pace, pulizia',
      magical: 'Auto-pulente e pulisce altri cristalli. Connessione angelica diretta. Cancella blocchi energetici. Pace profonda. Espande consapevolezza.',
      healing: 'Chiarezza mentale. Flessibilità fisica. Allinea colonna. Purifica aura rapidamente. Pace interiore.',
      cleansing: 'Luna, suono. MAI acqua (si scioglie), no sole',
      zodiac: 'Toro, Cancro',
      hardness: '2',
      emoji: '🤍'
    },
    {
      id: 15,
      name: 'Amazzonite',
      type: 'Feldspato',
      color: 'Verde-Turchese',
      chakra: 'Cuore, Gola',
      element: 'Acqua, Terra',
      planet: 'Urano',
      properties: 'Verità, comunicazione, coraggio, speranza, equilibrio',
      magical: 'Pietra delle guerriere Amazzoni. Fortifica spirito. Coraggio di parlare verità. Manifesta sogni. Protegge da radiazioni.',
      healing: 'Calma sistema nervoso. Aiuta osteoporosi. Equilibra metabolismo. Riduce preoccupazioni. Filtra radiazioni elettromagnetiche.',
      cleansing: 'Luna, fumo, acqua rapida. No sole prolungato',
      zodiac: 'Vergine, Acquario',
      hardness: '6-6.5',
      emoji: '💎'
    },
    {
      id: 16,
      name: 'Corniola',
      type: 'Calcedonio',
      color: 'Arancione-Rosso',
      chakra: 'Sacrale, Radice',
      element: 'Fuoco',
      planet: 'Marte, Sole',
      properties: 'Creatività, coraggio, motivazione, vitalità, passione',
      magical: 'Stimola creatività e passione. Aumenta coraggio. Manifesta desideri. Protegge da invidia. Attiva forza vitale.',
      healing: 'Aumenta energia fisica. Stimola fertilità. Aiuta digestione e assorbimento vitamine. Purifica sangue. Motivazione.',
      cleansing: 'Sole, luna, acqua, terra',
      zodiac: 'Vergine, Leone, Ariete',
      hardness: '6.5-7',
      emoji: '🧡'
    },
    {
      id: 17,
      name: 'Sodalite',
      type: 'Silicato',
      color: 'Blu con venature bianche',
      chakra: 'Terzo Occhio, Gola',
      element: 'Acqua',
      planet: 'Venere, Luna',
      properties: 'Logica, verità, comunicazione, intuizione, razionalità',
      magical: 'Unisce logica e intuizione. Aiuta comunicazione chiara. Potenzia abilità psichiche razionali. Verità oggettiva.',
      healing: 'Calma attacchi di panico. Abbassa pressione. Equilibra metabolismo. Rinforza sistema immunitario. Chiarezza mentale.',
      cleansing: 'Luna, fumo. Acqua occasionale, no sole',
      zodiac: 'Sagittario',
      hardness: '5.5-6',
      emoji: '💙'
    },
    {
      id: 18,
      name: 'Avventurina Verde',
      type: 'Quarzo',
      color: 'Verde',
      chakra: 'Cuore',
      element: 'Terra, Acqua',
      planet: 'Venere, Mercurio',
      properties: 'Fortuna, prosperità, opportunità, guarigione emotiva, crescita',
      magical: 'La pietra del giocatore - attira fortuna. Manifesta opportunità. Apre cuore. Prospettà crescente. Ottimismo.',
      healing: 'Guarisce cuore emotivo e fisico. Riduce stress. Aiuta allergie. Equilibrio ormonale. Pelle sana.',
      cleansing: 'Luna, acqua, fumo, terra',
      zodiac: 'Ariete, Leone',
      hardness: '6.5-7',
      emoji: '💚'
    },
    {
      id: 19,
      name: 'Pirite',
      type: 'Solfuro di ferro',
      color: 'Oro metallico',
      chakra: 'Plesso Solare',
      element: 'Fuoco, Terra',
      planet: 'Marte, Sole',
      properties: 'Manifestazione, protezione, volontà, abbondanza, azione',
      magical: 'Manifesta abbondanza concreta. Scudo energetico. Aumenta volontà e azione. Attira prosperità fisica. Mascotte fortuna.',
      healing: 'Aumenta energia vitale. Ossigena sangue. Aiuta respirazione. Protegge da inquinamento. Rafforza struttura ossea.',
      cleansing: 'Fumo, suono. No acqua (ossida), no sale',
      zodiac: 'Leone',
      hardness: '6-6.5',
      emoji: '✨'
    },
    {
      id: 20,
      name: 'Diaspro Rosso',
      type: 'Calcedonio',
      color: 'Rosso mattone',
      chakra: 'Radice',
      element: 'Fuoco, Terra',
      planet: 'Marte',
      properties: 'Radicamento, resistenza, coraggio, vitalità, protezione',
      magical: 'Radicamento potente. Coraggio del guerriero. Protegge in tempi difficili. Connessione con terra. Forza fisica e mentale.',
      healing: 'Aumenta resistenza. Stimola circolazione. Disintossica. Aiuta fegato. Equilibrio sessuale. Forza rigenerazione.',
      cleansing: 'Sole, luna, terra, acqua',
      zodiac: 'Ariete, Scorpione',
      hardness: '6.5-7',
      emoji: '❤️'
    },
    {
      id: 21,
      name: 'Pietra di Luna',
      type: 'Feldspato',
      color: 'Bianco perlaceo iridescente',
      chakra: 'Sacrale, Terzo Occhio, Corona',
      element: 'Acqua',
      planet: 'Luna',
      properties: 'Intuizione, cicli, femminilità, emozioni, nuovi inizi',
      magical: 'Pietra della Luna e delle dee. Potenzia intuizione. Onora cicli naturali. Fertilità. Sogni profetici. Viaggi astrali.',
      healing: 'Equilibra ormoni. Aiuta fertilità e gravidanza. Allevia PMS. Calma emozioni. Aiuta digestione. Sistema linfatico.',
      cleansing: 'Luna piena, fumo. No sole (sbiadisce), acqua delicata',
      zodiac: 'Cancro, Bilancia, Scorpione',
      hardness: '6-6.5',
      emoji: '🌙'
    },
    {
      id: 22,
      name: 'Ematite',
      type: 'Ossido di ferro',
      color: 'Nero-Grigio metallico',
      chakra: 'Radice',
      element: 'Terra',
      planet: 'Marte, Saturno',
      properties: 'Radicamento forte, protezione, concentrazione, assorbimento',
      magical: 'Radica e protegge. Assorbe negatività. Riflette malocchio. Concentrazione mentale. Dissolve illusioni.',
      healing: 'Rafforza sangue e circolazione. Aiuta anemia. Radica energia dispersa. Calma iperattività. Rafforza volontà.',
      cleansing: 'Terra, suono. Acqua minima (ossida)',
      zodiac: 'Ariete, Acquario',
      hardness: '5.5-6.5',
      emoji: '⚫'
    },
    {
      id: 23,
      name: 'Fluorite',
      type: 'Alogenuro',
      color: 'Viola, Verde, Blu (vari)',
      chakra: 'Varia per colore',
      element: 'Aria, Acqua',
      planet: 'Mercurio, Nettuno',
      properties: 'Concentrazione, chiarezza mentale, protezione psichica, ordine',
      magical: 'Aumenta capacità mentali. Protegge aura. Dissolve illusioni. Porta ordine nel caos. Studio e apprendimento.',
      healing: 'Chiarezza mentale. Aiuta ossa e denti. Rinforza sistema immunitario. Protegge da radiazioni elettromagnetiche.',
      cleansing: 'Luna, fumo, suono. No sole (sbiadisce), no acqua salata',
      zodiac: 'Capricorno, Pesci',
      hardness: '4',
      emoji: '💜'
    },
    {
      id: 24,
      name: 'Rodonite',
      type: 'Silicato',
      color: 'Rosa con venature nere',
      chakra: 'Cuore',
      element: 'Fuoco, Terra',
      planet: 'Venere, Marte',
      properties: 'Amore compassionevole, perdono, guarigione emotiva, equilibrio',
      magical: 'Guarisce ferite emotive profonde. Perdono di sé e altri. Amore maturo. Compassione attiva. Servizio con amore.',
      healing: 'Guarisce traumi emotivi. Aiuta respirazione. Disintossica. Rafforza cuore. Riduce ansia e panico.',
      cleansing: 'Luna, fumo, terra. Acqua delicata',
      zodiac: 'Toro',
      hardness: '5.5-6.5',
      emoji: '💗'
    },
    {
      id: 25,
      name: 'Calcite Arancione',
      type: 'Carbonato di calcio',
      color: 'Arancione',
      chakra: 'Sacrale, Plesso Solare',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Creatività, sessualità, gioia, energia, guarigione emotiva',
      magical: 'Risveglia creatività. Aumenta energia sessuale sana. Porta gioia. Amplifica energia positiva. Integrazione emotiva.',
      healing: 'Bilancia emozioni. Aiuta sistema riproduttivo. Aumenta energia. Disintossica organi. Aiuta intestino.',
      cleansing: 'Luna, fumo, suono. No acqua (solubile), no sole',
      zodiac: 'Cancro, Leone',
      hardness: '3',
      emoji: '🧡'
    },
    {
      id: 26,
      name: 'Opale',
      type: 'Silice idrata',
      color: 'Iridescente (vari colori)',
      chakra: 'Tutti',
      element: 'Acqua, Fuoco',
      planet: 'Luna, Venere',
      properties: 'Amplificazione emotiva, creatività, spontaneità, magia',
      magical: 'Amplifica stati emotivi. Risveglia magia innata. Spontaneità. Invisibilità astrale. Sogni lucidi. Porta fortuna o sfortuna secondo intenzione.',
      healing: 'Bilancia emisferi cerebrali. Aiuta memoria. Purifica sangue e reni. Amplifica guarigione emotiva.',
      cleansing: 'Luna, terra umida, suono. No acqua prolungata (si disidrata), no sole',
      zodiac: 'Cancro, Bilancia, Pesci, Scorpione',
      hardness: '5.5-6.5',
      emoji: '🌈'
    },
    {
      id: 27,
      name: 'Onice Nero',
      type: 'Calcedonio',
      color: 'Nero',
      chakra: 'Radice',
      element: 'Terra, Fuoco',
      planet: 'Saturno',
      properties: 'Protezione, forza, disciplina, perseveranza, radicamento',
      magical: 'Protezione potente. Assorbe negatività. Aumenta autodisciplina. Bando. Stabilità. Aiuta lutto.',
      healing: 'Rafforza ossa e denti. Aumenta resistenza. Aiuta pelle e capelli. Stimola concentrazione. Riduce stress.',
      cleansing: 'Luna, terra, fumo, acqua',
      zodiac: 'Capricorno, Leone',
      hardness: '6.5-7',
      emoji: '⚫'
    },
    {
      id: 28,
      name: 'Giada',
      type: 'Silicato',
      color: 'Verde (prevalente)',
      chakra: 'Cuore',
      element: 'Terra, Acqua',
      planet: 'Venere',
      properties: 'Prosperità, saggezza, longevità, protezione, fortuna',
      magical: 'Pietra imperiale cinese. Attira fortuna e prosperità. Protezione. Saggezza ancestrale. Sogni profetici. Longevità.',
      healing: 'Guarisce reni. Disintossica corpo. Equilibrio emotivo. Longevità. Sistema immunitario. Aiuta parto.',
      cleansing: 'Luna, acqua dolce, terra, fumo',
      zodiac: 'Toro, Bilancia, Ariete',
      hardness: '6-7',
      emoji: '💚'
    },
    {
      id: 29,
      name: 'Ambra',
      type: 'Resina fossile',
      color: 'Giallo-Arancione',
      chakra: 'Plesso Solare, Sacrale, Gola',
      element: 'Fuoco, Terra',
      planet: 'Sole',
      properties: 'Purificazione, guarigione, protezione, memorie ancestrali',
      magical: 'Purifica energie. Connessione con passato e antenati. Protegge bambini. Assorbe dolore e negatività. Porta fortuna.',
      healing: 'Allevia dolore (specialmente denti bambini). Aiuta gola e tiroide. Disintossica. Sistema immunitario. Antinfiammatoria.',
      cleansing: 'Luna, fumo, suono. No acqua calda, no sole prolungato, no sale',
      zodiac: 'Leone, Acquario',
      hardness: '2-2.5',
      emoji: '🟡'
    },
    {
      id: 30,
      name: 'Tormalina Nera',
      type: 'Silicato',
      color: 'Nero',
      chakra: 'Radice',
      element: 'Terra',
      planet: 'Saturno',
      properties: 'Protezione suprema, radicamento, purificazione, schermatura',
      magical: 'Protezione elettromagnetica potente. Converte energia negativa in positiva. Scudo psichico. Purifica aura. Bando potente.',
      healing: 'Protegge da radiazioni. Rafforza sistema immunitario. Allevia artrite. Disintossica. Equilibrio ormonale. Radica.',
      cleansing: 'Luna, fumo, terra, acqua corrente',
      zodiac: 'Capricorno',
      hardness: '7-7.5',
      emoji: '⚫'
    }
  ];

  // Database Erbe Magiche
  const herbsDatabase = [
    {
      id: 1,
      name: 'Lavanda',
      latin: 'Lavandula angustifolia',
      element: 'Aria',
      planet: 'Mercurio',
      properties: 'Purificazione, pace, amore, protezione, guarigione, sonno',
      magical: 'Brucia per purificare gli spazi, metti sotto il cuscino per sogni tranquilli, usa in sacchetti d\'amore. Ottima per rituali di pace e meditazione.',
      practical: 'Infuso rilassante, aiuta il sonno, allevia mal di testa. Olio essenziale per aromaterapia e massaggi.',
      deity: 'Ecate, Mercurio',
      chakra: 'Terzo Occhio, Corona',
      harvest: 'Estate, luna piena',
      emoji: '💜'
    },
    {
      id: 2,
      name: 'Rosmarino',
      latin: 'Rosmarinus officinalis',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, purificazione, memoria, fedeltà, amore, guarigione',
      magical: 'Brucia per purificare, porta con te per protezione. Usa nei rituali di memoria e fedeltà. Appendi sulla porta per proteggere la casa.',
      practical: 'Stimola la memoria e concentrazione. Antiossidante, digestivo. Ottimo in cucina e per capelli.',
      deity: 'Afrodite, Maria Vergine',
      chakra: 'Plesso Solare, Corona',
      harvest: 'Tutto l\'anno, meglio in primavera',
      emoji: '🌿'
    },
    {
      id: 3,
      name: 'Salvia',
      latin: 'Salvia officinalis',
      element: 'Aria',
      planet: 'Giove',
      properties: 'Saggezza, purificazione, protezione, guarigione, longevità, desideri',
      magical: 'Brucia per smudging e purificazione potente. Usa per rituali di saggezza e visioni. Protegge dagli spiriti negativi.',
      practical: 'Antibatterica, anti-infiammatoria, aiuta la menopausa. Eccellente per gargarismi e digestione.',
      deity: 'Zeus/Giove, Athena',
      chakra: 'Terzo Occhio, Corona',
      harvest: 'Prima della fioritura, luna calante',
      emoji: '🍃'
    },
    {
      id: 4,
      name: 'Basilico',
      latin: 'Ocimum basilicum',
      element: 'Fuoco',
      planet: 'Marte',
      properties: 'Prosperità, amore, protezione, esorcismo, ricchezza',
      magical: 'Attira denaro, porta fortuna negli affari. Usa in rituali d\'amore appassionato. Protegge la casa e scaccia negatività.',
      practical: 'Digestivo, antinfiammatorio. Ricco di antiossidanti. Ottimo in cucina per energia vitale.',
      deity: 'Vishnu, Lakshmi, Marte',
      chakra: 'Radice, Plesso Solare',
      harvest: 'Estate, mattino presto',
      emoji: '🌱'
    },
    {
      id: 5,
      name: 'Menta',
      latin: 'Mentha piperita',
      element: 'Aria',
      planet: 'Mercurio/Venere',
      properties: 'Guarigione, purificazione, denaro, viaggi, comunicazione',
      magical: 'Metti nel portafoglio per attirare denaro. Brucia per purificare e guarire. Protegge durante i viaggi.',
      practical: 'Digestiva, rinfrescante, allevia nausea. Ottima per concentrazione e chiarezza mentale.',
      deity: 'Persefone, Plutone',
      chakra: 'Gola, Cuore',
      harvest: 'Prima della fioritura, mattino',
      emoji: '🍃'
    },
    {
      id: 6,
      name: 'Camomilla',
      latin: 'Matricaria chamomilla',
      element: 'Acqua',
      planet: 'Sole',
      properties: 'Pace, sonno, purificazione, denaro, amore, guarigione',
      magical: 'Usa in bagni rituali per pace. Attira denaro e fortuna. Brucia per meditazione e rilassamento profondo.',
      practical: 'Calmante eccellente, aiuta digestione e sonno. Anti-infiammatoria, buona per la pelle.',
      deity: 'Ra, Cernunnos',
      chakra: 'Plesso Solare, Corona',
      harvest: 'Estate, quando i fiori sono aperti',
      emoji: '🌼'
    },
    {
      id: 7,
      name: 'Timo',
      latin: 'Thymus vulgaris',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Coraggio, guarigione, purificazione, protezione psichica',
      magical: 'Brucia per purificare e aumentare coraggio. Indossa per sviluppare poteri psichici. Protegge dagli incubi.',
      practical: 'Potente antibiotico naturale, espettorante. Ottimo per sistema immunitario e respiratorio.',
      deity: 'Afrodite, Fauni',
      chakra: 'Gola, Terzo Occhio',
      harvest: 'Prima della fioritura, mattino',
      emoji: '🌿'
    },
    {
      id: 8,
      name: 'Rosa',
      latin: 'Rosa spp.',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Amore, bellezza, divinazione, guarigione, fortuna, protezione',
      magical: 'Petali in rituali d\'amore e bellezza. Usa in bagni per attirare amore. Rosa rossa per passione, bianca per purezza.',
      practical: 'Acqua di rose per pelle, astringente. Petali in infuso per benessere emotivo. Olio per massaggi sensuali.',
      deity: 'Afrodite, Venere, Iside',
      chakra: 'Cuore',
      harvest: 'Mattino presto, luna crescente',
      emoji: '🌹'
    },
    {
      id: 9,
      name: 'Alloro',
      latin: 'Laurus nobilis',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, successo, divinazione, purificazione, saggezza',
      magical: 'Brucia le foglie per visioni profetiche. Porta con te per successo. Protegge da negatività e malocchio.',
      practical: 'Digestivo, espettorante. Allevia dolori articolari. Usato in cucina per energia solare.',
      deity: 'Apollo, Dafne',
      chakra: 'Corona, Terzo Occhio',
      harvest: 'Tutto l\'anno, meglio in estate',
      emoji: '🍂'
    },
    {
      id: 10,
      name: 'Artemisia',
      latin: 'Artemisia vulgaris',
      element: 'Terra/Aria',
      planet: 'Luna',
      properties: 'Sogni, divinazione, protezione astrale, visioni, poteri psichici',
      magical: 'L\'erba dei sogni lucidi. Brucia per viaggi astrali. Metti sotto il cuscino per sogni profetici. Protegge durante meditazione.',
      practical: 'Regola ciclo mestruale, digestiva. Usare con cautela, può essere tossica in grandi dosi.',
      deity: 'Artemide, Diana, Ecate',
      chakra: 'Terzo Occhio, Corona',
      harvest: 'Luna piena, prima della fioritura',
      emoji: '🌙'
    },
    {
      id: 11,
      name: 'Verbena',
      latin: 'Verbena officinalis',
      element: 'Terra',
      planet: 'Venere',
      properties: 'Purificazione, amore, protezione, pace, prosperità, guarigione',
      magical: 'Erba sacra dei druidi. Usa in rituali d\'amore e protezione. Aspergi in casa per pace. Potente in tutti i rituali.',
      practical: 'Rilassante, aiuta ansia e insonnia. Anti-infiammatoria, buona per digestione.',
      deity: 'Cerridwen, Venere, Iside',
      chakra: 'Cuore, Corona',
      harvest: 'Estate, alba o tramonto',
      emoji: '💐'
    },
    {
      id: 12,
      name: 'Ortica',
      latin: 'Urtica dioica',
      element: 'Fuoco',
      planet: 'Marte',
      properties: 'Protezione, esorcismo, rottura maledizioni, coraggio',
      magical: 'Potente per protezione e rottura fatture. Brucia per esorcismi. Spargi intorno alla casa per proteggere.',
      practical: 'Ricchissima di minerali e vitamine. Depurativa, tonica. Ottima per capelli e anemia.',
      deity: 'Thor, Marte',
      chakra: 'Radice, Plesso Solare',
      harvest: 'Primavera, con guanti!',
      emoji: '🔥'
    },
    {
      id: 13,
      name: 'Iperico',
      latin: 'Hypericum perforatum',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, guarigione, divinazione, forza, felicità',
      magical: 'L\'erba di San Giovanni. Brucia per scacciare demoni. Raccogli a Midsummer per massima potenza. Protegge da negatività.',
      practical: 'Antidepressivo naturale, guarisce ferite. Olio per scottature. Usare con cautela, fotosensibilizzante.',
      deity: 'Baldur, Apollo, San Giovanni',
      chakra: 'Plesso Solare, Corona',
      harvest: 'Solstizio d\'estate, mezzogiorno',
      emoji: '☀️'
    },
    {
      id: 14,
      name: 'Calendula',
      latin: 'Calendula officinalis',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, sogni profetici, guarigione, successo legale',
      magical: 'Metti sotto il letto per sogni profetici. Usa in rituali di protezione. Ottima per incantesimi solari.',
      practical: 'Eccellente per pelle, cicatrizzante. Anti-infiammatoria. Ottima in creme e oli curativi.',
      deity: 'Maria Vergine, divinità solari',
      chakra: 'Plesso Solare',
      harvest: 'Estate, fiori completamente aperti',
      emoji: '🌻'
    },
    {
      id: 15,
      name: 'Melissa',
      latin: 'Melissa officinalis',
      element: 'Acqua',
      planet: 'Luna',
      properties: 'Amore, guarigione, successo, purificazione',
      magical: 'Attira amore e amicizia. Usa in incantesimi di successo. Purifica altari e strumenti rituali.',
      practical: 'Calmante per ansia e stress. Antivirale, aiuta digestione. Ottima per il cuore emotivo e fisico.',
      deity: 'Diana, Artemide',
      chakra: 'Cuore, Corona',
      harvest: 'Prima della fioritura, mattino',
      emoji: '🍋'
    },
    {
      id: 16,
      name: 'Valeriana',
      latin: 'Valeriana officinalis',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Amore, sonno, purificazione, protezione, pace',
      magical: 'Usa in sacchetti per sonno profondo. Protegge dalle energie negative. Purifica ambienti carichi. Attira amore duraturo.',
      practical: 'Potente sedativo naturale, aiuta insonnia e ansia. Rilassa muscoli. Radice più potente delle foglie.',
      deity: 'Afrodite, divinità del sonno',
      chakra: 'Radice, Corona',
      harvest: 'Autunno, radici dopo 2 anni',
      emoji: '😴'
    },
    {
      id: 17,
      name: 'Achillea',
      latin: 'Achillea millefolium',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Coraggio, divinazione, amore, guarigione, protezione psichica',
      magical: 'Usata in I-Ching per divinazione. Porta coraggio in battaglia. Protegge in viaggi astrali. Lega amicizie.',
      practical: 'Cicatrizzante eccellente, ferma emorragie. Anti-infiammatoria. Buona per circolazione e febbre.',
      deity: 'Achille, Venere',
      chakra: 'Terzo Occhio, Cuore',
      harvest: 'Estate, fiori in piena fioritura',
      emoji: '⚔️'
    },
    {
      id: 18,
      name: 'Cannella',
      latin: 'Cinnamomum verum',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Successo, prosperità, protezione, amore, guarigione, poteri psichici',
      magical: 'Brucia per prosperità rapida. Aggiungi a incantesimi per accelerare risultati. Potente in magia sessuale.',
      practical: 'Regola glicemia, antiossidante. Stimola circolazione. Antibatterica. Ottima per digestione e energia.',
      deity: 'Afrodite, Venere',
      chakra: 'Radice, Sacrale',
      harvest: 'Corteccia raccolta tutto l\'anno',
      emoji: '🪵'
    },
    {
      id: 19,
      name: 'Ginepro',
      latin: 'Juniperus communis',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, esorcismo, salute, amore, anti-furto',
      magical: 'Brucia per protezione potente e purificazione. Appendi per proteggere la casa dai furti. Scaccia spiriti malevoli.',
      practical: 'Diuretico, depurativo. Bacche per digestione. Olio per dolori articolari. Non in gravidanza.',
      deity: 'Artemide, divinità della caccia',
      chakra: 'Radice, Plesso Solare',
      harvest: 'Autunno, bacche mature',
      emoji: '🫐'
    },
    {
      id: 20,
      name: 'Finocchio',
      latin: 'Foeniculum vulgare',
      element: 'Fuoco',
      planet: 'Mercurio',
      properties: 'Protezione, guarigione, purificazione, longevità',
      magical: 'Appendi sulla porta per protezione. Usa in rituali di longevità. Purifica chakra. Semi in sacchetti protettivi.',
      practical: 'Eccellente per digestione e gonfiore. Aumenta latte materno. Antiossidante. Buono per vista.',
      deity: 'Dioniso, Prometeo',
      chakra: 'Plesso Solare, Gola',
      harvest: 'Semi in autunno, foglie estate',
      emoji: '🌾'
    },
    {
      id: 21,
      name: 'Prezzemolo',
      latin: 'Petroselinum crispum',
      element: 'Aria',
      planet: 'Mercurio',
      properties: 'Purificazione, protezione, lussuria, comunicazione con i morti',
      magical: 'Usa in bagni rituali purificanti. Protegge dalle influenze negative. Tradizionalmente collegato alla morte.',
      practical: 'Ricco di vitamine, depurativo. Diuretico. Rinfresca alito. Buono per reni. Non in gravidanza (dosi alte).',
      deity: 'Persefone, Ecate',
      chakra: 'Radice, Cuore',
      harvest: 'Prima della fioritura',
      emoji: '🌿'
    },
    {
      id: 22,
      name: 'Edera',
      latin: 'Hedera helix',
      element: 'Acqua',
      planet: 'Saturno',
      properties: 'Protezione, guarigione, fedeltà, legami, matrimonio',
      magical: 'Lega relazioni e amicizie. Usa in rituali matrimoniali. Protegge la casa. Collega alla terra e alle radici.',
      practical: 'Solo uso esterno! Tossica se ingerita. Cataplasmi per cellulite. Tradizionalmente per tosse (con cautela).',
      deity: 'Dioniso, Osiride',
      chakra: 'Radice, Cuore',
      harvest: 'Foglie tutto l\'anno',
      emoji: '🌿'
    },
    {
      id: 23,
      name: 'Vischio',
      latin: 'Viscum album',
      element: 'Aria',
      planet: 'Sole',
      properties: 'Protezione, amore, fertilità, salute, esorcismo, caccia',
      magical: 'Sacro ai druidi. Raccogli a Yule per massima potenza. Protezione suprema. Porta fertilità. Bacia sotto il vischio.',
      practical: 'Solo con supervisione esperta! Può essere tossico. Tradizionalmente per pressione e cuore. Non auto-somministrare.',
      deity: 'Odino, divinità celtiche',
      chakra: 'Corona, Cuore',
      harvest: 'Solstizio d\'inverno',
      emoji: '🎄'
    },
    {
      id: 24,
      name: 'Malva',
      latin: 'Malva sylvestris',
      element: 'Acqua',
      planet: 'Luna',
      properties: 'Amore, protezione, esorcismo, purificazione',
      magical: 'Protegge dagli spiriti. Usa in incantesimi d\'amore dolce. Purifica e calma situazioni tese. Contatta spiriti benevoli.',
      practical: 'Emolliente eccellente, lenisce mucose. Ottima per tosse e gola. Anti-infiammatoria. Buona per pelle.',
      deity: 'divinità lunari',
      chakra: 'Gola, Cuore',
      harvest: 'Fiori in estate, foglie primavera',
      emoji: '💜'
    },
    {
      id: 25,
      name: 'Angelica',
      latin: 'Angelica archangelica',
      element: 'Fuoco',
      planet: 'Sole',
      properties: 'Protezione, esorcismo, guarigione, visioni, benedizioni',
      magical: 'Protezione angelica potente. Scaccia negatività. Usa in rituali di guarigione. Radice protegge bambini. Aiuta visioni.',
      practical: 'Digestiva, espettorante. Radice tonica. Aiuta stress e ansia. Attenzione: fotosensibilizzante.',
      deity: 'Arcangelo Michele, angeli',
      chakra: 'Corona, Plesso Solare',
      harvest: 'Radice secondo anno, autunno',
      emoji: '👼'
    },
    {
      id: 26,
      name: 'Assenzio',
      latin: 'Artemisia absinthium',
      element: 'Fuoco/Aria',
      planet: 'Marte',
      properties: 'Protezione psichica, amore, spiriti, poteri psichici, esorcismo',
      magical: 'Potenzia abilità psichiche. Protegge in viaggi astrali. Evoca spiriti. Brucia per visioni (con cautela). Molto potente.',
      practical: 'Solo uso esperto! Tossico in dosi alte. Digestivo amaro. Vermifugo tradizionale. Il tujone è pericoloso.',
      deity: 'Artemide, Diana',
      chakra: 'Terzo Occhio, Corona',
      harvest: 'Prima della fioritura, con rispetto',
      emoji: '🌿'
    },
    {
      id: 27,
      name: 'Zenzero',
      latin: 'Zingiber officinale',
      element: 'Fuoco',
      planet: 'Marte',
      properties: 'Successo, potere, denaro, amore, coraggio, energia',
      magical: 'Accelera tutti gli incantesimi. Porta successo rapido. Aumenta energia magica. Potente in magia sessuale.',
      practical: 'Anti-nausea eccellente, digestivo. Anti-infiammatorio. Stimola circolazione. Aiuta raffreddore.',
      deity: 'Kali, divinità guerriere',
      chakra: 'Radice, Sacrale, Plesso Solare',
      harvest: 'Radice dopo 10 mesi',
      emoji: '🫚'
    },
    {
      id: 28,
      name: 'Aglio',
      latin: 'Allium sativum',
      element: 'Fuoco',
      planet: 'Marte',
      properties: 'Protezione potente, esorcismo, salute, anti-furto, coraggio',
      magical: 'Protezione suprema da negatività e vampiri energetici. Appendi in casa. Usa in esorcismi. Assorbe malattie.',
      practical: 'Antibiotico naturale potente. Abbassa pressione e colesterolo. Antiossidante. Rinforza sistema immunitario.',
      deity: 'Ecate, Marte',
      chakra: 'Radice',
      harvest: 'Estate, quando foglie seccano',
      emoji: '🧄'
    },
    {
      id: 29,
      name: 'Sambuco',
      latin: 'Sambucus nigra',
      element: 'Acqua',
      planet: 'Venere',
      properties: 'Protezione, esorcismo, prosperità, guarigione, benedizioni, fate',
      magical: 'Albero sacro. Protegge casa e famiglia. Non bruciare legno (porta sfortuna). Connessione con fate. Guarigione potente.',
      practical: 'Bacche (cotte!) per sistema immunitario. Fiori per febbre e influenza. Mai consumare crudo - tossico.',
      deity: 'Holda, Freya, Regina delle Fate',
      chakra: 'Cuore, Corona',
      harvest: 'Fiori primavera, bacche autunno',
      emoji: '🖤'
    },
    {
      id: 30,
      name: 'Tarassaco',
      latin: 'Taraxacum officinale',
      element: 'Aria',
      planet: 'Giove',
      properties: 'Divinazione, desideri, spiriti, purificazione, prosperità',
      magical: 'Soffia semi per mandare desideri. Radice per evocare spiriti. Ottimo per divinazione. Porta prosperità crescente.',
      practical: 'Depurativo eccellente per fegato. Diuretico. Ricco di vitamine. Radice tosta per caffè. Foglie in insalata.',
      deity: 'Ecate, Brigid',
      chakra: 'Plesso Solare, Corona',
      harvest: 'Radice autunno, foglie primavera',
      emoji: '🌼'
    }
  ];

  const getFilteredHerbs = () => {
    if (!herbSearch) return herbsDatabase;
    return herbsDatabase.filter(herb => 
      herb.name.toLowerCase().includes(herbSearch.toLowerCase()) ||
      herb.properties.toLowerCase().includes(herbSearch.toLowerCase())
    );
  };

  const getFilteredCrystals = () => {
    if (!crystalSearch) return crystalsDatabase;
    return crystalsDatabase.filter(crystal => 
      crystal.name.toLowerCase().includes(crystalSearch.toLowerCase()) ||
      crystal.properties.toLowerCase().includes(crystalSearch.toLowerCase()) ||
      crystal.chakra.toLowerCase().includes(crystalSearch.toLowerCase())
    );
  };

  // Database Segni Zodiacali
  const zodiacSigns = [
    { 
      id: 'aries', name: 'Ariete', symbol: '♈', dates: '21 Mar - 19 Apr', 
      element: 'Fuoco', quality: 'Cardinale', ruler: 'Marte',
      traits: 'Coraggioso, dinamico, impulsivo, leader nato'
    },
    { 
      id: 'taurus', name: 'Toro', symbol: '♉', dates: '20 Apr - 20 Mag', 
      element: 'Terra', quality: 'Fisso', ruler: 'Venere',
      traits: 'Paziente, affidabile, pratico, amante del comfort'
    },
    { 
      id: 'gemini', name: 'Gemelli', symbol: '♊', dates: '21 Mag - 20 Giu', 
      element: 'Aria', quality: 'Mutevole', ruler: 'Mercurio',
      traits: 'Versatile, curioso, comunicativo, adattabile'
    },
    { 
      id: 'cancer', name: 'Cancro', symbol: '♋', dates: '21 Giu - 22 Lug', 
      element: 'Acqua', quality: 'Cardinale', ruler: 'Luna',
      traits: 'Emotivo, protettivo, intuitivo, casalingo'
    },
    { 
      id: 'leo', name: 'Leone', symbol: '♌', dates: '23 Lug - 22 Ago', 
      element: 'Fuoco', quality: 'Fisso', ruler: 'Sole',
      traits: 'Generoso, caloroso, creativo, regale'
    },
    { 
      id: 'virgo', name: 'Vergine', symbol: '♍', dates: '23 Ago - 22 Set', 
      element: 'Terra', quality: 'Mutevole', ruler: 'Mercurio',
      traits: 'Analitico, perfezionista, pratico, servizievole'
    },
    { 
      id: 'libra', name: 'Bilancia', symbol: '♎', dates: '23 Set - 22 Ott', 
      element: 'Aria', quality: 'Cardinale', ruler: 'Venere',
      traits: 'Equilibrato, diplomatico, sociale, giusto'
    },
    { 
      id: 'scorpio', name: 'Scorpione', symbol: '♏', dates: '23 Ott - 21 Nov', 
      element: 'Acqua', quality: 'Fisso', ruler: 'Plutone/Marte',
      traits: 'Intenso, trasformativo, passionale, magnetico'
    },
    { 
      id: 'sagittarius', name: 'Sagittario', symbol: '♐', dates: '22 Nov - 21 Dic', 
      element: 'Fuoco', quality: 'Mutevole', ruler: 'Giove',
      traits: 'Ottimista, avventuroso, filosofico, libero'
    },
    { 
      id: 'capricorn', name: 'Capricorno', symbol: '♑', dates: '22 Dic - 19 Gen', 
      element: 'Terra', quality: 'Cardinale', ruler: 'Saturno',
      traits: 'Ambizioso, disciplinato, responsabile, pratico'
    },
    { 
      id: 'aquarius', name: 'Acquario', symbol: '♒', dates: '20 Gen - 18 Feb', 
      element: 'Aria', quality: 'Fisso', ruler: 'Urano/Saturno',
      traits: 'Innovativo, indipendente, umanitario, eccentrico'
    },
    { 
      id: 'pisces', name: 'Pesci', symbol: '♓', dates: '19 Feb - 20 Mar', 
      element: 'Acqua', quality: 'Mutevole', ruler: 'Nettuno/Giove',
      traits: 'Compassionevole, artistico, intuitivo, sognatore'
    }
  ];

  const getHoroscope = (signId) => {
    const horoscopes = {
      aries: {
        general: 'Oggi l\'energia marziale ti spinge all\'azione. È il momento perfetto per iniziare nuovi progetti e prendere l\'iniziativa. Non esitare.',
        love: 'Passione e intensità caratterizzano la giornata. Se sei single, potresti fare un incontro interessante.',
        work: 'La tua leadership naturale emerge. È un ottimo momento per proporre idee innovative.',
        health: 'Energia fisica elevata. Ottima giornata per attività sportive.',
        lucky: '🍀 Numero fortunato: 9 • Colore: Rosso'
      },
      taurus: {
        general: 'La stabilità è dalla tua parte oggi. Concentrati su ciò che ti dà sicurezza e comfort. Prenditi cura di te.',
        love: 'Romanticismo e dolcezza. È il momento perfetto per coccolare chi ami.',
        work: 'La tua determinazione porta frutti concreti. Persevera nei tuoi obiettivi.',
        health: 'Ascolta il tuo corpo. Potrebbe essere il momento di rallentare.',
        lucky: '🍀 Numero fortunato: 6 • Colore: Verde'
      },
      gemini: {
        general: 'La comunicazione è favorita oggi. Le tue parole hanno potere. Sfrutta la tua versatilità mentale.',
        love: 'Dialogo e condivisione intellettuale rafforzano i legami. Comunica apertamente.',
        work: 'Multitasking al massimo. Eccelli nel gestire più progetti contemporaneamente.',
        health: 'Mente attiva, ricorda di fare pause mentali.',
        lucky: '🍀 Numero fortunato: 5 • Colore: Giallo'
      },
      cancer: {
        general: 'Le emozioni sono intense oggi. Segui la tua intuizione, non ti ingannerà. Trova rifugio nel tuo nido.',
        love: 'Profondità emotiva e connessione. È un ottimo momento per aprire il cuore.',
        work: 'La tua empatia è una risorsa preziosa. Usa la tua sensibilità nel team.',
        health: 'Cura il tuo benessere emotivo. L\'acqua e la natura ti rigenerano.',
        lucky: '🍀 Numero fortunato: 2 • Colore: Argento'
      },
      leo: {
        general: 'Brilli di luce propria oggi. La tua generosità e creatività sono al massimo. Lascia che il mondo ti veda.',
        love: 'Passione e calore caratterizzano i rapporti. Esprimi il tuo affetto con grandezza.',
        work: 'La tua presenza ispira gli altri. Ottimo momento per presentazioni e leadership.',
        health: 'Energia solare al massimo. Goditi attività all\'aperto.',
        lucky: '🍀 Numero fortunato: 1 • Colore: Oro'
      },
      virgo: {
        general: 'Precisione e attenzione ai dettagli ti premiano oggi. Organizza e perfeziona. La tua analisi è impeccabile.',
        love: 'Mostra amore attraverso gesti pratici. Piccole attenzioni fanno la differenza.',
        work: 'Eccellenza nel lavoro di dettaglio. La tua competenza è riconosciuta.',
        health: 'Routine salutari ti sostengono. Mantieni le tue buone abitudini.',
        lucky: '🍀 Numero fortunato: 5 • Colore: Blu navy'
      },
      libra: {
        general: 'Equilibrio e armonia sono le tue parole chiave oggi. Cerca la bellezza e la giustizia in ogni situazione.',
        love: 'Romanticismo raffinato. È il momento perfetto per appuntamenti eleganti.',
        work: 'La diplomazia è la tua arma vincente. Mediazioni e collaborazioni favorevoli.',
        health: 'Cerca equilibrio tra attività e riposo. L\'armonia interiore è essenziale.',
        lucky: '🍀 Numero fortunato: 6 • Colore: Rosa'
      },
      scorpio: {
        general: 'Intensità e trasformazione caratterizzano la giornata. Vai in profondità. Il tuo potere personale è forte.',
        love: 'Passione magnetica. Le connessioni profonde si intensificano.',
        work: 'Eccelli nelle ricerche approfondite. Il tuo intuito strategico è acuto.',
        health: 'Trasformazione fisica e mentale. Ottimo momento per eliminare tossine.',
        lucky: '🍀 Numero fortunato: 8 • Colore: Bordeaux'
      },
      sagittarius: {
        general: 'Espansione e avventura ti chiamano. Segui il tuo spirito filosofico. La fortuna sorride agli audaci.',
        love: 'Libertà e spontaneità nella relazione. Condividi avventure con chi ami.',
        work: 'Visione a lungo termine favorita. Ottimo momento per pianificare espansioni.',
        health: 'Movimento e attività all\'aperto ti rigenerano. Viaggia se possibile.',
        lucky: '🍀 Numero fortunato: 3 • Colore: Viola'
      },
      capricorn: {
        general: 'Disciplina e ambizione sono premiate oggi. I tuoi sforzi costruiscono fondamenta solide per il futuro.',
        love: 'Impegno e serietà caratterizzano i rapporti. Mostra la tua affidabilità.',
        work: 'Eccellente giornata per progressi concreti. La tua determinazione porta successo.',
        health: 'Struttura e routine mantengono il benessere. Sii disciplinato.',
        lucky: '🍀 Numero fortunato: 8 • Colore: Grigio'
      },
      aquarius: {
        general: 'Innovazione e originalità ti distinguono oggi. Il futuro è adesso. Abbraccia il tuo lato unico.',
        love: 'Libertà e amicizia nelle relazioni. Connessioni intellettuali stimolanti.',
        work: 'Idee rivoluzionarie portano breakthrough. Il tuo approccio non convenzionale vince.',
        health: 'Tecnologia e metodi alternativi favorevoli per il benessere.',
        lucky: '🍀 Numero fortunato: 4 • Colore: Turchese'
      },
      pisces: {
        general: 'Intuizione e compassione guidano la tua giornata. Connettiti con il divino dentro di te. Sogna grande.',
        love: 'Romanticismo spirituale. Le connessioni dell\'anima si rafforzano.',
        work: 'Creatività e ispirazione al massimo. Lascia fluire l\'immaginazione.',
        health: 'Meditazione e acqua ti rigenerano. Ascolta i messaggi del subconscio.',
        lucky: '🍀 Numero fortunato: 7 • Colore: Acquamarina'
      }
    };
    return horoscopes[signId];
  };

  const calculateBirthChart = () => {
    if (!birthData.date || !birthData.time) {
      alert('Inserisci almeno data e ora di nascita');
      return;
    }

    const birthDate = new Date(birthData.date + 'T' + birthData.time);
    const sunSign = getZodiacSign(birthDate);
    
    // Calcolo semplificato dell'Ascendente basato sull'ora
    const hour = parseInt(birthData.time.split(':')[0]);
    const ascendants = [
      'Ariete', 'Toro', 'Gemelli', 'Cancro', 'Leone', 'Vergine',
      'Bilancia', 'Scorpione', 'Sagittario', 'Capricorno', 'Acquario', 'Pesci'
    ];
    const ascIndex = Math.floor((hour * 2) % 12);
    const ascendant = ascendants[ascIndex];

    // Luna basata sul giorno del mese (semplificato)
    const day = birthDate.getDate();
    const moonIndex = Math.floor((day * 0.4) % 12);
    const moonSign = ascendants[moonIndex];

    setBirthChart({
      sun: sunSign.sign,
      ascendant: ascendant,
      moon: moonSign,
      date: birthDate.toLocaleDateString('it-IT'),
      time: birthData.time,
      place: birthData.place || 'Non specificato'
    });
  };

  // Database Rune - Futhark Antico
  const runeDeck = [
    { 
      id: 1, name: 'Fehu', symbol: 'ᚠ', 
      upright: 'Ricchezza materiale e spirituale, prosperità in arrivo, abbondanza, nuovi inizi finanziari, energia mobile e creativa. Successo negli affari.',
      reversed: 'Perdite finanziarie, spreco di risorse, avidità, povertà temporanea, blocco energetico. Attenzione alle spese.',
      element: 'Fuoco', aett: 'Freya',
      keywords: 'Bestiame, Ricchezza',
      correspondence: '🐄 Bestiame • 💰 Oro • 🔥 Fuoco creativo',
      deity: 'Freya, Freyr'
    },
    { 
      id: 2, name: 'Uruz', symbol: 'ᚢ', 
      upright: 'Forza fisica e mentale, vitalità robusta, salute vigorosa, potere primordiale, resistenza. Momento di grande energia.',
      reversed: 'Debolezza, malattia, perdita di energia, forza mal diretta, brutalità, mancanza di controllo.',
      element: 'Terra', aett: 'Freya',
      keywords: 'Uro, Forza',
      correspondence: '🐂 Uro • 💪 Forza • 🌱 Vitalità',
      deity: 'Thor'
    },
    { 
      id: 3, name: 'Thurisaz', symbol: 'ᚦ', 
      upright: 'Protezione potente, decisione importante, porta tra i mondi, conflitto costruttivo, difesa attiva. Il martello di Thor.',
      reversed: 'Aggressione cieca, decisione affrettata, conflitto distruttivo, mancanza di protezione, vulnerabilità.',
      element: 'Fuoco', aett: 'Freya',
      keywords: 'Gigante, Spina',
      correspondence: '🔨 Martello • ⚡ Fulmine • 🛡️ Protezione',
      deity: 'Thor'
    },
    { 
      id: 4, name: 'Ansuz', symbol: 'ᚨ', 
      upright: 'Comunicazione divina, saggezza ancestrale, messaggi importanti, ispirazione poetica, guida spirituale. Parola degli dèi.',
      reversed: 'Malintesi, comunicazione bloccata, consigli errati, mancanza di saggezza, manipolazione verbale.',
      element: 'Aria', aett: 'Freya',
      keywords: 'Dio, Bocca',
      correspondence: '📜 Poesia • 🗣️ Parola • 🎭 Arte',
      deity: 'Odino'
    },
    { 
      id: 5, name: 'Raidho', symbol: 'ᚱ', 
      upright: 'Viaggio benefico, movimento in avanti, ritmo naturale, progresso ordinato, ruota della vita in movimento.',
      reversed: 'Viaggio ritardato, stasi, interruzione del percorso, crisi durante il viaggio, mancanza di direzione.',
      element: 'Aria', aett: 'Freya',
      keywords: 'Cavalcare, Viaggio',
      correspondence: '🐴 Cavallo • 🛣️ Strada • ⚙️ Ruota',
      deity: 'Ing'
    },
    { 
      id: 6, name: 'Kenaz', symbol: 'ᚲ', 
      upright: 'Illuminazione interiore, conoscenza acquisita, creatività accesa, fuoco controllato, arte e artigianato. La torcia nella notte.',
      reversed: 'Ignoranza, perdita di creatività, spegnimento del fuoco interiore, oscurità, blocco artistico.',
      element: 'Fuoco', aett: 'Freya',
      keywords: 'Torcia, Conoscenza',
      correspondence: '🔦 Torcia • 🎨 Creatività • 📚 Sapere',
      deity: 'Heimdall'
    },
    { 
      id: 7, name: 'Gebo', symbol: 'ᚷ', 
      upright: 'Dono divino, partnership equilibrata, scambio reciproco, generosità, unione sacra. Dare e ricevere in armonia.',
      reversed: 'Non si capovolge - ma può indicare squilibrio nello scambio, debito, obbligo, dipendenza',
      element: 'Aria', aett: 'Freya',
      keywords: 'Dono, Scambio',
      correspondence: '🎁 Regalo • ⚖️ Equilibrio • 💑 Unione',
      deity: 'Freya, Freyr'
    },
    { 
      id: 8, name: 'Wunjo', symbol: 'ᚹ', 
      upright: 'Gioia pura, felicità meritata, armonia perfetta, successo celebrato, benessere completo. Il vessillo della vittoria.',
      reversed: 'Tristezza, disarmonia, gioia ritardata, crisi, depressione, infelicità nel successo.',
      element: 'Terra', aett: 'Freya',
      keywords: 'Gioia, Perfezione',
      correspondence: '🎊 Celebrazione • 🏆 Vittoria • 😊 Felicità',
      deity: 'Odino'
    },
    { 
      id: 9, name: 'Hagalaz', symbol: 'ᚺ', 
      upright: 'Distruzione necessaria, cambiamento drastico, forze naturali incontrollabili, rottura di schemi, grandine purificatrice.',
      reversed: 'Non si capovolge - energia sempre dirompente ma può indicare resistenza al cambiamento',
      element: 'Acqua/Ghiaccio', aett: 'Heimdall',
      keywords: 'Grandine, Distruzione',
      correspondence: '🌨️ Grandine • ⚡ Tempesta • 💥 Rottura',
      deity: 'Norni'
    },
    { 
      id: 10, name: 'Nauthiz', symbol: 'ᚾ', 
      upright: 'Necessità che insegna, resistenza costruttiva, bisogno che forgia, lezione karmica, pazienza obbligata. Il fuoco della necessità.',
      reversed: 'Privazione estrema, bisogno opprimente, impazienza, rifiuto della lezione, autodistruzione.',
      element: 'Fuoco', aett: 'Heimdall',
      keywords: 'Bisogno, Necessità',
      correspondence: '🔥 Fuoco del bisogno • ⛓️ Necessità • 📖 Lezione',
      deity: 'Norni, Skuld'
    },
    { 
      id: 11, name: 'Isa', symbol: 'ᛁ', 
      upright: 'Stasi utile, ghiaccio che preserva, pausa necessaria, concentrazione cristallina, blocco temporaneo per riflettere.',
      reversed: 'Non si capovolge - ma può indicare blocco prolungato, freddo emotivo, isolamento',
      element: 'Ghiaccio', aett: 'Heimdall',
      keywords: 'Ghiaccio, Stasi',
      correspondence: '🧊 Ghiaccio • ❄️ Cristallo • 🛑 Pausa',
      deity: 'Norni'
    },
    { 
      id: 12, name: 'Jera', symbol: 'ᛃ', 
      upright: 'Raccolto abbondante, ciclo completato, ricompensa meritata, tempo giusto, pazienza premiata. L\'anno della fertilità.',
      reversed: 'Non si capovolge - ma può indicare raccolto scarso, cattivo tempismo, ciclo interrotto',
      element: 'Terra', aett: 'Heimdall',
      keywords: 'Anno, Raccolto',
      correspondence: '🌾 Raccolto • 🔄 Ciclo • ⏰ Tempo giusto',
      deity: 'Freyr'
    },
    { 
      id: 13, name: 'Eihwaz', symbol: 'ᛇ', 
      upright: 'Difesa spirituale, protezione duratura, resistenza dell\'albero sacro, connessione tra i mondi, asse cosmico.',
      reversed: 'Non si capovolge - ma può indicare vulnerabilità, disconnessione spirituale',
      element: 'Terra', aett: 'Heimdall',
      keywords: 'Tasso, Difesa',
      correspondence: '🌲 Tasso • 🌳 Yggdrasil • 🛡️ Scudo',
      deity: 'Odino, Ullr'
    },
    { 
      id: 14, name: 'Perthro', symbol: 'ᛈ', 
      upright: 'Mistero rivelato, segreto del destino, sorpresa positiva, ciò che è nascosto, magia, divinazione. Il bicchiere dei dadi.',
      reversed: 'Segreto dannoso, mistero opprimente, sorpresa negativa, dipendenza dal caso, illusione.',
      element: 'Acqua', aett: 'Heimdall',
      keywords: 'Mistero, Destino',
      correspondence: '🎲 Dadi • 🔮 Divinazione • 🗝️ Segreto',
      deity: 'Norni, Frigg'
    },
    { 
      id: 15, name: 'Algiz', symbol: 'ᛉ', 
      upright: 'Protezione divina, scudo spirituale, connessione con gli dèi, difesa sacra, mano alzata verso il cielo. L\'alce sacro.',
      reversed: 'Vulnerabilità, protezione rimossa, disconnessione spirituale, pericolo, mancanza di guida.',
      element: 'Aria', aett: 'Heimdall',
      keywords: 'Alce, Protezione',
      correspondence: '🦌 Alce • 🙏 Preghiera • ✋ Mano protettiva',
      deity: 'Heimdall'
    },
    { 
      id: 16, name: 'Sowilo', symbol: 'ᛋ', 
      upright: 'Sole vittorioso, successo totale, energia vitale al massimo, chiarezza completa, guarigione. La ruota del sole.',
      reversed: 'Non si capovolge - energia sempre positiva ma può indicare eccesso, bruciatura',
      element: 'Fuoco/Sole', aett: 'Heimdall',
      keywords: 'Sole, Vittoria',
      correspondence: '☀️ Sole • ⚡ Fulmine • 🏆 Successo',
      deity: 'Sunna, Baldur'
    },
    { 
      id: 17, name: 'Tiwaz', symbol: 'ᛏ', 
      upright: 'Vittoria onorevole, giustizia divina, leadership giusta, sacrificio nobile, coraggio del guerriero. La lancia di Tyr.',
      reversed: 'Sconfitta, ingiustizia, leadership fallita, sacrificio vano, codardia, perdita di energia maschile.',
      element: 'Aria', aett: 'Tyr',
      keywords: 'Tyr, Vittoria',
      correspondence: '⚔️ Spada • ⚖️ Giustizia • 🎖️ Onore',
      deity: 'Tyr'
    },
    { 
      id: 18, name: 'Berkano', symbol: 'ᛒ', 
      upright: 'Crescita naturale, femminilità sacra, nutrimento materno, rinascita primaverile, fertilità. La betulla della dea.',
      reversed: 'Sterilità, mancanza di crescita, soffocamento, madre assente, blocco femminile.',
      element: 'Terra', aett: 'Tyr',
      keywords: 'Betulla, Crescita',
      correspondence: '🌳 Betulla • 👶 Nascita • 🌸 Primavera',
      deity: 'Frigg, Nerthus'
    },
    { 
      id: 19, name: 'Ehwaz', symbol: 'ᛖ', 
      upright: 'Movimento armonioso, progresso condiviso, partnership leale, cavallo e cavaliere in sintonia, fiducia reciproca.',
      reversed: 'Movimento bloccato, partnership rotta, sfiducia, cavallo imbizzarrito, progresso ostacolato.',
      element: 'Terra', aett: 'Tyr',
      keywords: 'Cavallo, Movimento',
      correspondence: '🐎 Cavallo • 🤝 Partnership • 🛣️ Viaggio',
      deity: 'Freyr'
    },
    { 
      id: 20, name: 'Mannaz', symbol: 'ᛗ', 
      upright: 'Umanità evoluta, sé superiore, intelligenza collettiva, collaborazione sociale, mente illuminata. L\'umano divino.',
      reversed: 'Isolamento sociale, egoismo, stupidità, alienazione, negazione dell\'umanità.',
      element: 'Aria', aett: 'Tyr',
      keywords: 'Uomo, Umanità',
      correspondence: '👤 Sé • 🧠 Mente • 👥 Società',
      deity: 'Heimdall, Ask e Embla'
    },
    { 
      id: 21, name: 'Laguz', symbol: 'ᛚ', 
      upright: 'Acqua fluente, intuizione profonda, emozioni sane, flusso naturale, adattabilità, psiche. L\'oceano della vita.',
      reversed: 'Emozioni bloccate, intuizione confusa, annegamento emotivo, resistenza al flusso, paura dell\'acqua.',
      element: 'Acqua', aett: 'Tyr',
      keywords: 'Acqua, Flusso',
      correspondence: '💧 Acqua • 🌊 Oceano • 🔮 Intuizione',
      deity: 'Njord'
    },
    { 
      id: 22, name: 'Ingwaz', symbol: 'ᛜ', 
      upright: 'Fertilità maschile, gestazione interiore, potenziale in sviluppo, seme divino, nuovi inizi profondi. Il dio della fertilità.',
      reversed: 'Non si capovolge - ma può indicare impotenza, sterilità, potenziale sprecato',
      element: 'Terra', aett: 'Tyr',
      keywords: 'Ing, Fertilità',
      correspondence: '🌱 Seme • 🤰 Gestazione • 🌟 Potenziale',
      deity: 'Ing/Freyr'
    },
    { 
      id: 23, name: 'Dagaz', symbol: 'ᛞ', 
      upright: 'Alba trasformante, risveglio spirituale, chiarezza improvvisa, svolta importante, giorno dopo la notte. Illuminazione.',
      reversed: 'Non si capovolge - energia sempre trasformante ma può indicare falsa alba, illusione',
      element: 'Fuoco/Aria', aett: 'Tyr',
      keywords: 'Giorno, Alba',
      correspondence: '🌅 Alba • ⚡ Illuminazione • 🔄 Trasformazione',
      deity: 'Heimdall'
    },
    { 
      id: 24, name: 'Othala', symbol: 'ᛟ', 
      upright: 'Eredità ancestrale, casa spirituale, proprietà sacra, tradizione familiare, radici profonde. Il santuario degli antenati.',
      reversed: 'Perdita di eredità, senza casa, rottura con la tradizione, radici recise, conservatorismo eccessivo.',
      element: 'Terra', aett: 'Tyr',
      keywords: 'Eredità, Casa',
      correspondence: '🏡 Casa • 👨‍👩‍👧‍👦 Famiglia • 🗿 Antenati',
      deity: 'Odino'
    },
    { 
      id: 25, name: 'Wyrd', symbol: '⚬', 
      upright: 'Destino in atto, il vuoto creativo, l\'ignoto totale, karma cosmico, la tessitura delle Norne. Tutto e niente.',
      reversed: 'Non si capovolge - rappresenta sempre il mistero supremo e il destino inevitabile',
      element: 'Spirito/Vuoto', aett: 'Norni',
      keywords: 'Destino, Vuoto',
      correspondence: '⚫ Vuoto • 🕸️ Tessitura • ♾️ Destino',
      deity: 'Le Norne (Urd, Verdandi, Skuld)'
    }
  ];

  const runeSpreads = [
    { id: 'single', name: 'Runa Singola', desc: 'Una runa per guidarti oggi', runes: 1 },
    { id: 'three', name: 'Tre Rune', desc: 'Situazione, Azione, Risultato', runes: 3 },
    { id: 'cross', name: 'Croce Runica', desc: 'Lettura approfondita con 5 rune', runes: 5 }
  ];

  const drawRunes = (spread) => {
    setIsDrawing(true);
    setSelectedRuneSpread(spread);
    
    setTimeout(() => {
      const shuffled = [...runeDeck].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, spread.runes).map(rune => ({
        ...rune,
        reversed: Math.random() > 0.6
      }));
      
      setDrawnRunes(drawn);
      setIsDrawing(false);
    }, 1500);
  };

  const getRuneSpreadPositions = (spreadId) => {
    if (spreadId === 'single') return ['La tua guida'];
    if (spreadId === 'three') return ['Situazione Attuale', 'Azione da Compiere', 'Risultato Probabile'];
    if (spreadId === 'cross') return [
      'Centro: Presente',
      'Sopra: Influenze Positive',
      'Sotto: Fondamenta',
      'Sinistra: Passato',
      'Destra: Futuro'
    ];
    return [];
  };

  // Database Tarocchi
  const tarotDeck = {
    majorArcana: [
      { id: 0, name: 'Il Matto', upright: 'Nuovi inizi, innocenza, spontaneità, libertà', reversed: 'Imprudenza, negligenza, rischio eccessivo', element: 'Aria', number: '0', symbol: '🃏', color: '#A78BFA' },
      { id: 1, name: 'Il Mago', upright: 'Manifestazione, risorse, potere, azione ispirata', reversed: 'Manipolazione, talenti sprecati, illusione', element: 'Aria', number: 'I', symbol: '🎭', color: '#FBBF24' },
      { id: 2, name: 'La Papessa', upright: 'Intuizione, sacro femminile, subconscio, mistero', reversed: 'Segreti, disconnessione dall\'intuizione, silenzio', element: 'Acqua', number: 'II', symbol: '🌙', color: '#60A5FA' },
      { id: 3, name: 'L\'Imperatrice', upright: 'Femminilità, bellezza, natura, abbondanza, nutrimento', reversed: 'Dipendenza, soffocamento, vuoto creativo', element: 'Terra', number: 'III', symbol: '👑', color: '#34D399' },
      { id: 4, name: 'L\'Imperatore', upright: 'Autorità, struttura, controllo, paternità, stabilità', reversed: 'Dominio, rigidità, inflessibilità, tirannia', element: 'Fuoco', number: 'IV', symbol: '⚜️', color: '#EF4444' },
      { id: 5, name: 'Il Papa', upright: 'Tradizione, conformità, moralità, etica, insegnamento', reversed: 'Ribellione, sovversione, nuovi approcci', element: 'Terra', number: 'V', symbol: '📿', color: '#A3A3A3' },
      { id: 6, name: 'Gli Amanti', upright: 'Amore, armonia, relazioni, valori, scelte', reversed: 'Disarmonia, squilibrio, conflitto di valori', element: 'Aria', number: 'VI', symbol: '💕', color: '#F472B6' },
      { id: 7, name: 'Il Carro', upright: 'Controllo, volontà, determinazione, vittoria', reversed: 'Mancanza di controllo, direzione, aggressività', element: 'Acqua', number: 'VII', symbol: '🏇', color: '#06B6D4' },
      { id: 8, name: 'La Forza', upright: 'Coraggio, persuasione, influenza, compassione', reversed: 'Debolezza interiore, insicurezza, dubbio', element: 'Fuoco', number: 'VIII', symbol: '🦁', color: '#FB923C' },
      { id: 9, name: 'L\'Eremita', upright: 'Ricerca interiore, guida interiore, solitudine, introspezione', reversed: 'Isolamento, solitudine, ritiro eccessivo', element: 'Terra', number: 'IX', symbol: '🕯️', color: '#A78BFA' },
      { id: 10, name: 'La Ruota della Fortuna', upright: 'Buona fortuna, karma, cicli vitali, destino', reversed: 'Sfortuna, resistenza al cambiamento, rottura cicli', element: 'Fuoco', number: 'X', symbol: '☸️', color: '#FBBF24' },
      { id: 11, name: 'La Giustizia', upright: 'Giustizia, equità, verità, causa ed effetto', reversed: 'Ingiustizia, disonestà, mancanza di responsabilità', element: 'Aria', number: 'XI', symbol: '⚖️', color: '#10B981' },
      { id: 12, name: 'L\'Appeso', upright: 'Pausa, resa, abbandono, nuova prospettiva', reversed: 'Ritardi, resistenza, blocco', element: 'Acqua', number: 'XII', symbol: '🙃', color: '#3B82F6' },
      { id: 13, name: 'La Morte', upright: 'Fine, trasformazione, transizione, rilascio', reversed: 'Resistenza al cambiamento, incapacità di lasciar andare', element: 'Acqua', number: 'XIII', symbol: '🦋', color: '#6B7280' },
      { id: 14, name: 'La Temperanza', upright: 'Equilibrio, moderazione, pazienza, scopo', reversed: 'Squilibrio, eccesso, mancanza di visione', element: 'Fuoco', number: 'XIV', symbol: '🍶', color: '#8B5CF6' },
      { id: 15, name: 'Il Diavolo', upright: 'Dipendenza, restrizione, materialismo, schiavitù', reversed: 'Liberazione, distacco, libertà interiore', element: 'Terra', number: 'XV', symbol: '⛓️', color: '#7C2D12' },
      { id: 16, name: 'La Torre', upright: 'Disastro improvviso, rivelazione, distruzione, caos', reversed: 'Evitare il disastro, paura del cambiamento', element: 'Fuoco', number: 'XVI', symbol: '⚡', color: '#DC2626' },
      { id: 17, name: 'Le Stelle', upright: 'Speranza, fede, ringiovanimento, ispirazione', reversed: 'Mancanza di fede, disperazione, disconnessione', element: 'Aria', number: 'XVII', symbol: '⭐', color: '#0EA5E9' },
      { id: 18, name: 'La Luna', upright: 'Illusione, paura, ansia, subconscio, intuizione', reversed: 'Rilascio della paura, verità rivelata, chiarezza', element: 'Acqua', number: 'XVIII', symbol: '🌙', color: '#A78BFA' },
      { id: 19, name: 'Il Sole', upright: 'Gioia, successo, celebrazione, positività, vitalità', reversed: 'Negatività temporanea, depressione, tristezza', element: 'Fuoco', number: 'XIX', symbol: '☀️', color: '#FBBF24' },
      { id: 20, name: 'Il Giudizio', upright: 'Giudizio, rinascita, risveglio interiore, chiamata', reversed: 'Dubbio su se stessi, critica interiore, ignorare la chiamata', element: 'Fuoco', number: 'XX', symbol: '📯', color: '#F59E0B' },
      { id: 21, name: 'Il Mondo', upright: 'Completamento, realizzazione, viaggio, successo', reversed: 'Incompletezza, mancanza di chiusura', element: 'Terra', number: 'XXI', symbol: '🌍', color: '#10B981' }
    ]
  };

  const tarotSpreads = [
    { id: 'single', name: 'Carta Singola', desc: 'Una carta per una risposta rapida', cards: 1 },
    { id: 'three', name: 'Tre Carte', desc: 'Passato, Presente, Futuro', cards: 3 },
    { id: 'celtic', name: 'Croce Celtica', desc: 'Lettura approfondita in 10 carte', cards: 10 }
  ];

  const drawTarotCards = (spread) => {
    setIsDrawing(true);
    setSelectedSpread(spread);
    
    setTimeout(() => {
      const shuffled = [...tarotDeck.majorArcana].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, spread.cards).map(card => ({
        ...card,
        reversed: Math.random() > 0.5
      }));
      
      setDrawnCards(drawn);
      setIsDrawing(false);
    }, 1500);
  };

  const getSpreadPositions = (spreadId) => {
    if (spreadId === 'single') return ['La tua guida'];
    if (spreadId === 'three') return ['Passato', 'Presente', 'Futuro'];
    if (spreadId === 'celtic') return [
      'Situazione Presente',
      'Sfida/Ostacolo',
      'Fondamenta',
      'Passato Recente',
      'Possibile Futuro',
      'Futuro Prossimo',
      'Tu nella situazione',
      'Ambiente esterno',
      'Speranze e Paure',
      'Risultato Finale'
    ];
    return [];
  };

  // Calcola la fase lunare
  const getMoonPhase = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = 0;
    let e = 0;
    let jd = 0;
    let b = 0;

    if (month < 3) {
      year = year - 1;
      month = month + 12;
    }

    month++;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);

    if (b >= 8) b = 0;

    return b;
  };

  const getMoonPhaseName = (phase) => {
    const phases = [
      'Luna Nuova',
      'Luna Crescente',
      'Primo Quarto',
      'Gibbosa Crescente',
      'Luna Piena',
      'Gibbosa Calante',
      'Ultimo Quarto',
      'Luna Calante'
    ];
    return phases[phase];
  };

  const getMoonPhaseIcon = (phase) => {
    const icons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    return icons[phase];
  };

  const getMoonPhaseDescription = (phase) => {
    const descriptions = {
      0: {
        title: 'Luna Nuova',
        desc: 'Momento di nuovi inizi e introspezione. La luna non è visibile nel cielo.',
        magic: 'Ideale per nuovi progetti, meditazione, e rituali di purificazione.',
        practical: 'Semina di piante che crescono sopra il terreno. Inizio di nuove attività.'
      },
      1: {
        title: 'Luna Crescente',
        desc: 'La luce lunare aumenta. Fase di crescita e costruzione.',
        magic: 'Rituali per attrarre, prosperità, amore, successo.',
        practical: 'Continua la semina. Periodo favorevole per iniziare progetti.'
      },
      2: {
        title: 'Primo Quarto',
        desc: 'Metà del ciclo crescente. Tempo di azione e decisioni.',
        magic: 'Magia per superare ostacoli, rafforzare la volontà.',
        practical: 'Trapianti, innesti. Momento di agire con determinazione.'
      },
      3: {
        title: 'Gibbosa Crescente',
        desc: 'La luna si avvicina alla pienezza. Energia in accumulo.',
        magic: 'Perfezionamento dei rituali, preparazione per la luna piena.',
        practical: 'Ultime semine prima della luna piena. Raccolto di erbe.'
      },
      4: {
        title: 'Luna Piena',
        desc: 'Massima illuminazione. Culmine del potere lunare.',
        magic: 'Rituali di massima potenza, divinazione, cariche energetiche.',
        practical: 'Raccolto di erbe medicinali. Momento di celebrazione e gratitudine.'
      },
      5: {
        title: 'Gibbosa Calante',
        desc: 'La luce inizia a diminuire. Tempo di riflessione.',
        magic: 'Magia per rilasciare, trasformazione interiore.',
        practical: 'Raccolto di radici. Periodo per riflettere sui risultati.'
      },
      6: {
        title: 'Ultimo Quarto',
        desc: 'Metà del ciclo calante. Momento di pulizia e rilascio.',
        magic: 'Rituali di bando, chiusura di cicli, liberazione.',
        practical: 'Potatura, pulizia del terreno. Eliminare ciò che non serve.'
      },
      7: {
        title: 'Luna Calante',
        desc: 'Verso il buio completo. Preparazione per il nuovo ciclo.',
        magic: 'Magia protettiva, esorcismi, purificazione profonda.',
        practical: 'Riposo della terra. Preparazione per il nuovo ciclo lunare.'
      }
    };
    return descriptions[phase];
  };

  const getFullMoonName = (month) => {
    const names = {
      0: { name: 'Luna del Lupo', desc: 'Tempo di introspezione e rinnovamento' },
      1: { name: 'Luna della Neve', desc: 'Purificazione e nuovi inizi' },
      2: { name: 'Luna del Verme', desc: 'Risveglio della terra e fertilità' },
      3: { name: 'Luna Rosa', desc: 'Crescita e fioritura' },
      4: { name: 'Luna dei Fiori', desc: 'Abbondanza e manifestazione' },
      5: { name: 'Luna delle Fragole', desc: 'Maturazione e gratitudine' },
      6: { name: 'Luna del Tuono', desc: 'Forza e trasformazione' },
      7: { name: 'Luna dello Storione', desc: 'Prosperità e raccolta' },
      8: { name: 'Luna del Raccolto', desc: 'Gratitudine e abbondanza' },
      9: { name: 'Luna del Cacciatore', desc: 'Preparazione e riflessione' },
      10: { name: 'Luna del Castoro', desc: 'Conservazione e protezione' },
      11: { name: 'Luna Fredda', desc: 'Riposo e meditazione profonda' }
    };
    return names[month];
  };

  const getZodiacSign = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: '♈ Ariete', element: 'Fuoco' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: '♉ Toro', element: 'Terra' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: '♊ Gemelli', element: 'Aria' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: '♋ Cancro', element: 'Acqua' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: '♌ Leone', element: 'Fuoco' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: '♍ Vergine', element: 'Terra' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: '♎ Bilancia', element: 'Aria' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: '♏ Scorpione', element: 'Acqua' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: '♐ Sagittario', element: 'Fuoco' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: '♑ Capricorno', element: 'Terra' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: '♒ Acquario', element: 'Aria' };
    return { sign: '♓ Pesci', element: 'Acqua' };
  };

  const getAstrologicalEvents = (month) => {
    const events = {
      0: ['Sole in Capricorno → Acquario (20)', 'Mercurio retrogrado possibile'],
      1: ['Sole in Acquario → Pesci (19)', 'San Valentino: Luna romantica'],
      2: ['Equinozio di Primavera (20)', 'Sole in Pesci → Ariete (20)'],
      3: ['Sole in Ariete → Toro (20)', 'Liridi: pioggia di stelle'],
      4: ['Sole in Toro → Gemelli (21)', 'Eta Aquaridi: meteore'],
      5: ['Solstizio d\'Estate (21)', 'Sole in Gemelli → Cancro (21)'],
      6: ['Sole in Cancro → Leone (22)', 'Luna Piena potente'],
      7: ['Sole in Leone → Vergine (23)', 'Perseidi: stelle cadenti'],
      8: ['Equinozio d\'Autunno (23)', 'Sole in Vergine → Bilancia (23)'],
      9: ['Sole in Bilancia → Scorpione (23)', 'Orionidi: meteore'],
      10: ['Sole in Scorpione → Sagittario (22)', 'Leonidi: stelle cadenti'],
      11: ['Solstizio d\'Inverno (21)', 'Sole in Sagittario → Capricorno (21)']
    };
    return events[month] || [];
  };

  // Libro delle Risposte
  const answerBook = [
    "Sì, assolutamente",
    "È certo",
    "Senza alcun dubbio",
    "Puoi contarci",
    "Come vedo, sì",
    "Molto probabilmente",
    "Le prospettive sono buone",
    "I segni indicano di sì",
    "Risposta incerta, riprova",
    "Chiedilo di nuovo più tardi",
    "Meglio non dirtelo ora",
    "Non posso predirlo adesso",
    "Concentrati e chiedi di nuovo",
    "Non ci contare",
    "La mia risposta è no",
    "Le mie fonti dicono di no",
    "Le prospettive non sono buone",
    "Molto dubbioso"
  ];

  const getAnswer = () => {
    const randomAnswer = answerBook[Math.floor(Math.random() * answerBook.length)];
    setAnswer(randomAnswer);
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 mt-8">
            <span className="text-6xl mb-4 block">✨</span>
            <h1 className="text-4xl font-bold mb-2">Arcana Major</h1>
            <p className="text-purple-200">Esplora i segreti dell'universo</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sezione Divinazione */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-3xl">🔮</span>
                Oracolo
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage('book')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">📕</span>
                  Libro delle Risposte
                </button>
                <button
                  onClick={() => setCurrentPage('tarot')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">🃏</span>
                  Tarocchi
                </button>
                <button
                  onClick={() => setCurrentPage('runes')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">ᚱ</span>
                  Rune
                </button>
              </div>
            </div>

            {/* Sezione Conoscenza */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-3xl">📖</span>
                Grimorio
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage('herbs')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">🌿</span>
                  Erbe Magiche
                </button>
                <button
                  onClick={() => setCurrentPage('crystals')}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">💎</span>
                  Cristalli
                </button>
                <button
                  onClick={() => setCurrentPage('colors')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">🎨</span>
                  Colori
                </button>
                <button
                  onClick={() => setCurrentPage('astrology')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">⭐</span>
                  Astrologia
                </button>
                <button
                  onClick={() => setCurrentPage('moon')}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">🌙</span>
                  Fasi Lunari
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Libro delle Risposte
  if (currentPage === 'book') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-6 text-purple-200 hover:text-white transition flex items-center gap-2 font-semibold"
          >
            <span className="text-xl">✨</span>
            Arcana Major
          </button>
          
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">📕</span>
            <h1 className="text-3xl font-bold mb-2">Libro delle Risposte</h1>
            <p className="text-purple-200">Concentrati sulla tua domanda e apri il libro</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-purple-300/30">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">La tua domanda:</label>
              <input
                type="text"
                placeholder="Scrivi qui la tua domanda..."
                className="w-full bg-white/20 border border-purple-300/50 rounded-lg px-4 py-3 text-white placeholder-purple-200/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              onClick={getAnswer}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              Apri il Libro
            </button>

            {answer && (
              <div className="mt-8 p-6 bg-white/20 rounded-lg border-2 border-yellow-300/50 animate-pulse">
                <p className="text-xl text-center font-semibold text-yellow-100">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pagine placeholder per le altre sezioni
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => {
            setCurrentPage('home');
            setDrawnCards([]);
            setSelectedSpread(null);
            setDrawnRunes([]);
            setSelectedRuneSpread(null);
            setAstroPage(null);
            setSelectedSign(null);
            setBirthChart(null);
            setSelectedHerb(null);
            setSelectedCrystal(null);
            setSelectedColor(null);
          }}
          className="mb-6 text-purple-200 hover:text-white transition flex items-center gap-2 font-semibold"
        >
          <Sparkles className="w-5 h-5" />
          Arcana Major
        </button>
        
        {currentPage === 'runes' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">ᚱᚢᚾᛖ</span>
              <h1 className="text-3xl font-bold mb-2">Rune</h1>
              <p className="text-purple-200">Consulta l'antica saggezza nordica</p>
            </div>

            {!selectedRuneSpread ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Scegli il metodo di lettura</h2>
                {runeSpreads.map(spread => (
                  <div
                    key={spread.id}
                    onClick={() => drawRunes(spread)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-blue-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2">{spread.name}</h3>
                    <p className="text-purple-200 text-sm mb-2">{spread.desc}</p>
                    <p className="text-xs text-blue-300">{spread.runes} {spread.runes === 1 ? 'runa' : 'rune'}</p>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-300/30 mt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">📖</span>
                    Gli Aettir
                  </h3>
                  <p className="text-sm text-purple-100 mb-3">
                    Le 24 rune del Futhark sono divise in tre gruppi di 8, chiamati Aettir:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white/5 rounded p-2">
                      <span className="font-semibold text-yellow-300">Aett di Freya:</span> Rune di crescita e manifestazione
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <span className="font-semibold text-blue-300">Aett di Heimdall:</span> Rune di sfida e trasformazione
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <span className="font-semibold text-green-300">Aett di Tyr:</span> Rune di evoluzione spirituale
                    </div>
                  </div>
                </div>
              </div>
            ) : isDrawing ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">ᚱᚢᚾᛖ</div>
                <p className="text-xl text-purple-200">Estraendo le rune...</p>
                <p className="text-sm text-purple-300 mt-2">Concentrati sulla tua domanda</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedRuneSpread.name}</h2>
                  <p className="text-purple-200 text-sm">{selectedRuneSpread.desc}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {drawnRunes.map((rune, index) => {
                    const positions = getRuneSpreadPositions(selectedRuneSpread.id);
                    return (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-blue-300/30 animate-fadeIn">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-sm text-blue-300 mb-1">{positions[index]}</p>
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-5xl ${rune.reversed ? 'inline-block transform rotate-180' : ''} text-yellow-300`}>
                                {rune.symbol}
                              </span>
                              <div>
                                <h3 className="text-xl font-bold text-yellow-300">
                                  {rune.name}
                                  {rune.reversed && ' (Invertita)'}
                                </h3>
                                <p className="text-xs text-purple-300 mt-1">
                                  {rune.keywords}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-white/5 rounded-lg p-4">
                            <p className="text-sm text-purple-100 leading-relaxed">
                              {rune.reversed ? rune.reversed : rune.upright}
                            </p>
                          </div>

                          <div className="bg-blue-600/20 rounded-lg p-3">
                            <p className="text-xs text-blue-200 mb-1">
                              <span className="font-semibold">Elemento:</span> {rune.element} • 
                              <span className="font-semibold"> Aett:</span> {rune.aett}
                            </p>
                            <p className="text-xs text-blue-200 mb-1">
                              <span className="font-semibold">Corrispondenze:</span> {rune.correspondence}
                            </p>
                            <p className="text-xs text-blue-200">
                              <span className="font-semibold">Divinità:</span> {rune.deity}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedRuneSpread.id === 'three' && drawnRunes.length === 3 && (
                  <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-lg p-6 border border-blue-300/30 mb-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Interpretazione delle Rune
                    </h3>
                    <p className="text-sm text-purple-100 leading-relaxed">
                      {drawnRunes[0].name} mostra la tua situazione attuale e le energie che ti circondano. 
                      {drawnRunes[1].name} suggerisce l'azione o l'atteggiamento da adottare per procedere. 
                      {drawnRunes[2].name} indica il probabile risultato se seguirai questo consiglio. 
                      Le rune non predicono un futuro fisso, ma mostrano le correnti energetiche in gioco.
                    </p>
                  </div>
                )}

                {selectedRuneSpread.id === 'cross' && drawnRunes.length === 5 && (
                  <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-lg p-6 border border-blue-300/30 mb-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Interpretazione della Croce Runica
                    </h3>
                    <p className="text-sm text-purple-100 leading-relaxed">
                      La croce runica rivela un quadro completo: {drawnRunes[0].name} al centro rappresenta il cuore della situazione. 
                      {drawnRunes[1].name} sopra mostra le influenze positive e benedizioni. 
                      {drawnRunes[2].name} sotto rivela le fondamenta e le cause profonde. 
                      {drawnRunes[3].name} a sinistra indica ciò che sta passando, e {drawnRunes[4].name} a destra 
                      mostra dove stai andando. Osserva come queste energie si intrecciano.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setDrawnRunes([]);
                    setSelectedRuneSpread(null);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition"
                >
                  Nuova Lettura
                </button>
              </div>
            )}
          </div>
        ) : currentPage === 'tarot' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🃏</span>
              <h1 className="text-3xl font-bold mb-2">Tarocchi</h1>
              <p className="text-purple-200">Lascia che le carte rivelino il tuo percorso</p>
            </div>

            {!selectedSpread ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Scegli il tipo di lettura</h2>
                {tarotSpreads.map(spread => (
                  <div
                    key={spread.id}
                    onClick={() => drawTarotCards(spread)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2">{spread.name}</h3>
                    <p className="text-purple-200 text-sm mb-2">{spread.desc}</p>
                    <p className="text-xs text-purple-300">{spread.cards} {spread.cards === 1 ? 'carta' : 'carte'}</p>
                  </div>
                ))}
              </div>
            ) : isDrawing ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">🔮</div>
                <p className="text-xl text-purple-200">Mescolando le carte...</p>
                <p className="text-sm text-purple-300 mt-2">Concentrati sulla tua domanda</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedSpread.name}</h2>
                  <p className="text-purple-200 text-sm">{selectedSpread.desc}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {drawnCards.map((card, index) => {
                    const positions = getSpreadPositions(selectedSpread.id);
                    return (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30 animate-fadeIn">
                        <p className="text-sm text-purple-300 mb-3">{positions[index]}</p>
                        
                        {/* Carta Visuale */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0">
                            <div 
                              className={`relative w-32 h-48 rounded-lg shadow-2xl border-4 ${card.reversed ? 'rotate-180' : ''}`}
                              style={{
                                backgroundImage: `linear-gradient(135deg, ${card.color}66, ${card.color}aa)`,
                                borderColor: card.color
                              }}
                            >
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                                <div className="text-5xl mb-2">{card.symbol}</div>
                                <div className="text-xl font-bold text-center text-white">
                                  {card.number}
                                </div>
                              </div>
                              <div className="absolute top-2 left-2 text-xs font-bold text-white opacity-70">
                                {card.number}
                              </div>
                              <div className="absolute bottom-2 right-2 text-xs font-bold text-white opacity-70 rotate-180">
                                {card.number}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-yellow-300 mb-1">
                              {card.name}
                              {card.reversed && ' (Rovesciata)'}
                            </h3>
                            <p className="text-xs text-blue-300 mb-3">Elemento: {card.element}</p>
                            
                            <div className="bg-white/5 rounded-lg p-4">
                              <p className="text-sm text-purple-100 leading-relaxed">
                                {card.reversed ? card.reversed : card.upright}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedSpread.id === 'three' && drawnCards.length === 3 && (
                  <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-lg p-6 border border-purple-300/30 mb-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Interpretazione della Lettura
                    </h3>
                    <p className="text-sm text-purple-100 leading-relaxed">
                      Il tuo passato ({drawnCards[0].name}) ha creato le fondamenta per la situazione attuale. 
                      Nel presente ({drawnCards[1].name}) stai affrontando questa energia. 
                      Il futuro ({drawnCards[2].name}) ti mostra verso dove ti stai dirigendo. 
                      Ricorda che il futuro non è fisso, ma influenzato dalle tue scelte presenti.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setDrawnCards([]);
                    setSelectedSpread(null);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition"
                >
                  Nuova Lettura
                </button>
              </div>
            )}
          </div>
        ) : currentPage === 'astrology' ? (
          <div>
            {!astroPage ? (
              <>
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">⭐</span>
                  <h1 className="text-3xl font-bold mb-2">Astrologia</h1>
                  <p className="text-purple-200">Scopri i segreti delle stelle</p>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => setAstroPage('horoscope')}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-yellow-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      Oroscopo Giornaliero
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Leggi l'oroscopo di oggi per il tuo segno zodiacale
                    </p>
                  </div>

                  <div
                    onClick={() => setAstroPage('birthchart')}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-2xl">🔮</span>
                      Tema Natale
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Calcola il tuo tema natale personale
                    </p>
                  </div>
                </div>
              </>
            ) : astroPage === 'horoscope' ? (
              <>
                <button
                  onClick={() => {
                    setAstroPage(null);
                    setSelectedSign(null);
                  }}
                  className="mb-6 text-purple-200 hover:text-white transition"
                >
                  ← Torna ad Astrologia
                </button>

                {!selectedSign ? (
                  <>
                    <div className="text-center mb-8">
                      <span className="text-6xl mb-4 block">⭐</span>
                      <h1 className="text-3xl font-bold mb-2">Oroscopo Giornaliero</h1>
                      <p className="text-purple-200">
                        {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {zodiacSigns.map(sign => (
                        <div
                          key={sign.id}
                          onClick={() => setSelectedSign(sign)}
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{sign.symbol}</span>
                            <div>
                              <h3 className="text-lg font-bold">{sign.name}</h3>
                              <p className="text-xs text-purple-300">{sign.dates}</p>
                            </div>
                          </div>
                          <p className="text-xs text-purple-200">
                            {sign.element} • {sign.quality}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedSign(null)}
                      className="mb-6 text-purple-200 hover:text-white transition"
                    >
                      ← Torna ai segni
                    </button>

                    <div className="text-center mb-6">
                      <span className="text-7xl">{selectedSign.symbol}</span>
                      <h1 className="text-3xl font-bold mt-2">{selectedSign.name}</h1>
                      <p className="text-purple-200 text-sm">{selectedSign.dates}</p>
                      <div className="flex gap-4 justify-center mt-2 text-sm">
                        <span className="text-yellow-300">⚡ {selectedSign.element}</span>
                        <span className="text-blue-300">🔷 {selectedSign.quality}</span>
                        <span className="text-pink-300">✨ {selectedSign.ruler}</span>
                      </div>
                    </div>

                    {(() => {
                      const horoscope = getHoroscope(selectedSign.id);
                      return (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-lg p-6 border border-purple-300/30">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                              <Star className="w-5 h-5" />
                              Panoramica Generale
                            </h3>
                            <p className="text-purple-100 leading-relaxed">{horoscope.general}</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-pink-300/30">
                            <h3 className="font-bold mb-2 flex items-center gap-2 text-pink-300">
                              💕 Amore
                            </h3>
                            <p className="text-sm text-purple-100">{horoscope.love}</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-yellow-300/30">
                            <h3 className="font-bold mb-2 flex items-center gap-2 text-yellow-300">
                              💼 Lavoro
                            </h3>
                            <p className="text-sm text-purple-100">{horoscope.work}</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-green-300/30">
                            <h3 className="font-bold mb-2 flex items-center gap-2 text-green-300">
                              💚 Salute
                            </h3>
                            <p className="text-sm text-purple-100">{horoscope.health}</p>
                          </div>

                          <div className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg p-5 border border-yellow-300/30 text-center">
                            <p className="font-semibold">{horoscope.lucky}</p>
                          </div>

                          <div className="bg-white/10 rounded-lg p-4 text-center text-sm text-purple-200">
                            <p className="italic">{selectedSign.traits}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}
              </>
            ) : astroPage === 'birthchart' ? (
              <>
                <button
                  onClick={() => setAstroPage(null)}
                  className="mb-6 text-purple-200 hover:text-white transition"
                >
                  ← Torna ad Astrologia
                </button>

                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">🔮</span>
                  <h1 className="text-3xl font-bold mb-2">Tema Natale</h1>
                  <p className="text-purple-200">Scopri la tua carta astrale personale</p>
                </div>

                {!birthChart ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                    <h2 className="text-xl font-semibold mb-4">Inserisci i tuoi dati di nascita</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Data di Nascita *</label>
                        <input
                          type="date"
                          value={birthData.date}
                          onChange={(e) => setBirthData({...birthData, date: e.target.value})}
                          className="w-full bg-white/20 border border-purple-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Ora di Nascita *</label>
                        <input
                          type="time"
                          value={birthData.time}
                          onChange={(e) => setBirthData({...birthData, time: e.target.value})}
                          className="w-full bg-white/20 border border-purple-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                        />
                        <p className="text-xs text-purple-300 mt-1">L'ora è fondamentale per calcolare l'Ascendente</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Luogo di Nascita (opzionale)</label>
                        <input
                          type="text"
                          value={birthData.place}
                          onChange={(e) => setBirthData({...birthData, place: e.target.value})}
                          placeholder="Es: Roma, Italia"
                          className="w-full bg-white/20 border border-purple-300/50 rounded-lg px-4 py-3 text-white placeholder-purple-200/50 focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <button
                        onClick={calculateBirthChart}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition"
                      >
                        Calcola Tema Natale
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-lg p-6 border border-purple-300/30">
                      <h2 className="text-2xl font-bold mb-4 text-center">Il Tuo Tema Natale</h2>
                      <div className="text-center text-sm text-purple-200 mb-4">
                        {birthChart.date} • {birthChart.time} • {birthChart.place}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <div className="text-3xl mb-2">☀️</div>
                          <h3 className="font-bold text-yellow-300">Sole</h3>
                          <p className="text-2xl my-2">{birthChart.sun}</p>
                          <p className="text-xs text-purple-200">La tua essenza, identità centrale</p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <div className="text-3xl mb-2">🌙</div>
                          <h3 className="font-bold text-blue-300">Luna</h3>
                          <p className="text-2xl my-2">{birthChart.moon}</p>
                          <p className="text-xs text-purple-200">Le tue emozioni, il tuo mondo interiore</p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <div className="text-3xl mb-2">⬆️</div>
                          <h3 className="font-bold text-pink-300">Ascendente</h3>
                          <p className="text-2xl my-2">{birthChart.ascendant}</p>
                          <p className="text-xs text-purple-200">Come appari agli altri, la tua maschera</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Interpretazione
                      </h3>
                      <div className="space-y-3 text-sm text-purple-100">
                        <p>
                          <span className="font-semibold text-yellow-300">Sole in {birthChart.sun}:</span> Questa è la tua essenza fondamentale, 
                          ciò che sei nel profondo. Rappresenta la tua volontà, il tuo scopo di vita e la tua creatività naturale.
                        </p>
                        <p>
                          <span className="font-semibold text-blue-300">Luna in {birthChart.moon}:</span> Governa le tue emozioni, 
                          i tuoi bisogni emotivi e il modo in cui ti prendi cura di te stesso e degli altri. 
                          Rappresenta il tuo mondo interiore privato.
                        </p>
                        <p>
                          <span className="font-semibold text-pink-300">Ascendente {birthChart.ascendant}:</span> È la "maschera" che indossi, 
                          il modo in cui ti presenti al mondo e come gli altri ti percepiscono al primo incontro. 
                          Influenza il tuo aspetto fisico e il tuo approccio alla vita.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBirthChart(null);
                        setBirthData({ date: '', time: '', place: '' });
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition"
                    >
                      Calcola Nuovo Tema Natale
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        ) : currentPage === 'herbs' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🌿</span>
              <h1 className="text-3xl font-bold mb-2">Erbe Magiche</h1>
              <p className="text-purple-200">Il potere della natura al tuo servizio</p>
            </div>

            {!selectedHerb ? (
              <>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Cerca per nome o proprietà (es: amore, protezione...)"
                    value={herbSearch}
                    onChange={(e) => setHerbSearch(e.target.value)}
                    className="w-full bg-white/20 border border-green-300/50 rounded-lg px-4 py-3 text-white placeholder-purple-200/50 focus:outline-none focus:border-green-400"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {getFilteredHerbs().map(herb => (
                    <div
                      key={herb.id}
                      onClick={() => setSelectedHerb(herb)}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-green-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-green-300 flex items-center gap-2">
                            <span>{herb.emoji}</span>
                            {herb.name}
                          </h3>
                          <p className="text-xs italic text-purple-300">{herb.latin}</p>
                        </div>
                      </div>
                      
                      <div className="text-xs space-y-1 mb-3">
                        <p><span className="text-yellow-300">🪐 Pianeta:</span> {herb.planet}</p>
                        <p><span className="text-blue-300">🌊 Elemento:</span> {herb.element}</p>
                      </div>

                      <p className="text-sm text-purple-200 line-clamp-2">{herb.properties}</p>
                    </div>
                  ))}
                </div>

                {getFilteredHerbs().length === 0 && (
                  <div className="text-center py-10 text-purple-300">
                    Nessuna erba trovata. Prova un'altra ricerca.
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedHerb(null)}
                  className="mb-6 text-purple-200 hover:text-white transition"
                >
                  ← Torna alle erbe
                </button>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-lg p-6 border border-green-300/30">
                    <div className="text-center mb-4">
                      <span className="text-6xl">{selectedHerb.emoji}</span>
                      <h1 className="text-3xl font-bold mt-3">{selectedHerb.name}</h1>
                      <p className="text-sm italic text-green-200">{selectedHerb.latin}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-yellow-300">🪐 Pianeta:</span> {selectedHerb.planet}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-blue-300">🌊 Elemento:</span> {selectedHerb.element}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-purple-300">🔮 Chakra:</span> {selectedHerb.chakra}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-pink-300">✨ Divinità:</span> {selectedHerb.deity}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                    <h3 className="font-bold mb-3 text-lg text-green-300 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Proprietà Magiche
                    </h3>
                    <p className="text-purple-100 mb-4">{selectedHerb.properties}</p>
                    <div className="bg-purple-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedHerb.magical}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-green-300/30">
                    <h3 className="font-bold mb-3 text-lg text-green-300 flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      Usi Pratici e Salute
                    </h3>
                    <div className="bg-green-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedHerb.practical}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg p-5 border border-yellow-300/30">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      🌙 Raccolta
                    </h3>
                    <p className="text-sm text-purple-100">
                      {selectedHerb.harvest}
                    </p>
                  </div>

                  <div className="bg-red-600/20 rounded-lg p-4 border border-red-300/30">
                    <p className="text-xs text-red-200">
                      ⚠️ <span className="font-semibold">Avvertenza:</span> Consulta sempre un esperto prima di usare erbe internamente. 
                      Alcune erbe possono avere controindicazioni o interagire con farmaci.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : currentPage === 'crystals' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">💎</span>
              <h1 className="text-3xl font-bold mb-2">Cristalli</h1>
              <p className="text-purple-200">Le pietre del potere e della guarigione</p>
            </div>

            {!selectedCrystal ? (
              <>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Cerca per nome, proprietà o chakra..."
                    value={crystalSearch}
                    onChange={(e) => setCrystalSearch(e.target.value)}
                    className="w-full bg-white/20 border border-pink-300/50 rounded-lg px-4 py-3 text-white placeholder-purple-200/50 focus:outline-none focus:border-pink-400"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {getFilteredCrystals().map(crystal => (
                    <div
                      key={crystal.id}
                      onClick={() => setSelectedCrystal(crystal)}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-pink-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-pink-300 flex items-center gap-2">
                            <span>{crystal.emoji}</span>
                            {crystal.name}
                          </h3>
                          <p className="text-xs text-purple-300">{crystal.color} • {crystal.type}</p>
                        </div>
                      </div>
                      
                      <div className="text-xs space-y-1 mb-3">
                        <p><span className="text-blue-300">🧘 Chakra:</span> {crystal.chakra}</p>
                        <p><span className="text-yellow-300">🪐 Pianeta:</span> {crystal.planet}</p>
                      </div>

                      <p className="text-sm text-purple-200 line-clamp-2">{crystal.properties}</p>
                    </div>
                  ))}
                </div>

                {getFilteredCrystals().length === 0 && (
                  <div className="text-center py-10 text-purple-300">
                    Nessun cristallo trovato. Prova un'altra ricerca.
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCrystal(null)}
                  className="mb-6 text-purple-200 hover:text-white transition"
                >
                  ← Torna ai cristalli
                </button>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-lg p-6 border border-pink-300/30">
                    <div className="text-center mb-4">
                      <span className="text-6xl">{selectedCrystal.emoji}</span>
                      <h1 className="text-3xl font-bold mt-3">{selectedCrystal.name}</h1>
                      <p className="text-sm text-pink-200">{selectedCrystal.type}</p>
                      <p className="text-sm italic text-purple-200 mt-1">{selectedCrystal.color}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-blue-300">🧘 Chakra:</span> {selectedCrystal.chakra}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-green-300">🌊 Elemento:</span> {selectedCrystal.element}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-yellow-300">🪐 Pianeta:</span> {selectedCrystal.planet}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-pink-300">⭐ Segno:</span> {selectedCrystal.zodiac}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold text-purple-300">💎 Durezza:</span> {selectedCrystal.hardness} Mohs
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                    <h3 className="font-bold mb-3 text-lg text-pink-300 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Proprietà Magiche ed Energetiche
                    </h3>
                    <p className="text-purple-100 mb-4">{selectedCrystal.properties}</p>
                    <div className="bg-purple-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedCrystal.magical}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-green-300/30">
                    <h3 className="font-bold mb-3 text-lg text-green-300 flex items-center gap-2">
                      💚 Guarigione e Benessere
                    </h3>
                    <div className="bg-green-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedCrystal.healing}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-lg p-5 border border-blue-300/30">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      💧 Pulizia e Cura
                    </h3>
                    <p className="text-sm text-purple-100">
                      {selectedCrystal.cleansing}
                    </p>
                  </div>

                  <div className="bg-yellow-600/20 rounded-lg p-4 border border-yellow-300/30">
                    <h3 className="font-bold mb-2 text-sm">💡 Come usare questo cristallo:</h3>
                    <ul className="text-xs text-purple-100 space-y-1">
                      <li>• Meditazione: tieni in mano o posiziona sul chakra corrispondente</li>
                      <li>• Porta con te: in tasca o come gioiello per beneficio continuo</li>
                      <li>• Casa: posiziona negli ambienti per armonizzare energia</li>
                      <li>• Acqua: crea elisir (solo se sicuro - alcuni cristalli sono tossici)</li>
                      <li>• Griglie: combina con altri cristalli per amplificare intenzioni</li>
                    </ul>
                  </div>

                  <div className="bg-red-600/20 rounded-lg p-4 border border-red-300/30">
                    <p className="text-xs text-red-200">
                      ⚠️ <span className="font-semibold">Nota:</span> Pulisci sempre il cristallo prima del primo uso e regolarmente dopo. 
                      Alcuni cristalli sono tossici se ingeriti o immersi in acqua. I cristalli non sostituiscono cure mediche professionali.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : currentPage === 'colors' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🎨</span>
              <h1 className="text-3xl font-bold mb-2">Colori</h1>
              <p className="text-purple-200">Il linguaggio delle vibrazioni cromatiche</p>
            </div>

            {!selectedColor ? (
              <div className="grid md:grid-cols-3 gap-4">
                {colorsDatabase.map(color => (
                  <div
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-purple-300/30 hover:bg-white/20 cursor-pointer transition transform hover:scale-105"
                    style={{ borderColor: color.hex + '80' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-12 h-12 rounded-full shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div>
                        <h3 className="text-lg font-bold">{color.name}</h3>
                        <p className="text-xs text-purple-300">{color.element}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-purple-200 line-clamp-2">{color.properties}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setSelectedColor(null)}
                  className="mb-6 text-purple-200 hover:text-white transition"
                >
                  ← Torna ai colori
                </button>

                <div className="space-y-4">
                  <div 
                    className="rounded-lg p-6 border-2"
                    style={{ 
                      borderColor: selectedColor.hex,
                      background: `linear-gradient(135deg, ${selectedColor.hex}20, ${selectedColor.hex}40)`
                    }}
                  >
                    <div className="text-center mb-4">
                      <div 
                        className="w-24 h-24 rounded-full mx-auto mb-4 shadow-2xl"
                        style={{ backgroundColor: selectedColor.hex }}
                      ></div>
                      <h1 className="text-3xl font-bold">{selectedColor.name}</h1>
                      <p className="text-sm text-purple-200 mt-2">{selectedColor.properties}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm mt-4">
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold">🌊 Elemento:</span> {selectedColor.element}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold">🪐 Pianeta:</span> {selectedColor.planet}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold">🧘 Chakra:</span> {selectedColor.chakra}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold">📅 Giorno:</span> {selectedColor.day}
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <span className="font-semibold">⭐ Segni:</span> {selectedColor.zodiac}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                    <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-300" />
                      Magia e Rituali
                    </h3>
                    <div className="bg-purple-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedColor.magical}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-pink-300/30">
                    <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                      💖 Effetti Emotivi e Psicologici
                    </h3>
                    <div className="bg-pink-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedColor.emotional}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-green-300/30">
                    <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                      👔 Uso Pratico Quotidiano
                    </h3>
                    <div className="bg-green-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedColor.practical}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-yellow-300/30">
                    <h3 className="font-bold mb-3 text-lg flex items-center gap-2">
                      🎨 Combinazioni di Colori
                    </h3>
                    <div className="bg-yellow-600/20 rounded-lg p-4">
                      <p className="text-sm text-purple-100 leading-relaxed">
                        {selectedColor.combinations}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-300/30">
                      <h4 className="font-bold mb-2 text-sm flex items-center gap-1">
                        🍎 Cibi
                      </h4>
                      <p className="text-xs text-purple-100">{selectedColor.foods}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-pink-300/30">
                      <h4 className="font-bold mb-2 text-sm flex items-center gap-1">
                        💎 Cristalli
                      </h4>
                      <p className="text-xs text-purple-100">{selectedColor.crystals}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-green-300/30">
                      <h4 className="font-bold mb-2 text-sm flex items-center gap-1">
                        🌿 Erbe
                      </h4>
                      <p className="text-xs text-purple-100">{selectedColor.herbs}</p>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-300/30">
                    <h3 className="font-bold mb-2 text-sm">💡 Consigli per l'uso del colore:</h3>
                    <ul className="text-xs text-purple-100 space-y-1">
                      <li>• <span className="font-semibold">Candele:</span> Brucia candele di questo colore durante rituali specifici</li>
                      <li>• <span className="font-semibold">Abbigliamento:</span> Indossa questo colore per attirare le sue energie</li>
                      <li>• <span className="font-semibold">Casa:</span> Usa in stanze specifiche per creare l'atmosfera desiderata</li>
                      <li>• <span className="font-semibold">Altare:</span> Decora con tovaglie, tessuti e oggetti di questo colore</li>
                      <li>• <span className="font-semibold">Meditazione:</span> Visualizza questo colore per assorbirne le proprietà</li>
                      <li>• <span className="font-semibold">Alimentazione:</span> Mangia cibi di questo colore per assorbire energia</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : currentPage === 'moon' ? (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🌙</span>
              <h1 className="text-3xl font-bold mb-2">Fasi Lunari</h1>
              <p className="text-purple-200">Segui il ciclo della Luna</p>
            </div>

            {(() => {
              const today = new Date();
              const currentPhase = getMoonPhase(today);
              const phaseInfo = getMoonPhaseDescription(currentPhase);
              const currentMonth = today.getMonth();
              const currentYear = today.getFullYear();
              const fullMoonInfo = getFullMoonName(currentMonth);
              const zodiac = getZodiacSign(today);
              const astroEvents = getAstrologicalEvents(currentMonth);

              return (
                <>
                  {/* Fase Corrente */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-purple-300/30 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Fase Lunare Oggi</h2>
                    <div className="text-center mb-6">
                      <div className="text-7xl mb-2">{getMoonPhaseIcon(currentPhase)}</div>
                      <h3 className="text-2xl font-bold text-yellow-300">{phaseInfo.title}</h3>
                      <p className="text-sm text-purple-200 mt-1">
                        {today.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-lg text-blue-300 mt-2">{zodiac.sign}</p>
                      <p className="text-xs text-purple-200">Elemento: {zodiac.element}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-purple-100 leading-relaxed">{phaseInfo.desc}</p>
                      </div>

                      <div className="bg-purple-600/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Magia e Rituali
                        </h4>
                        <p className="text-sm text-purple-100">{phaseInfo.magic}</p>
                      </div>

                      <div className="bg-green-600/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4" />
                          Attività Pratiche
                        </h4>
                        <p className="text-sm text-purple-100">{phaseInfo.practical}</p>
                      </div>
                    </div>
                  </div>

                  {/* Luna Piena del Mese */}
                  <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-6 border border-blue-300/30 mb-6">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      🌕 {fullMoonInfo.name}
                    </h2>
                    <p className="text-purple-100 text-sm mb-4">{fullMoonInfo.desc}</p>
                    <div className="text-xs text-blue-200">
                      Luna Piena di {today.toLocaleDateString('it-IT', { month: 'long' })}
                    </div>
                  </div>

                  {/* Eventi Astrologici del Mese */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30 mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-300" />
                      Eventi Astrologici di {today.toLocaleDateString('it-IT', { month: 'long' })}
                    </h2>
                    <div className="space-y-2">
                      {astroEvents.map((event, idx) => (
                        <div key={idx} className="bg-white/5 rounded p-3 text-sm text-purple-100 flex items-center gap-2">
                          <span className="text-yellow-300">✦</span>
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendario Mensile */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Calendario Lunare - {today.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</h2>
                    
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-purple-300 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {(() => {
                        const firstDay = new Date(currentYear, currentMonth, 1);
                        const lastDay = new Date(currentYear, currentMonth + 1, 0);
                        const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
                        const daysInMonth = lastDay.getDate();
                        
                        const cells = [];
                        
                        for (let i = 0; i < startingDayOfWeek; i++) {
                          cells.push(<div key={`empty-${i}`} className="aspect-square" />);
                        }
                        
                        for (let day = 1; day <= daysInMonth; day++) {
                          const date = new Date(currentYear, currentMonth, day);
                          const phase = getMoonPhase(date);
                          const isToday = day === today.getDate();
                          const dayZodiac = getZodiacSign(date);
                          
                          cells.push(
                            <div
                              key={day}
                              className={`aspect-square rounded-lg p-1 text-center flex flex-col items-center justify-center ${
                                isToday 
                                  ? 'bg-yellow-500/40 border-2 border-yellow-300' 
                                  : 'bg-white/5 hover:bg-white/10'
                              } transition cursor-pointer`}
                            >
                              <div className="text-xs font-semibold">{day}</div>
                              <div className="text-lg leading-none">{getMoonPhaseIcon(phase)}</div>
                              <div className="text-xs text-purple-300">{dayZodiac.sign.split(' ')[0]}</div>
                            </div>
                          );
                        }
                        
                        return cells;
                      })()}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <span>🌑</span> Nuova
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <span>🌓</span> Crescente
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <span>🌕</span> Piena
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <span>🌗</span> Calante
                      </div>
                    </div>
                  </div>

                  {/* Prossime Fasi */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-300/30">
                    <h2 className="text-xl font-semibold mb-4">Prossime Fasi Importanti</h2>
                    <div className="space-y-3">
                      {[0, 7, 14, 21, 28].map((daysAhead) => {
                        const futureDate = new Date(today);
                        futureDate.setDate(today.getDate() + daysAhead);
                        const phase = getMoonPhase(futureDate);
                        const futureZodiac = getZodiacSign(futureDate);
                        
                        return (
                          <div key={daysAhead} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{getMoonPhaseIcon(phase)}</span>
                              <div>
                                <p className="font-medium">{getMoonPhaseName(phase)}</p>
                                <p className="text-xs text-purple-200">
                                  {futureDate.toLocaleDateString('it-IT', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </p>
                                <p className="text-xs text-blue-300">{futureZodiac.sign}</p>
                              </div>
                            </div>
                            {daysAhead === 0 && (
                              <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded">Oggi</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {currentPage === 'tarot' && 'Tarocchi'}
              {currentPage === 'runes' && 'Rune'}
              {currentPage === 'herbs' && 'Erbe Magiche'}
              {currentPage === 'crystals' && 'Cristalli'}
              {currentPage === 'colors' && 'Colori'}
              {currentPage === 'astrology' && 'Astrologia'}
            </h1>
            <p className="text-purple-200">Sezione in costruzione...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;