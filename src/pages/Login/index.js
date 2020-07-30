import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }){
    //  FUNCTIONS
    const [email, setEmail] = useState('');

    async function enviandoSubmit(event){
                event.preventDefault();
            
                const response = await api.post('/sessions', {
                    email
                });
            
                const { _id } = response.data;
            
                localStorage.setItem('user', _id);
            
            history.push('/dashboard');
        }
  
    return(
        // VIEW
        //FRAGMENT
    <> 
        <p>Ofereça locais para estudo de programadores e diversas áreas do ramo de Exatas</p>

        <form onSubmit={enviandoSubmit}>
            <label htmlFor="email">E-MAIL</label>
            <input 
              type="email"
              id="email"
              placeholder="Informe o seu email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              />

            <button className="btn" type="submit">Entrar</button>
        </form>

    </>
    // END FRAGMENT

    )
}