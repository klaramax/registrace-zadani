import React, { useState, useEffect } from 'react';
import './Registration.css'; 

//Definování funkční komponenty Registration
const Registration: React.FC = () => {
  // Definování stavu 'user' a funkce 'setUser' pro jeho aktualizaci
  // 'useState' inicializuje stav s objektem obsahujícím prázdné řetězce
  const [user, setUser] = useState({
    username: '', // Nastavení počátečních hodnot jako prázdných řetězců 
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // Funkce handleChange je volána při každé změně ve vstupních polích formuláře.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Aktualizace stavu user
    setUser({
      ...user, // Zkopíruje všechny současné hodnoty ve stavu user
      [name]: value, // Nastaví hodnotu pole, které bylo změněno
    });
  };

  // useEffect hook se spustí při každé změně hodnoty user.email
  useEffect(() => {
    // Kontrola, zda email obsahuje znak '@' a username je prázdný
    if (user.email.includes('@') && !user.username) {
      const username = user.email.split('@')[0];
      // Aktualizace stavu user s novým username
      setUser((prevState) => ({
        ...prevState,
        username: username,
      }));
    }
  }, [user.email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Zastaví výchozí chování formuláře

    // Kontrola, zda hesla a potvrzení hesla jsou stejné
    if (user.password !== user.passwordConfirm) {
      alert('Hesla se neshodují.');
      return;
    }

    console.log(user);
    
    // Vyprázdnění formuláře po odeslání
    setUser({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    // Zobrazení alertu po odeslání formuláře
    alert('Formulář byl odeslán.');
  };

  return (
    //Element formuláře, který se odesílá pomocí handleSubmit funkce při submit události
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={user.passwordConfirm}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit"><strong>Register</strong></button>
    </form>
  );
};

export default Registration;
