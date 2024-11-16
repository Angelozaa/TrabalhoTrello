import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

function App() {
    const [isCadastro, setIsCadastro] = useState(false); // Estado para alternar entre Login e Cadastro

    const handleCadastroLinkClick = () => {
        setIsCadastro(true); // Quando o usuário clicar em "Não tem uma conta", irá para o cadastro
    };

    const handleLoginLinkClick = () => {
        setIsCadastro(false); // Volta para a tela de login
    };

    return (
        <div>
            <Navbar />
            {isCadastro ? (
                <Cadastro onLoginClick={handleLoginLinkClick} /> // Exibe Cadastro e passa a função para ir ao Login
            ) : (
                <Login onCadastroClick={handleCadastroLinkClick} /> // Exibe Login e passa a função para ir ao Cadastro
            )}
        </div>
    );
}

export default App;
