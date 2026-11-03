import type { Telefon } from "./types/Telefon";
import jsonData from '../public/phones.json';
import { useEffect, useState } from "react";

function App() {
  const [telefonok, setTelefonok] = useState<Telefon[]>([]);
  const [betoltes, setBetoltes] = useState<boolean>(true);
  const [novekvo, setNovekvo] = useState<boolean>(true);

  useEffect(() => {
    setBetoltes(true);
    setTelefonok(jsonData);
    setBetoltes(false);
  }, []);

  const rendezes = () => {
    const rendezett = [...telefonok].sort((a, b) => {
      return novekvo ? a.nev.localeCompare(b.nev) : b.nev.localeCompare(a.nev);
    });

    setTelefonok(rendezett);
    setNovekvo(!novekvo);
  };

  if (betoltes) {
    return <h2>Telefonok betöltése...</h2>;
  }

  return (
    <div className="container">
      <h1>Mobiltelefonok</h1>

      <button onClick={rendezes}>
        Rendezés név szerint: {novekvo ? "⬆️" : "⬇️"}
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Gyártó</th>
            <th>Ár</th>
            <th>Memória</th>
          </tr>
        </thead>

        <tbody>
          {telefonok.map((telefon) => (
            <tr key={telefon.id}>
              <td>{telefon.id}</td>
              <td>{telefon.nev}</td>
              <td>{telefon.gyarto}</td>
              <td>{telefon.ar.toLocaleString("hu-HU")} Ft</td>
              <td>{telefon.memoria} GB</td>
            </tr>
          ))}
        </tbody>
      </table>

      {telefonok.length === 0 && <p>Nincsenek megjeleníthető telefonok.</p>}
    </div>
  );
}

export default App;
