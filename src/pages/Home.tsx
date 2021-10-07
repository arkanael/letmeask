import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App';
import { useContext } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss'

export function Home(){
    const history = useHistory();
    const { user, signInWitGoogle } = useContext(AuthContext);

    async function handleCreateRoom() {
        if (!user){
           await signInWitGoogle();
        }

        history.push('/rooms/new');

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form action="">
                        <input type="text" placeholder="Digite o código da sala"/>
                    </form>
                    <Button type="submit" className="button">Entrar na sala</Button>
                </div>
            </main>
        </div>
    )
}