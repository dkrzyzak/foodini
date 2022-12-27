## Projekt aplikacji do zamawiania jedzenia na przedmiot Techniki WWW

aby aplikacja działała poprawnie, należy wykonać komendę `npm ci` w root folderze oraz w folderze `client`,
oraz utworzyć plik `.env` w root folderze i umieścić w nim następujące zmienne środowiskowe:

-  `MONGO_URI` - uri do połączenia z bazą danych
-  `MOCK_DELIVERY_TIME=true|false` - sterowanie tym czy czas dostawy ma być brany z faktycznych danych restauracji, czy ma być zamockowany (realizacja zamówienia trwa wtedy 3min)
-  `API_PORT` - na którym uruchomiony będzie serwer node'a, defaultowo będzie to 3030
