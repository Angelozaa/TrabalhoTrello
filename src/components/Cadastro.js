import React, { useState } from 'react';

function Cadastro({ onLoginClick }) {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('usuario'); // 'usuario' ou 'admin'
    const [isActive, setIsActive] = useState(true); // true ou false
    const [error, setError] = useState(''); // Para exibir erros
    const [successMessage, setSuccessMessage] = useState(''); // Para exibir mensagem de sucesso

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa os erros
        setSuccessMessage(''); // Limpa a mensagem de sucesso

        // Criação do objeto com os dados do usuário
        const userData = {
            name: usuario,
            email: email,
            role: role,
            isActive: isActive,
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Usuário cadastrado com sucesso!');
                console.log('Resposta do servidor:', data);
            } else {
                setError('Erro ao cadastrar usuário.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setError('Erro ao cadastrar usuário, tente novamente mais tarde.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#1f1f1f',
            color: '#e0e0e0',
            fontFamily: `'Roboto', sans-serif`,
        },
        form: {
            background: '#2b2b2b',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            width: '90%',
            maxWidth: '400px',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.8em',
            color: '#ffffff',
        },
        inputGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '6px',
            fontSize: '0.9em',
            color: '#b3b3b3',
        },
        input: {
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '2px solid #333',
            background: '#1f1f1f', // Fundo escuro
            color: '#e0e0e0',
            fontSize: '1em',
            outline: 'none',
        },
        select: {
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '2px solid #333',
            background: '#1f1f1f', // Fundo escuro
            color: '#e0e0e0',
            fontSize: '1em',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3d85c6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1em',
            cursor: 'pointer',
        },
        cadastroLink: {
            display: 'block',
            textAlign: 'center',
            marginTop: '15px',
            color: '#b3b3b3',
            textDecoration: 'none',
        },
        error: {
            color: 'red',
            fontSize: '1em',
            textAlign: 'center',
            marginBottom: '15px',
        },
        success: {
            color: 'green',
            fontSize: '1.2em',
            textAlign: 'center',
            marginBottom: '15px',
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.header}>Cadastro</div>
                {error && <div style={styles.error}>{error}</div>}
                {successMessage && <div style={styles.success}>{successMessage}</div>}
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="usuario">Usuário:</label>
                    <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={styles.select}
                    >
                        <option value="usuario">Usuário</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="isActive">Status de Ativação:</label>
                    <select
                        id="isActive"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value === 'true')}
                        style={styles.select}
                    >
                        <option value="true">Ativo</option>
                        <option value="false">Desativado</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Cadastrar</button>
                <p style={styles.cadastroLink} onClick={onLoginClick}>Já tem uma conta? Faça login</p>
            </form>
        </div>
    );
}

export default Cadastro;
