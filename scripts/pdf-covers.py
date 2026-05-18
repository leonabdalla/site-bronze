"""
Render the first page of each catalog PDF as a high-quality JPG cover,
plus extract first-pass text so we can audit content the website misses.
Run: python scripts/pdf-covers.py
"""

import fitz  # PyMuPDF
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESOURCES = ROOT / "resources"
COVERS = ROOT / "public" / "images" / "catalogs"
DUMP = ROOT / "scripts" / "_pdf_text"

# slug → PDF filename
PDFS = {
    "aco":         "BM-21-Aco.pdf",
    "manutencao":  "BM-21-Manutencao.pdf",
    "metais":      "BM-21-Metais.pdf",
    "pistao":      "BM-21-Pistao.pdf",
    "plastico":    "BM-21-Plastico.pdf",
    "solda":       "BM-21-Solda.pdf",
    "geral":       "Catalogo-Geral.pdf",
}

# Some catalogs may have a logo-only page 1; preview page choice per slug.
PREVIEW_PAGE = {
    "aco": 0, "manutencao": 0, "metais": 0, "pistao": 0,
    "plastico": 0, "solda": 0, "geral": 0,
}

def render_cover(pdf_path: Path, out_path: Path, page_idx: int = 0, zoom: float = 3.0):
    doc = fitz.open(pdf_path)
    page = doc.load_page(page_idx)
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pix.save(out_path, jpg_quality=92)
    doc.close()
    return out_path, pix.width, pix.height

def dump_text(pdf_path: Path, out_path: Path):
    doc = fitz.open(pdf_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8") as f:
        f.write(f"# {pdf_path.name} ({doc.page_count} pages)\n\n")
        for i, page in enumerate(doc):
            text = page.get_text("text").strip()
            f.write(f"\n## Page {i+1}\n\n{text}\n")
    doc.close()

def main():
    print(f"Resources: {RESOURCES}")
    print(f"Covers out: {COVERS}\n")
    for slug, name in PDFS.items():
        pdf = RESOURCES / name
        if not pdf.exists():
            print(f"miss  {name}")
            continue
        cover = COVERS / f"{slug}.jpg"
        page_idx = PREVIEW_PAGE.get(slug, 0)
        path, w, h = render_cover(pdf, cover, page_idx=page_idx, zoom=3.0)
        dump_text(pdf, DUMP / f"{slug}.txt")
        print(f"ok    {cover.relative_to(ROOT)}  {w}x{h}")
    print(f"\nText dumps -> {DUMP.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
