# GameTracker

Mobilní aplikace pro prohlížení videoher a správu oblíbených her, vytvořená v Ionic Standalone s Angular.

## 🚀 Funkce

- **Dashboard (Home)**: 
  - Novinky - nejnověji vydané hry
  - Platformy - filtrování her podle platformy (PC, Xbox, PlayStation, Switch)
  - Žánry - prohlížení her podle žánru (Action, RPG, Adventure, atd.)
  - Vyhledávání her podle názvu
- **Trending**: 
  - Top Rated - hry s nejvyšším hodnocením
  - Popular - populární hry
- **Detail hry**: Zobrazení detailních informací o hře (název, obrázek, popis, rating)
- **Oblíbené hry**: Ukládání a správa oblíbených her v lokálním úložišti
- **Dark Mode**: Moderní tmavý design
- **Navigace**: Spodní navigační menu pro snadný přístup mezi sekcemi

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
npm run android:build
```

Tento příkaz automaticky:
- Zkompiluje webovou aplikaci (`npm run build`)
- Zkopíruje assets do Android projektu
- Synchronizuje změny s Capacitor (`npx cap sync android`)

3. Otevřete projekt v Android Studio:
```bash
npm run cap:open
```

Nebo přímo:
```bash
npx cap open android
```

4. V Android Studio:
   - Počkejte, až se projekt načte a synchronizuje (Gradle sync)
   - Připojte Android zařízení nebo spusťte emulátor
   - Klikněte na tlačítko "Run" (▶️) nebo stiskněte Shift+F10
   - Aplikace se zkompiluje a spustí na zařízení/emulátoru

5. Pro generování debug APK:
   - V Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - APK najdete v: `android/app/build/outputs/apk/debug/app-debug.apk`

**Poznámka:** Ujistěte se, že máte nainstalované:
- Android Studio
- Android SDK (minimálně API 21)
- Java JDK

## 🏗️ Struktura projektu

```
src/
├── app/              # Hlavní app komponenta a routing
├── models/           # TypeScript modely (Game, Genre, Platform)
├── pages/            # Stránky aplikace
│   ├── home/         # Dashboard s novinkami, platformami a žánry
│   ├── detail/       # Detail hry
│   ├── favorites/    # Oblíbené hry
│   └── trending/     # Trending stránka (Top Rated, Popular)
├── services/         # Služby (GameService, StorageService)
├── theme/            # Témata a proměnné
└── assets/           # Statické soubory (logo, obrázky)
```

## 🛠️ Technologie

- **Ionic 7** - UI framework
- **Angular 17** - Framework
- **TypeScript** - Programovací jazyk
- **Capacitor 8** - Native runtime pro mobilní aplikace
- **RAWG API** - REST API pro videohry
- **LocalStorage** - Lokální perzistentní úložiště
- **RxJS** - Reaktivní programování

## 📝 Poznámky

- Aplikace používá RAWG API, které vyžaduje bezplatný API klíč
- Oblíbené hry jsou ukládány lokálně v prohlížeči/zařízení pomocí LocalStorage
- Aplikace je optimalizována pro Android, ale funguje i v prohlížeči
- Design aplikace je v dark mode pro lepší uživatelský zážitek
- Logo aplikace je umístěno v `src/assets/logo.png` a automaticky se zkopíruje do Android projektu při build
- Pro aktualizaci ikony aplikace na Androidu je potřeba aplikaci odinstalovat a nainstalovat znovu

## 📄 Licence

MIT

