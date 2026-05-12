/* ── Luminae product + content data ──────────────────────── */

const PRODUCTS = [
  // SKINCARE (cat: skincare) — sérums, hidratantes, limpieza, exfoliantes, mascarillas
  { id:1,  vendor:'La Roche-Posay', title:'Sérum Vitamina C 10% Pureé',         price:42,  rating:4.8, reviews:312,  tag:'new',  cat:'skincare', sub:'serum',     bg:'#D9CFC4' },
  { id:2,  vendor:'CeraVe',          title:'Hidratante AM SPF 30 Facial',        price:28,  rating:4.9, reviews:1204, tag:'best', cat:'skincare', sub:'hidratante',bg:'#C9C4BC' },
  { id:3,  vendor:'The Ordinary',    title:'Hyaluronic Acid 2% + B5',            price:14,  comparePrice:18, rating:4.7, reviews:892, tag:'sale', cat:'skincare', sub:'serum', bg:'#D4CFC9' },
  { id:4,  vendor:'Caudalie',        title:'Vinoperfect Sérum Illuminateur',     price:58,  rating:4.6, reviews:245,  tag:'new',  cat:'skincare', sub:'serum',     bg:'#C5BAB0' },
  { id:5,  vendor:'COSRX',           title:'Advanced Snail Mucin 96% Power',     price:22,  rating:4.8, reviews:678,  tag:'best', cat:'skincare', sub:'serum',     bg:'#D0C8C0' },
  { id:6,  vendor:"Paula's Choice",  title:'Skin Perfecting 2% BHA Liquid',      price:34,  rating:4.7, reviews:445,  tag:null,   cat:'skincare', sub:'exfoliante',bg:'#C8C0B8' },
  { id:13, vendor:'La Roche-Posay',  title:'Toleriane Limpiador Suave 400ml',    price:24,  rating:4.8, reviews:567,  tag:null,   cat:'skincare', sub:'limpieza',  bg:'#DCD3C8' },
  { id:14, vendor:'Klairs',          title:'Mascarilla Calmante de Algas',       price:19,  rating:4.5, reviews:189,  tag:'new',   cat:'skincare', sub:'mascarilla',bg:'#C2BEB2' },
  { id:15, vendor:'Beauty of Joseon',title:'Relief Sun Rice + Probiotics SPF 50',price:18,  rating:4.9, reviews:2341, tag:'best', cat:'skincare', sub:'protector', bg:'#D8CFC0' },
  { id:16, vendor:'Innisfree',       title:'Volcanic Pore Clay Mask 100ml',      price:16,  comparePrice:22, rating:4.4, reviews:412,  tag:'sale',  cat:'skincare', sub:'mascarilla',bg:'#BFB7AC' },
  { id:17, vendor:'CeraVe',          title:'Crema Reparadora Manos & Cuerpo',    price:21,  rating:4.7, reviews:823,  tag:null,   cat:'skincare', sub:'hidratante',bg:'#D4CDC2' },
  { id:18, vendor:'The Ordinary',    title:'Niacinamide 10% + Zinc 1%',          price:12,  rating:4.6, reviews:1893, tag:null,   cat:'skincare', sub:'serum',     bg:'#CDC5BB' },

  // PERFUMERÍA (cat: perfumeria)
  { id:7,  vendor:'Maison Margiela', title:'Replica Beach Walk EDP 100ml',       price:165, rating:4.9, reviews:189,  tag:'new',  cat:'perfumeria', sub:'femenino',bg:'#C4BCAC' },
  { id:8,  vendor:'Byredo',          title:"Bal d'Afrique Eau de Parfum 50ml",   price:220, rating:4.8, reviews:132,  tag:null,   cat:'perfumeria', sub:'unisex',  bg:'#BEB8B0' },
  { id:19, vendor:'Le Labo',         title:'Santal 33 Eau de Parfum 50ml',       price:215, rating:4.7, reviews:289,  tag:'best', cat:'perfumeria', sub:'unisex',  bg:'#B8B0A4' },
  { id:20, vendor:'Diptyque',        title:'Philosykos Eau de Toilette 75ml',    price:170, rating:4.8, reviews:156,  tag:null,   cat:'perfumeria', sub:'femenino',bg:'#C0B8A8' },
  { id:21, vendor:'Tom Ford',        title:'Black Orchid EDP 50ml',              price:185, comparePrice:240, rating:4.9, reviews:412, tag:'sale', cat:'perfumeria', sub:'femenino', bg:'#A89E92' },
  { id:22, vendor:'Maison Margiela', title:"Replica By the Fireplace EDP 30ml",  price:95,  rating:4.7, reviews:234,  tag:null,   cat:'perfumeria', sub:'unisex',  bg:'#B5AC9C' },
  { id:23, vendor:'Jo Malone',       title:'Wood Sage & Sea Salt Cologne 50ml',  price:155, rating:4.6, reviews:178,  tag:'new',  cat:'perfumeria', sub:'unisex',  bg:'#C8BEB0' },
  { id:24, vendor:'Yves Saint Laurent', title:'Libre Eau de Parfum 50ml',         price:128, rating:4.8, reviews:567,  tag:'best', cat:'perfumeria', sub:'femenino',bg:'#BFB4A0' },

  // WELLNESS (cat: wellness)
  { id:9,  vendor:'Tatcha',          title:'The Water Cream Oil-Free Moisturizer',price:68, rating:4.8, reviews:523,  tag:'best', cat:'wellness', sub:'cuerpo',  bg:'#D2CBC2' },
  { id:10, vendor:'Drunk Elephant',  title:'Lala Retro Whipped Peptide Cream',   price:62,  rating:4.7, reviews:334,  tag:null,   cat:'wellness', sub:'cuerpo',  bg:'#C6BEB6' },
  { id:25, vendor:'Sol de Janeiro',  title:'Brazilian Bum Bum Cream 240ml',      price:48,  rating:4.9, reviews:1823, tag:'best', cat:'wellness', sub:'cuerpo',  bg:'#D6CCC0' },
  { id:26, vendor:'Aesop',           title:'Resurrection Aromatique Hand Wash',  price:42,  rating:4.7, reviews:289,  tag:null,   cat:'wellness', sub:'aromaterapia', bg:'#BAB0A4' },
  { id:27, vendor:'Nécessaire',      title:'The Body Wash — Eucalyptus 250ml',   price:24,  rating:4.6, reviews:445,  tag:'new',  cat:'wellness', sub:'cuerpo',  bg:'#C5BFB4' },
  { id:28, vendor:'Olaplex',         title:'No.3 Hair Perfector Tratamiento',    price:30,  comparePrice:38, rating:4.8, reviews:1567, tag:'sale', cat:'wellness', sub:'cabello', bg:'#CCC4B8' },
  { id:29, vendor:'Kérastase',       title:'Elixir Ultime Aceite Original 100ml',price:54,  rating:4.7, reviews:412,  tag:null,   cat:'wellness', sub:'cabello', bg:'#BCB4A6' },
  { id:30, vendor:'Saje Natural',    title:'Peppermint Halo Roll-On',            price:28,  rating:4.5, reviews:198,  tag:'new',  cat:'wellness', sub:'aromaterapia', bg:'#C0B8AA' },

  // SETS / REGALOS
  { id:11, vendor:'Fenty Beauty',    title:"Pro Filt'r Soft Matte Foundation Set", price:38, rating:4.6, reviews:891, tag:'new',  cat:'sets', sub:'maquillaje', bg:'#CBC4BC' },
  { id:31, vendor:'Drunk Elephant',  title:'Mini Bake & Glow Trio Skincare',     price:55,  rating:4.7, reviews:234,  tag:null,   cat:'sets', sub:'skincare',   bg:'#C8BFB2' },
  { id:32, vendor:'Sol de Janeiro',  title:'Cheirosa Discovery Set 4 Mistos',    price:45,  comparePrice:60, rating:4.8, reviews:678, tag:'sale', cat:'sets', sub:'cuerpo', bg:'#D2C6B6' },
  { id:33, vendor:'Jo Malone',       title:'Cologne Discovery Set 5 Aromas',     price:75,  rating:4.9, reviews:312,  tag:'best', cat:'sets', sub:'perfumeria', bg:'#BCB0A0' },
  { id:34, vendor:'Tatcha',          title:'The Ritual Discovery Set',           price:88,  rating:4.7, reviews:189,  tag:null,   cat:'sets', sub:'skincare',   bg:'#C5BBAC' },

  // OFERTAS — flagged as cat:'ofertas' explicitly in addition to base
  { id:12, vendor:'Rare Beauty',     title:'Soft Pinch Liquid Blush — Hope',     price:26,  rating:4.9, reviews:1567, tag:'best', cat:'ofertas', sub:'maquillaje', bg:'#C8C0B8' },
];

