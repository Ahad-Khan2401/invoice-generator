import type { TemplateKey } from "@/lib/invoice-doc";

export const COLORS_FREE = [
  { hex:"#4f46e5",name:"Indigo"  }, { hex:"#0ea5e9",name:"Sky"    },
  { hex:"#10b981",name:"Emerald" }, { hex:"#f59e0b",name:"Amber"  },
  { hex:"#ef4444",name:"Red"     }, { hex:"#8b5cf6",name:"Violet" },
];
export const COLORS_PRO = [
  { hex:"#0f172a",name:"Slate"   }, { hex:"#7f1d1d",name:"Crimson"},
  { hex:"#14532d",name:"Forest"  }, { hex:"#1e3a5f",name:"Navy"   },
  { hex:"#713f12",name:"Brown"   }, { hex:"#4a044e",name:"Purple" },
  { hex:"#134e4a",name:"Teal"    }, { hex:"#1c1917",name:"Carbon" },
  { hex:"#831843",name:"Rose"    }, { hex:"#1e1b4b",name:"Ink"    },
  { hex:"#052e16",name:"Pine"    }, { hex:"#450a0a",name:"Maroon" },
];

export const TEMPLATE_META: { key: TemplateKey; name: string; desc: string; pro: boolean }[] = [
  { key:"classic", name:"Classic", desc:"Colour accents",   pro:false },
  { key:"minimal", name:"Minimal", desc:"Clean & elegant",  pro:true  },
  { key:"bold",    name:"Bold",    desc:"Colour header",    pro:true  },
];

export interface TplTokens {
  stripe: boolean; band: boolean;
  hPrimary: string; hSecondary: string; hTertiary: string; hValue: string;
  docTitle: string; docTitleSize: number;
  logoBg: string; logoColor: string; logoShadow: string;
  box: boolean;
  theadBg: string; thColor: string; thBorder: string;
  totalRule: string; totalColor: string;
}

/* Style tokens per template — the preview keeps ONE structure; only
   these values change, so the PDF (rendered from the same DOM) follows. */
export function tplTokens(t: TemplateKey, color: string): TplTokens {
  if (t === "minimal") return {
    stripe:false, band:false,
    hPrimary:"#0d1117", hSecondary:"#475569", hTertiary:"#64748b", hValue:"#334155",
    docTitle:"#0d1117", docTitleSize:20,
    logoBg:"#0d1117", logoColor:"#fff", logoShadow:"none",
    box:false,
    theadBg:"transparent", thColor:"#475569", thBorder:"1.5px solid #e2e8f0",
    totalRule:"2px solid #0d1117", totalColor:"#0d1117",
  };
  if (t === "bold") return {
    stripe:false, band:true,
    hPrimary:"#ffffff", hSecondary:"rgba(255,255,255,0.88)", hTertiary:"rgba(255,255,255,0.72)", hValue:"rgba(255,255,255,0.96)",
    docTitle:"rgba(255,255,255,0.42)", docTitleSize:26,
    logoBg:"rgba(255,255,255,0.95)", logoColor:color, logoShadow:"none",
    box:true,
    theadBg:color, thColor:"#ffffff", thBorder:"none",
    totalRule:`2px solid ${color}`, totalColor:color,
  };
  return { // classic — the original look
    stripe:true, band:false,
    hPrimary:"#0d1117", hSecondary:"#475569", hTertiary:"#64748b", hValue:"#334155",
    docTitle:"#e2e8f0", docTitleSize:28,
    logoBg:`linear-gradient(135deg,${color},${color}bb)`, logoColor:"#fff", logoShadow:`0 4px 12px ${color}35`,
    box:true,
    theadBg:`${color}0d`, thColor:color, thBorder:`2px solid ${color}22`,
    totalRule:`2px solid ${color}22`, totalColor:color,
  };
}

export const STATUS_CFG = {
  paid:   { label:"Paid",    color:"#15803d", bg:"#dcfce7", border:"#bbf7d0" },
  unpaid: { label:"Unpaid",  color:"#b45309", bg:"#fef3c7", border:"#fde68a" },
} as const;
