import { createClient } from '@supabase/supabase-js';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Silk Slip Dress",
    price: 289.00,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist mulberry silk slip dress with a fluid, liquid-like drape and delicate adjustable straps.",
    is_available: 1,
    color: "Champagne",
    size: "XS,S,M,L"
  },
  {
    id: 2,
    name: "Velvet Gala Evening Gown",
    price: 590.00,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "Floor-sweeping midnight emerald velvet evening gown featuring sculptural shoulders and a subtle side slit.",
    is_available: 1,
    color: "Emerald",
    size: "S,M,L"
  },
  {
    id: 3,
    name: "Pleated Asymmetric Midi Dress",
    price: 345.00,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "Architectural sunray pleating with an asymmetric hemline, cut from lightweight Japanese chiffon in deep noir.",
    is_available: 1,
    color: "Black",
    size: "XS,S,M,L"
  },
  {
    id: 4,
    name: "Draped Satin Backless Gown",
    price: 480.00,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
    description: "Sensual cowl neckline and dramatic low-back silhouette tailored in pure heavyweight silk satin.",
    is_available: 1,
    color: "Ruby",
    size: "XS,S,M,L"
  },
  {
    id: 5,
    name: "Structured Column Crepe Dress",
    price: 380.00,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description: "Modern minimalist column silhouette crafted from bonded Italian stretch crepe with clean tailored lines.",
    is_available: 1,
    color: "Ivory",
    size: "S,M,L,XL"
  },
  {
    id: 6,
    name: "Midnight Velvet Blazer",
    price: 449.99,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    description: "Tailored to perfection, this velvet blazer exudes timeless evening sophistication with silk peak lapels.",
    is_available: 1,
    color: "Black",
    size: "S,M,L,XL"
  },
  {
    id: 7,
    name: "Double-Breasted Wool Trench",
    price: 680.00,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
    description: "Iconic tailored outerwear crafted in pure double-faced cashmere wool with horned buttons and belted waist.",
    is_available: 1,
    color: "Camel",
    size: "S,M,L,XL"
  },
  {
    id: 8,
    name: "Cashmere Turtleneck",
    price: 359.50,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-fine Italian cashmere for unparalleled warmth, lightness, and extraordinary softness.",
    is_available: 1,
    color: "Camel",
    size: "S,M,L,XL"
  },
  {
    id: 9,
    name: "Chunky Ribbed Wool Cardigan",
    price: 295.00,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
    description: "Oversized chunky rib-knit sweater made from ethically sourced pure merino wool.",
    is_available: 1,
    color: "Cream",
    size: "XS,S,M,L"
  },
  {
    id: 10,
    name: "Tailored Wool Trousers",
    price: 229.00,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    description: "Precision-cut tailored trousers in breathable virgin wool with sharp front pressed creases.",
    is_available: 1,
    color: "Grey",
    size: "30,32,34,36"
  },
  {
    id: 11,
    name: "Wide-Leg Pleated Palazzos",
    price: 270.00,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    description: "Fluid high-waisted trousers with razor pleats, slash pockets, and elegant drape.",
    is_available: 1,
    color: "Black",
    size: "28,30,32,34"
  },
  {
    id: 12,
    name: "Leather Chelsea Boots",
    price: 510.00,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
    description: "Handcrafted Italian leather boots with a sleek almond toe and Goodyear-welted soles.",
    is_available: 1,
    color: "Tobacco",
    size: "8,9,10,11,12"
  },
  {
    id: 13,
    name: "Pointed Ankle Strap Stilettos",
    price: 430.00,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    description: "Refined patent calfskin pumps with delicate adjustable ankle straps and sculptural 90mm heels.",
    is_available: 1,
    color: "Black",
    size: "36,37,38,39,40"
  },
  {
    id: 14,
    name: "Oversized Linen Shirt",
    price: 189.00,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    description: "Relaxed-fit shirt crafted from high-grade European washed linen with mother-of-pearl buttons.",
    is_available: 1,
    color: "White",
    size: "S,M,L,XL,XXL"
  },
  {
    id: 15,
    name: "Silk Lavallière Blouse",
    price: 265.00,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
    description: "Elegantly tailored silk crepe de chine blouse with detachable pussy-bow tie and gathered cuffs.",
    is_available: 1,
    color: "Pearl",
    size: "XS,S,M,L"
  }
];

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('products').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((p: any) => ({
          ...p,
          sizeChart: p.size_chart ? (typeof p.size_chart === 'string' ? JSON.parse(p.size_chart) : p.size_chart) : undefined,
          is_available: p.is_available === 1 || p.is_available === true || p.is_available == null
        }));
        return res.status(200).json(formatted);
      }
    } catch (e) {
      // Fall through to default products
    }
  }

  return res.status(200).json(DEFAULT_PRODUCTS);
}
