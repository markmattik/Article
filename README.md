# Artiklite Haldussüsteem

Täisfunktsionaalne veebirakendus, mis võimaldab kasutajatel registreeruda, sisse logida, artikleid lisada, kommenteerida ja sisu hallata vastavalt nende rollile (kasutaja/admin). Projekt koosneb frontendist (React) ja backendist (Express + SQLite + Sequelize ORM).

## Funktsioonid

### Autentimine ja autoriseerimine
- Kasutajate registreerimine ja sisselogimine JWT abil
- Rollipõhine juurdepääs (tavaline kasutaja / admin)

### Artiklid
- Kõik kasutajad saavad vaadata artikleid
- Autentitud kasutajad saavad lisada uusi artikleid
- Artikli autor saab seda kustutada ja muuta

### Kommentaarid
- Kõik kasutajad näevad kommentaare
- Autentitud kasutajad saavad lisada kommentaare
- Kasutajad saavad kustutada/muuta vaid enda kommentaare

### Admini erifunktsioonid
- Admin saab kustutada ükskõik millise kommentaari või artikli

## Tehnoloogiad

**Frontend**
- React
- Axios
- Bootstrap (UI)

**Backend**
- Node.js
- Express.js
- Sequelize ORM
- SQLite (kohalik andmebaas)
- JWT (autentimiseks)
- Bcrypt (paroolide krüpteerimiseks)

## Paigaldusjuhised

1. Klooni

  git clone https://github.com/markmattik/Article.git
  
  cd Article

2. Install server

  cd article-management
  npm install

3. Andmebaasi seadistamine

  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all

4. Backend start

  npm start


5. Frontend start

cd article-app
npm install
npm start



