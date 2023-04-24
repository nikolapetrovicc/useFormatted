/*
	Potrebno je napraviti React hook za filtriranje, sortiranje i pretrazivanje podataka.
	Hook treba da prima array objekata odredjene strukture. U ovom slucaju koristimo array user-a iz users.json fajla.
	Hook treba da vraca formatirane podatke kao i funkcije za sortiranje, pretrazivanje i filtriranje.
  Omoguciti ulancano pozivanje implementiranih funkcija.
	
	Funkcija za pretrazivanje prima string i pretrazuje sve propertije na user objektu.
	Funkcija za filtriranje prima funkciju koju poziva za svaki entry u array-u.
	Funkcija za sortiranje moze da primi string (property name) po kojem treba da odradi standardni sort
	ili da primi funkciju za sortiranje (slicno kao i filter funkcija).

	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
	Koristiti React i TypeScript.

	Puno srece ;-)
*/

import { useEffect } from "react";
import users from "./data/users.json";
import { useFormattedData } from "./hooks/useFormattedData";

const App = () => {
  const { formatted, sortBy, filter, search } = useFormattedData(users);

  /**
   * Unutar ovog useEffect poziva bice proizvoljnim redom pozivane implementirane funkcije za
   * search, filter i sort da bi testirali tvoju implementaciju.
   */

  useEffect(() => {
    search("");
    filter(({ zip }) => zip > 200);
    sortBy("firstName");
  }, []);

  return (
    <div className="wrapper">
      <h1 className="title">Formatted data</h1>
      {formatted.length === 0 ? (
        <h6>There are no data that belong to this category</h6>
      ) : (
        <>
          {formatted.map(({ id, firstName, lastName, birthdate, email }) => (
            <div key={id} className="card">
              <div>
                <h5>
                  {firstName} {lastName}
                </h5>
                <h6>{email}</h6>
                <h6>{birthdate}</h6>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
