import React, { useState } from 'react';

function Login({ onCadastroClick }) {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('usuario'); // 'usuario' ou 'admin'
    const [error, setError] = useState(''); // Para exibir erros
    const [successMessage, setSuccessMessage] = useState(''); // Para exibir mensagem de sucesso

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa os erros
        setSuccessMessage(''); // Limpa a mensagem de sucesso

        // Simulando a requisição de login para o backend
        try {
            const response = await fetch('http://localhost:3000/users'); // Alterar a URL para o endpoint correto
            const users = await response.json();

            // Encontrando o usuário com o nome e o email fornecidos
            const user = users.find(u => u.name === usuario && u.email === email);

            if (!user) {
                setError('Usuário ou email não encontrado');
                return;
            }

            if (user.role !== role) { // Verifica se o role é válido
                setError('Role inválido');
                return;
            }

            // Se chegou aqui, o login é bem-sucedido
            setSuccessMessage('Login realizado com sucesso!');
            console.log('Login bem-sucedido');
            // Pode redirecionar para o próximo passo, como o painel de controle

        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError('Erro ao fazer login, tente novamente mais tarde.');
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
        inputFocus: {
            background: '#1f1f1f', // Garante que o fundo não mude ao focar
            border: '2px solid #3d85c6', // Cor do borda ao focar
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
        loginLink: {
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
                <div style={styles.header}>Login</div>
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
                        onFocus={(e) => e.target.style.background = '#1f1f1f'} // Garante que o fundo fique escuro no foco
                        onBlur={(e) => e.target.style.background = '#1f1f1f'} // Garante que o fundo fique escuro ao sair do foco
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
                        style={styles.input} // Fundo escuro para o campo de email também
                        onFocus={(e) => e.target.style.background = '#1f1f1f'}
                        onBlur={(e) => e.target.style.background = '#1f1f1f'}
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
                <button type="submit" style={styles.button}>Entrar</button>
                <p style={styles.loginLink} onClick={onCadastroClick}>Não tem uma conta? Cadastre-se</p>
            </form>
        </div>
    );
}

export default Login;