// Brand list — derived
const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.vendor))).sort();

// Subcategories per category
const SUBCATS = {
  skincare:  ['serum','hidratante','limpieza','exfoliante','mascarilla','protector'],
  perfumeria:['femenino','masculino','unisex'],
  wellness:  ['cuerpo','cabello','aromaterapia'],
  sets:      ['skincare','perfumeria','cuerpo','maquillaje'],
  ofertas:   ['skincare','perfumeria','maquillaje','wellness'],
};

const SUBCAT_LABELS = {
  serum:'Sérums', hidratante:'Hidratantes', limpieza:'Limpieza',
  exfoliante:'Exfoliantes', mascarilla:'Mascarillas', protector:'Protector solar',
  femenino:'Femeninos', masculino:'Masculinos', unisex:'Unisex',
  cuerpo:'Cuerpo', cabello:'Cabello', aromaterapia:'Aromaterapia',
  skincare:'Skincare', perfumeria:'Perfumería', maquillaje:'Maquillaje',
};

// Returns the products that should appear in a given category page.
// 'ofertas' = anything with sale tag OR comparePrice; 'marcas' & 'all' = everything
function productsFor(cat) {
  if (!cat || cat === 'all' || cat === 'marcas') return PRODUCTS;
  if (cat === 'ofertas') return PRODUCTS.filter(p => p.tag === 'sale' || p.comparePrice);
  return PRODUCTS.filter(p => p.cat === cat);
}

