
// Simular armazenamento de usuários (em uma aplicação real, isso seria feito em um banco de dados)
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

let users: User[] = [];
let currentUser: User | null = null;

// Carregar usuários do localStorage (se existirem)
const loadUsers = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
};

// Salvar usuários no localStorage
const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Salvar usuário atual no localStorage
const saveCurrentUser = () => {
  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('currentUser');
  }
};

// Carregar usuários ao inicializar
loadUsers();

// Função para registro de novo usuário
export const register = async (name: string, email: string, password: string): Promise<boolean> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Verificar se o e-mail já está em uso
  if (users.some(user => user.email === email)) {
    return false;
  }
  
  // Criar novo usuário
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // Em uma aplicação real, a senha seria hash
  };
  
  users.push(newUser);
  saveUsers();
  
  return true;
};

// Função para login
export const login = async (email: string, password: string): Promise<boolean> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Verificar credenciais
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // Excluir o campo password para armazenar apenas dados seguros
    const { password, ...safeUser } = user;
    currentUser = user;
    saveCurrentUser();
    return true;
  }
  
  return false;
};

// Função para logout
export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};

// Função para obter o usuário atual
export const getCurrentUser = (): Omit<User, 'password'> | null => {
  if (currentUser) {
    const { password, ...userWithoutPassword } = currentUser;
    return userWithoutPassword;
  }
  return null;
};
