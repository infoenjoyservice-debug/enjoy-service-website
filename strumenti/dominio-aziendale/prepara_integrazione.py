#!/usr/bin/env python3
"""Prepara una patch per un sito statico esportato; non modifica gli originali."""
import argparse
import re
import zipfile
from pathlib import Path
from urllib.parse import urlsplit

OLD = 'enjoy-service-cinisello-balsamo.netlify.app'
PATTERN = re.compile(r'(?:https?:)?//' + re.escape(OLD) + r'(?=[/\s\"\'<>?#]|$)', re.I)

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--sito', required=True, help='Cartella esportata con index.html')
    p.add_argument('--dominio', required=True, help='Dominio acquistato e collegato, senza www se non principale')
    p.add_argument('--https-verificato', action='store_true', help='Conferma verifica manuale del nuovo sito HTTPS')
    p.add_argument('--output', default='Enjoy_Service_PATCH_Dominio.zip')
    a = p.parse_args()
    raw = a.dominio.strip().rstrip('/')
    u = urlsplit(raw if '://' in raw else 'https://' + raw)
    host = u.hostname or ''
    if (u.scheme != 'https' or u.path or u.query or u.fragment or u.username or u.password
        or u.netloc != host or not re.fullmatch(r'(?=.{4,253}$)[a-z0-9]+(?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,63}', host)
        or any(not label or len(label) > 63 or label.startswith('-') or label.endswith('-') for label in host.split('.'))
        or host.endswith(('.netlify.app', '.example', '.invalid')) or host in {'example.com', 'dominio.it', 'tuodominio.it'}):
        p.error('Inserisci il dominio aziendale reale in HTTPS, senza percorsi, porta o parametri.')
    if not a.https_verificato:
        p.error('Prima collega il dominio e verifica HTTPS e pagine; poi aggiungi --https-verificato.')
    root = Path(a.sito).resolve()
    if not (root / 'index.html').is_file():
        p.error('La cartella deve contenere index.html alla radice. Usa una copia completa del sito pubblicato.')
    if any(root.rglob('*.php')):
        p.error('Questo configuratore supporta solo siti statici HTML.')
    target = 'https://' + host
    changed = {}
    for f in sorted(root.rglob('*')):
        if f.is_symlink():
            p.error('Rimuovi i collegamenti simbolici dalla copia prima di procedere.')
        if not f.is_file() or f.suffix.lower() not in {'.html', '.htm', '.xml', '.txt', '.json', '.webmanifest'}:
            continue
        old = f.read_text(encoding='utf-8')
        new = PATTERN.sub(target, old)
        if new != old:
            changed[f.relative_to(root).as_posix()] = new
    redirect_file = root / '_redirects'
    previous = redirect_file.read_text(encoding='utf-8') if redirect_file.exists() else ''
    # Una configurazione precedente verso Netlify puo creare un ciclo: fermarsi.
    configs = [previous]
    if (root / 'netlify.toml').exists():
        configs.append((root / 'netlify.toml').read_text(encoding='utf-8'))
    for config in configs:
        for line in config.splitlines():
            s = line.strip()
            if s and not s.startswith('#') and OLD in s:
                p.error('Configurazione redirect precedente riferita a Netlify: richiede controllo manuale prima di generare la patch.')
    rules = '\n'.join(f'{scheme}://{OLD}/* {target}/:splat 301!' for scheme in ('https', 'http'))
    changed['_redirects'] = '# Enjoy Service: dominio principale, percorsi conservati\n' + rules + '\n\n' + previous
    report = ('PATCH INTEGRATIVA — NON E UN SITO COMPLETO\n\n'
              f'Dominio di destinazione: {target}\n'
              'File da integrare nella copia COMPLETA del sito:\n' + '\n'.join(changed) + '\n\n'
              '1. Conservare un backup e il deploy precedente.\n'
              '2. Estrarre questa patch sopra una copia completa del sito, confermando le sostituzioni.\n'
              '3. Pubblicare la cartella completa risultante, non questa patch da sola.\n'
              '4. Verificare che ogni vecchio URL raggiunga la stessa pagina sul nuovo dominio, senza cicli.\n'
              '5. Controllare canonical, sitemap, robots.txt e link social; verificare eventuali URL in JS/CSS.\n'
              '6. Aggiornare Google Business Profile, directory e Search Console manualmente.\n\n'
              'Il programma sostituisce soltanto il vecchio host nei file testuali supportati.\n'
              'Non aggiunge canonical mancanti, non crea sitemap mancanti, non modifica JS/CSS,\n'
              'non modifica netlify.toml, non compra domini e non esegue verifiche online.\n'
              'Canonical relativi, altri domini, funzioni e regole personalizzate richiedono controllo.\n')
    out = Path(a.output).resolve()
    if out.exists():
        p.error('Il file di output esiste gia: scegli un altro nome.')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, content in changed.items():
            z.writestr(name, content)
        z.writestr('LEGGIMI_PATCH.txt', report)
    print(f'Creata: {out}\nFile da integrare: {len(changed)}. Gli originali non sono stati modificati.')

if __name__ == '__main__':
    main()
