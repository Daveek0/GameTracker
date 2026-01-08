# GameTracker

Mobilní aplikace pro prohlížení videoher a správu oblíbených her, vytvořená v Ionic Standalone s Angular.

## 🚀 Funkce

- **Seznam her**: Prohlížení videoher z RAWG API
- **Vyhledávání**: Vyhledávání her podle názvu
- **Detail hry**: Zobrazení detailních informací o hře
- **Oblíbené hry**: Ukládání a správa oblíbených her v lokálním úložišti
- **Navigace**: Spodní navigační menu pro snadný přístup

## 📋 Požadavky

- Node.js (v18 nebo vyšší)
- npm nebo yarn
- Ionic CLI (volitelné, pro build na Android)

## 🔧 Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Získejte API klíč z [RAWG API](https://rawg.io/apidocs) a vložte ho do `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  rawgApiKey: 'VÁŠ_API_KLÍČ'
};
```

   Pro produkční build upravte také `src/environments/environment.prod.ts`.

## 🏃 Spuštění

Pro vývoj:
```bash
npm start
```

Aplikace bude dostupná na `http://localhost:4200`

## 📱 Build pro Android

1. Přidejte Android platformu (pokud ještě není):
```bash
npm install -g @ionic/cli
ionic capacitor add android
```

2. Sestavte webovou aplikaci a synchronizujte s Android projektem:
```bash
npm run build
npm run cap:sync
```

Nebo použijte zkrácený příkaz:
```bash
npm run android:build
```

3. Otevřete projekt v Android Studio:
```bash
npm run cap:open
```

Nebo přímo:
```bash
npx cap open android
```

4. V Android Studio:
   - Počkejte, až se projekt načte a synchronizuje
   - Připojte Android zařízení nebo spusťte emulátor
   - Klikněte na tlačítko "Run" (▶️) nebo stiskněte Shift+F10
   - Aplikace se zkompiluje a spustí na zařízení/emulátoru

**Poznámka:** Ujistěte se, že máte nainstalované:
- Android Studio
- Android SDK (minimálně API 21)
- Java JDK

## 🏗️ Struktura projektu

```
src/
├── app/              # Hlavní app komponenta a routing
├── models/           # TypeScript modely (Game)
├── pages/            # Stránky aplikace
│   ├── home/         # Seznam her
│   ├── detail/       # Detail hry
│   └── favorites/    # Oblíbené hry
├── services/         # Služby (API, Storage)
├── theme/            # Témata a proměnné
└── assets/           # Statické soubory
```

## 🛠️ Technologie

- **Ionic 7** - UI framework
- **Angular 17** - Framework
- **TypeScript** - Programovací jazyk
- **RAWG API** - REST API pro videohry
- **LocalStorage** - Lokální perzistentní úložiště

## 📝 Poznámky

- Aplikace používá RAWG API, které vyžaduje bezplatný API klíč
- Oblíbené hry jsou ukládány lokálně v prohlížeči/zařízení
- Aplikace je optimalizována pro Android, ale funguje i v prohlížeči

## 📄 Licence

MIT

