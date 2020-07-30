import React, {useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';


export default function New({ history}){
    const [company, SetCompany] = useState('');
    const [techs, SetTechs] = useState('');
    const [price, SetPrice] = useState('');
    const [thumbnail, SetThumbnail] = useState(null);

    const preview = useMemo(()=> {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    
    async function enviandoSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

       await api.post('spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return(

        <form onSubmit={enviandoSubmit}>
            <label id="thumbnail"
             style={{backgroundImage: `url(${preview})`}}
             className={thumbnail ? 'has-thumbnail' : ''}
             >
                <input type="file"
                 onChange={event => SetThumbnail(event.target.files[0])} 
                 />
                <img src={camera} alt="Selecione a imagem" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
            id="company"
            placeholder="Sua Empresa"
            value={company}
            onChange={event => SetCompany(event.target.value)}
          />

          <label htmlFor="techs">Tecnologias *<span> Separados por virgula</span></label>
            <input 
            id="techs"
            placeholder="Quais Tecnologias usam?"
            value={techs}
            onChange={event => SetTechs(event.target.value)}
          />

          <label htmlFor="price">Preço * <span>Em branco para Gratuito</span></label>
            <input 
            id="price"
            placeholder="Valor cobrado por diária"
            value={price}
            onChange={event => SetPrice(event.target.value)}
          />
        <button className="btn" type="submit">Cadastrar</button>   
        </form>    
    )
}