// Blog content
const BLOG_POSTS = [
  { id:'b1', title:'La rutina mínima que tu piel realmente necesita',
    excerpt:'Tres pasos honestos —limpiar, hidratar, proteger— que funcionan mejor que diez productos sin propósito.',
    cat:'Rutinas', date:'28 Abr 2026', read:'6 min', bg:'#C4A882' },
  { id:'b2', title:'Vitamina C: cómo elegirla según tu tipo de piel',
    excerpt:'No todos los séroms funcionan igual. Una guía clara entre derivados, concentraciones y combinaciones.',
    cat:'Ingredientes', date:'22 Abr 2026', read:'8 min', bg:'#8E7458' },
  { id:'b3', title:'Perfumes para el clima del Caribe: notas que respiran',
    excerpt:'Cítricos, salinos y maderas ligeras: aromas que sobreviven al sol venezolano sin volverse pesados.',
    cat:'Perfumería', date:'15 Abr 2026', read:'5 min', bg:'#1A150D' },
  { id:'b4', title:'Cómo construir un ritual nocturno de 10 minutos',
    excerpt:'Un protocolo simple para descansar mejor y despertar con la piel más calmada.',
    cat:'Rutinas', date:'08 Abr 2026', read:'7 min', bg:'#C5BAB0' },
  { id:'b5', title:'Niacinamida vs. Vitamina C: ¿Cuándo usar cada una?',
    excerpt:'Dos activos imprescindibles que conviven mejor de lo que se cree. Los mitos y las pruebas.',
    cat:'Ingredientes', date:'30 Mar 2026', read:'9 min', bg:'#7A8C6E' },
  { id:'b6', title:'Pieles latinas: la sensibilidad que pocos consideran',
    excerpt:'Por qué las fórmulas pensadas para climas templados pueden no servir aquí —y qué buscar en su lugar.',
    cat:'Educación', date:'18 Mar 2026', read:'10 min', bg:'#B8975A' },
];

// Sample favorites (initially empty). Stored in localStorage.
const ORDERS = [
  { id:'LUM-2026-0041', date:'12 Abr 2026', status:'Entregado', total:'$70.00', items:['Sérum Vitamina C','Hidratante SPF 30'] },
  { id:'LUM-2026-0028', date:'2 Mar 2026',  status:'Entregado', total:'$42.00', items:['Hyaluronic Acid 2% + B5'] },
  { id:'LUM-2026-0015', date:'18 Ene 2026', status:'Entregado', total:'$165.00',items:['Replica Beach Walk EDP'] },
];

const ADDRESSES = [
  { id:1, label:'Casa', name:'María González', address:'Av. Francisco de Miranda, Torre Delta, Piso 4, Apt 4B', city:'Caracas, Miranda', zip:'1060', phone:'+58 412-442-8894', default:true },
  { id:2, label:'Trabajo', name:'María González', address:'Centro Comercial El Recreo, Local 22', city:'Caracas, Miranda', zip:'1050', phone:'+58 412-442-8894', default:false },
];

Object.assign(window, { PRODUCTS, BRANDS, SUBCATS, SUBCAT_LABELS, BLOG_POSTS, ORDERS, ADDRESSES, productsFor });
