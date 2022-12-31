## Projekt aplikacji do zamawiania jedzenia na przedmiot Techniki WWW

aby aplikacja działała poprawnie, należy:

0. Mieć zainstalowany pakiet node.js w wersji LTS przynajmniej v14
1. wykonać komendę `npm ci` w root folderze (instalacja paczek dla serwera node'a)
2. wykonać komendę `npm ci` w folderze `client` (instalacja paczek dla klienta reactowego)
3. utworzyć plik `.env` w root folderze i umieścić w nim następujące zmienne środowiskowe:
   -  `MONGO_URI` - uri do połączenia z bazą danych (do uzyskania od twórcy aplikacji)
   -  `MOCK_DELIVERY_TIME=true|false` - sterowanie tym czy czas dostawy ma być brany z faktycznych danych restauracji, czy ma być zamockowany (realizacja zamówienia trwa wtedy 3min)
   -  `API_PORT` - na którym uruchomiony będzie serwer node'a, defaultowo będzie to 3030

format wygodny do skopiowania:

```
[plik .env]

MONGO_URI=placeholder
API_PORT=3030
MOCK_DELIVERY_TIME=false
```

Oprócz tego, potrzebujemy też mieć dostęp do bazy danych, z której aplikacja będzie korzystać. Ja podczas tworzenia aplikacji korzystałem z platformy [MongoDB Cloud Services](https://cloud.mongodb.com), aby nie musieć stawiać bazy lokalnie. Na prośbę mogę udostępnić URI do połączenia z ową bazą, ale oczywiście istnieje też możliwość odtworzenia tej bazy lokalnie z plików `.json`, które umieściłem w folderze `mongodb_collections`. Więcej na ten temat w punkcie poniżej.

Jeśli chodzi o schematy danych użyte do konkretnych kolekcji, to można je wywnioskować z plików json, albo podejrzeć zawartość pliku `server/mongo.js`, gdzie są zmapowane wszystkie schemy.

## Odtwarzanie bazy danych

Jak wspomniałem, podczas developmentu korzystałem z darmowych usług oferowanych przez MongoDB Cloud Services. Wszystkie kolekcje użyte w aplikacji zostały też jednak przeze mnie wyeksportowane do plików `.json` w formacie `nazwa_kolekcji.json` i można je znaleźć w folderze `mongodb_collections`.

Do wyeksportowania użyłem [narzędzia bazodanowych MongoDB](https://www.mongodb.com/try/download/database-tools) (wariant z paczką zip, aby nie musieć niczego instalować). Znajduje się w tej paczce kilka narzędzi, ale najistotniejsze narzędzia to `mongoexport.exe` oraz `mongoimport.exe` (dla systemów unixowych będą to prawdopodobnie zwykłe pliki wykonywalne bez windowsowego rozszerzenia).

Komenda używana do exportu to

```
.\mongoexport.exe --uri="URI" --collection="restaurants" --out="restaurants.json" --jsonArray --pretty
```

dla tego przykładu wyeksportowałem kolekcję `restaurants`, w zasadzie jedyny "must have" do późniejszego zaimportowania, bez którego nasza aplikacja nie będzie działać poprawnie (pozostałe kolekcje to `users`, `orders` oraz `addresses`), które są tworzone on the spot podczas używania aplikacji, ale wyeksportowałem je anyway.

Teraz, aby zaimportować tą kolekcję do lokalnej bazy mongodb, musimy skorzystać z narzędzia `mongoimport`, wykonując następujące polecenie:

```
.\mongoimport.exe --host="127.0.0.1" --port=DB_PORT --db="dbname" --collection="restaurants" --file="restaurants.json"
```

podmieniając `DB_PORT` na port na którym działa lokalnie mongodb oraz `dbname` na nazwę bazy danych dedykowanej dla mojej aplikacji.

po zaimportowaniu wszystkich baz, należy następnie zmienić w pliku `.env` zmienną `MONGO_URI` na
`mongodb+srv://[login]:[password]@[127.0.0.1]:[PORT]/[dbname]?retryWrites=true&w=majority`

\*\* możliwe że to nie jest idealny URI i trzeba w nim coś jeszcze poprawić, ale szkicowo tak by to mniej więcej wyglądało

<hr />

## Krótka dokumentacja funkcjonalna (WIP):

W aplikacji mamy do dyspozycji 17 różnych restauracji. Są to oczywiście zamockowane dane.

Aplikacja może być używana przez użytkowników istniejących w systemie (zalogowanych), oraz przez użytkowników niezalogowanych.
