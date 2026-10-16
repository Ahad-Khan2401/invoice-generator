"use client";
import { useEffect, useRef, useState } from "react";
import { Users, Save, ChevronDown } from "lucide-react";
import type { Party } from "@/lib/invoice-doc";

export interface ClientRow { id: string; name: string; email: string; phone: string; address: string }

/* ───────────────────────────────────────────────
   Client directory picker (signed-in users). Lists saved clients,
   fills the Bill-To block on pick, and saves the current client.
─────────────────────────────────────────────── */
export default function ClientPicker({
  clients, current, accent, limit, onPick, onSave, saving, locked, onUpgrade,
}: {
  clients: ClientRow[];
  current: Party;
  accent: string;
  limit: number | null;
  onPick: (c: ClientRow) => void;
  onSave: () => Promise<"saved" | "limit" | "error">;
  saving: boolean;
  locked: boolean;
  onUpgrade: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);

  const canSave = current.name.trim().length > 0 && !saving;
  const alreadySaved = clients.some((c) => c.name.toLowerCase() === current.name.trim().toLowerCase()
    && c.email === current.email && c.phone === current.phone && c.address === current.address);

  async function save() {
    if (locked) { onUpgrade(); return; }
    const r = await onSave();
    setMsg(r === "saved" ? "Client saved" : r === "limit" ? `Free plan holds ${limit} clients — upgrade for unlimited` : "Couldn't save — try again");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <div ref={ref} className="ig-clientpicker">
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <button type="button" className="ig-chip" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} disabled={!clients.length}
          title={clients.length ? "Pick a saved client" : "No saved clients yet"}>
          <Users size={11} aria-hidden="true" /> {clients.length ? `Saved clients (${clients.length})` : "No saved clients yet"} {clients.length > 0 && <ChevronDown size={11} aria-hidden="true" />}
        </button>
        <button type="button" className="ig-chip" onClick={save} disabled={!canSave || alreadySaved}
          style={alreadySaved ? { opacity: 0.6 } : undefined} title={alreadySaved ? "This client is already saved" : "Save this client to your directory"}>
          <Save size={11} aria-hidden="true" /> {alreadySaved ? "Client saved" : saving ? "Saving…" : "Save client"}
        </button>
        {msg && <span role="status" style={{ fontSize: 11, color: "#475569" }}>{msg}</span>}
      </div>
      {open && clients.length > 0 && (
        <ul role="listbox" aria-label="Saved clients" className="ig-clientlist">
          {clients.map((c) => (
            <li key={c.id} role="option" aria-selected={c.name === current.name}>
              <button type="button" onClick={() => { onPick(c); setOpen(false); }} style={{ ["--accent" as string]: accent }}>
                <span style={{ fontWeight: 700, color: "#0d1117" }}>{c.name}</span>
                {c.email && <span style={{ color: "#64748b", fontSize: 11.5 }}> · {c.email}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
