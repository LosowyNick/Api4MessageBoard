## Zasady zaliczenia przedmiotu

Ostateczny termin zaliczenia: 25.06.2023 (ostatni zjazd)

Sposób zaliczenia:
- przygotowujesz implementacje wybranych przez siebie funkcji
- w razie wątpliwości kontaktujesz się ze mną za pomocą Slack, email
- umawiasz się na termin zaliczenia poprzez https://calendly.com/pawel-lukaszuk-jsd/nodejs
- przesyłasz mi rozwiązania poprzez email, Slack lub dajesz dostęp do prywatnego repozytorium (strona repozytorium -> Settings -> Collaborators -> Add People -> pawellukaszuk)
- wspólnie omawiamy przygotowane rozwiązania: zdzwaniamy się przez Teams, meet.jit.si, zoom.us itp (konieczne będzie udostępniania ekranu)

Skala ocen:
- 0-8 pkt &rarr; 2
- 9-12 pkt &rarr; 3
- 13-16 pkt &rarr; 3.5
- 17-20 pkt &rarr; 4
- 21-24 pkt &rarr; 4.5
- 25 i więcej pkt &rarr; 5

### **Uwagi**
1. Możesz użyć dowolnej wersji Node.js $\ge$ 16.
2. Możesz użyć dowolnego modułu `npm`
3. Zadanie 0 i 4 są konieczne do zaliczenia bez wzaględu na zgromadzoną liczbę punktów.

## Cel biznesowy

Celem projektu jest stworzenie aplikacji pozwalającej na zarządzanie ogłoszeniami online - tablica ogłoszeń.

Każde ogłoszenie ma:
- tytuł
- opis
- autora
- kategorię (jedną)
- tagi (jeden lub więcej)
- cenę
- ... (miejsce na Twoje pomysły, najlepsze będą punktowane dodatkowo)

Interfejs graficzny nie jest wymagany. Funkcjonalność będzie sprawdzona przy pomocy Postmana. Należy pamiętać o obsłudze błędów, nazewnictwie endpointów, obsłudze metod HTTP oraz zwracanych kodów odpowiedzi HTTP.

Lista funkcji:

0. DONE - Aplikacja jest udokumentowana za pomocą Postmana - kolekcją zawierającą przykłady żądań do wszystkich przygotowanych funkcji.

1. DONE - [1 punkt] Port z którego korzysta aplikacja powinien być ustawiany za pomocą zmiennych środowiskowych.

2. DONE - [1 punkt] Na żądania wysłane pod adres `/heartbeat` aplikacja odpowiada zwracając aktualną datę i godzinę.

3. DONE - [1 punkt] Aplikacja umożliwia dodawanie ogłoszenia.

4. DONE - [1 punkt] Aplikacja umożliwia zwracanie pojedynczego ogłoszenia. W zależności od nagłówka żądania `Accept` dane są zwracane w odpowiednim formacie (przykładowe nagłówki: `text/plain`, `text/html`, `application/json`). Można wykorzystać funkcję `Express` `res.format()`.

5. DONE - [1 punkt] Aplikacja umożliwia zwracanie wszystkich ogłoszeń.

6. DONE - [1 punkt] Aplikacja umożliwia usuwanie wybranego ogłoszenia.

7. DONE - [1 punkt] Aplikacja umożliwia modyfikowanie wybranego ogłoszenia.

8. DONE - [1 punkt za każde kryterium wyszukiwania/maksymalnie 5 punktów] Aplikacja pozwala na wyszukiwanie ogłoszeń według różnych kryteriów (tytuł, opis, zakres dat, zakres cen itp).

9. DONE - [4-8 punktów] Aplikacja zapisuje ogłoszenia w bazie danych [max 8 punktów] lub plikach [max 4 punkty].

10. DONE - [2 punkty] Usuwanie i modyfikowanie ogłoszeń jest zabezpieczone hasłem, przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP. Nie jest wymagane zabezpieczenie na poziomie *produkcyjnym*, raczej podstawowe rozwiązanie (za wyjątkowo dobre rozwiązania możliwe dodatkowe punkty).

11. DONE - [4 punkty] Aplikacja ma 3 zdefiniowanych na stałe użytkowników. Każdy z nich może usuwać i modyfikować tylko te ogłoszenia które sam dodał> Przy braku uprawnień do wykonania operacji, zwracany jest stosowny komunikat i kod odpowiedzi HTTP.

12. DONE - [3 punkty] Po uruchomieniu z parametrem `debug` (np `node app.js debug`) aplikacja zapisuje w pliku tekstowym czas odebrania każdego żądania, metodę HTTP oraz adres na który przyszło żądanie.

13. DONE - [2 punkty] Po odebraniu żądania wysłanego na adres który nie istnieje, aplikacja powinna zwracać statyczny obrazek zamiast domyślnej strony błędu 404.

14. PENDING - [2 punkty] W przypadku wystąpienia błędów aplikacji, szczegóły błędu wyświetlane są za pomocą console.log a klient dostaje stosowny komunikat i kod odpowiedzi HTTP.

### Edited
##### Passy użytkowników testowych:
_id: ObjectId(6469cfaae7387437e5cbedbc),
name: "Mirek",
login: "mirek2000",
password: "qwerty123"

_id: ObjectId(6469d03c8a02e9dee1fc23d1),
name: "Patryk",
login: "patryk2000",
password: "qwerty111"

_id:  ObjectId(6469d0698a02e9dee1fc23d2),
name: "Iwona",
login: "iwona2000",
password: "111qwerty"

### Edited - wywołanie apki z logowaniem requestów
node app.js --debug