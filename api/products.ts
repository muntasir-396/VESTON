import { createClient } from '@supabase/supabase-js';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Double-Breasted Tailored Blazer Dress",
    price: 890.00,
    category: "Dresses, Outerwear",
    image: "/products/double-breasted-blazer-coat.jpg",
    description: "Architectural double-breasted long blazer coat dress with sharp peak lapels and structured masculine tailoring in pure virgin wool.",
    is_available: 1,
    color: "Charcoal",
    size: "XS,S,M,L"
  },
  {
    id: 2,
    name: "Tailored Single-Breasted Wool Overcoat",
    price: 720.00,
    category: "Outerwear",
    image: "/products/tailored-wool-overcoat.jpg",
    description: "Timeless single-breasted overcoat tailored from heavyweight wool with notch lapels, structured shoulders, and angled welt pockets.",
    is_available: 1,
    color: "Black",
    size: "S,M,L,XL"
  },
  {
    id: 3,
    name: "Laser-Print Denim Coach Jacket",
    price: 560.00,
    category: "Outerwear",
    image: "/products/laser-print-denim-coach-jacket.jpg",
    description: "Contemporary streetwear denim jacket featuring laser-etched allover monogram patterning, point collar, and matte silver snap closures.",
    is_available: 1,
    color: "Indigo",
    size: "S,M,L,XL"
  },
  {
    id: 4,
    name: "Reversible Monogram Nylon Tracktop",
    price: 490.00,
    category: "Outerwear",
    image: "/products/monogram-nylon-tracktop.jpg",
    description: "Sport-luxe technical windbreaker jacket engineered with lightweight water-resistant nylon and tonal allover monogram motif.",
    is_available: 1,
    color: "Navy",
    size: "S,M,L,XL"
  },
  {
    id: 5,
    name: "Textured Wool Knit Buttoned Cardigan",
    price: 360.00,
    category: "Knitwear",
    image: "/products/textured-knit-cardigan.jpg",
    description: "Artisanal melange textured knit jacket cardigan crafted from rich wool yarns, featuring a crew neckline and tonal horn buttons.",
    is_available: 1,
    color: "Brown",
    size: "S,M,L,XL"
  },
  {
    id: 6,
    name: "Fine Merino Wool Turtleneck Sweater",
    price: 290.00,
    category: "Knitwear",
    image: "/products/cashmere-ribbed-turtleneck.jpg",
    description: "Sleek second-skin fine-gauge merino wool turtleneck sweater with seamless tubular knit construction and refined ribbed cuffs.",
    is_available: 1,
    color: "Black",
    size: "S,M,L,XL"
  },
  {
    id: 7,
    name: "Straight-Leg Ecru Denim Trousers",
    price: 280.00,
    category: "Bottoms",
    image: "/products/straight-leg-ecru-denim.jpg",
    description: "Tailored straight-cut trousers constructed from heavyweight premium Japanese ecru denim with refined tonal stitching.",
    is_available: 1,
    color: "Ecru",
    size: "30,32,34,36"
  },
  {
    id: 8,
    name: "Monogram Printed Graphic T-Shirt",
    price: 240.00,
    category: "Tops",
    image: "/products/monogram-printed-tee.jpg",
    description: "Luxury relaxed-fit tee cut from heavyweight organic cotton jersey with signature heritage monogram graphics.",
    is_available: 1,
    color: "Navy",
    size: "S,M,L,XL,XXL"
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
