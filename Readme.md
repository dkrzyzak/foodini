## Projekt aplikacji do zamawiania jedzenia na przedmiot Techniki WWW

aby aplikacja działała poprawnie, należy:

0. Mieć zainstalowany pakiet node.js w wersji LTS przynajmniej v14
1. wykonać komendę `npm ci` w root folderze (instalacja paczek dla serwera node'a)
2. wykonać komendę `npm ci` w folderze `client` (instalacja paczek dla klienta reactowego)
3. utworzyć plik `.env` w root folderze i umieścić w nim następujące zmienne środowiskowe:
   -  `MONGO_URI` - uri do połączenia z bazą danych (do uzyskania od twórcy aplikacji)
   -  `MOCK_DELIVERY_TIME=true|false` - sterowanie tym czy czas dostawy ma być brany z faktycznych danych restauracji, czy ma być zamockowany (realizacja zamówienia trwa wtedy 3min)
   -  `API_PORT` - port na którym uruchomiony będzie serwer node'a, defaultowo będzie to 3030

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

Do wyeksportowania użyłem [narzędzi bazodanowych MongoDB](https://www.mongodb.com/try/download/database-tools) (wariant z paczką zip, aby nie musieć niczego instalować). Znajduje się w tej paczce kilka narzędzi, ale najistotniejsze narzędzia to `mongoexport.exe` oraz `mongoimport.exe` (dla systemów unixowych będą to prawdopodobnie zwykłe pliki wykonywalne bez windowsowego rozszerzenia).

Komenda używana do exportu to

```
.\mongoexport.exe --uri="URI" --collection="restaurants" --out="restaurants.json" --jsonArray --pretty
```

dla tego przykładu wyeksportowałem kolekcję `restaurants`, w zasadzie jedyny "must have" do późniejszego zaimportowania, bez którego nasza aplikacja nie będzie działać poprawnie (pozostałe kolekcje to `users`, `orders` oraz `addresses`, które są tworzone on the spot podczas używania aplikacji, ale wyeksportowałem je anyway).

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

Aplikacja Foodini służy do zamawiania jedzenia, działa na tej samej zasadzie, co popularne serwisy takie jak pyszne.pl czy Uber Eats

Aplikacja może być używana przez użytkowników istniejących w systemie (zalogowanych), oraz przez użytkowników niezalogowanych. Proces zakładania konta jest jednostronny, konta nie można usunąć lub zdezaktywować. Na dany adres e-mail może zostać założone tylko jedno konto.

Proces zamawiania jedzenia jest w pełni zgodny z bieżącymi standardami składania zamówień podczas zamawiania jedzenia online:

1. podajemy naszą lokalizację
2. dla naszej lokalizacji dostajemy listę restauracji funkcjonujących w tej okolicy
3. wybieramy konkretną restaurację
4. wybieramy w danej restauracji interesujące nas dania
5. jeśli wartość naszego koszyka przekroczy minimalną kwotę zamówienia, możemy przejść do dalszego etapu zamówienia
6. podajemy adres dostawy oraz telefon kontaktowy
7. przechodzimy przez bramkę płatniczą
8. zostajemy przekierowani na stronę śledzenia zamówienia

Teraz trochę więcej detali
Ad 1. Jest to sztuczny krok, nieważne jaką podamy lokalizację, dostaniemy taką samą listę restauracji. Wynika to z nieproporcjonalnie dużego nakładu pracy która musiałaby zostać wykonana żeby ta funkcjonalność nie była mockowa, względem efektu który w ten sposób zostałby uzyskany

Ad 2. W aplikacji mamy do dyspozycji 17 różnych restauracji. Dane dla restauracji zostały pozyskane na skutek inspiracji rzeczywistą listą restauracji w jednej z istniejących już usług do zamawiania jedzenia. Są to dane takie jak nazwa restauracji, logo oraz skrócone menu. Zbieżność danych z faktycznymi restauracjami jest czysto przypadkowa.

Ad 3. Wybór mogą ułatwić nam parametry takie jak minimalna kwota zamówienia, koszt dostawy, czas dostawy lub recenzje. Te parametry widnieją wyróżnione przy każdej pozycji z listy restauracji, możemy też po tych parametrach sortować.

Ad 4. W aplikacji funkcjonuje tylko jeden koszyk, którego stan jest zachowany dla bieżącej restauracji. Oznacza to tyle że

-  możemy złożyć zamówienie jednocześnie tylko w jednej restauracji
-  zmieniając restaurację z poziomu interfejsu, nasz koszyk jest resetowany

Ad 5. Warto zaznaczyć że możliwość składania zamówienia nie jest ograniczona tylko do użytkowników z utworzonym kontem w aplikacji. Można też złożyć zamówienie jako użytkownik niezalogowany i proces składania zamówienia będzie wyglądał dokładnie tak samo. Użytkownik zalogowany będzie miał jednak taką przewagę, że będzie mógł podejrzeć wszystkie złożone przez siebie zamówienia w dedykowanej zakładce na stronie.

Ad 6. Adres dostawy składa się z ulicy i numeru budynku, kodu pocztowego oraz miasta. Podane dane podlegają walidacji, muszą one spełnić określony format. Podobnie sprawa ma się z numerem telefonu. Jeśli adres będzie poprawny i użytkownik przejdzie dalej w procesie składania zamówienia, podany przez niego adres dostawy jest zapisywany

-  w ciasteczku, dla użytkownika niezalogowanego
-  w bazie danych, dla użytkownika zalogowanego

tak, aby podczas składania kolejnego zamówienia można było skorzystać z wprowadzonych wcześniej danych.

Ad 7. Bramka płatnicza jest kolejnym sztucznym krokiem, wystarczy że wprowadzimy poprawny w sensie syntaktycznym kod BLIK, a zamówienie zostanie przekazane do "realizacji".

Ad 8. Po złożeniu zamówienia jesteśmy przekierowani na adres do jego śledzenia. Adres ten jest osiągalny

-  przez wszystkich użytkowników (zalogowanych lub nie), jeśli zamówienie złożono jako niezalogowany
-  tylko przez użytkownika, który zamówienie złożył, jeśli dany użytkownik ma konto w serwisie

Realizacja zamówienia wygląda do złudzenia realistycznie, widzimy bieżący jego status oraz przewidywany czas dostawy (razem z informacją o zamówionych produktach oraz adresie dostawy). Dane te są zwracane na bieżąco przez API, które sprawdza moment złożenia zamówienia oraz przewidywany czas realizacji z parametrów restauracji i na tej podstawie zwraca gotowe dane do przeglądarki. Jeśli od złożenia zamówienia minęło więcej minut, niż górne widełki czasu realizacji, to zamówienie jest oznaczane jako zrealizowane. Dane o statusie nie są trzymane w bazie danych, są one generowane w momencie wykonywania zapytania.

Użytkownicy zalogowani mają wgląd do historii zamówień, osiągalnej z poziomu navbara, gdzie mogą podejrzeć szczegóły wszystkich złożonych przez siebie zamówień.
