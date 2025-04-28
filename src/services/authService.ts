// src/services/authService.ts
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const authService = {
  // تسجيل مستخدم جديد
  register: async (userData: Omit<User, 'id'>): Promise<User> => {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some((u: User) => u.email === userData.email)) {
          throw new Error('Email already exists');
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          ...userData
        };
        
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });
  },

  // تسجيل الدخول
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User) => u.email === email && u.password === password);
        
        if (!user) {
          throw new Error('Invalid email or password');
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },

  // تسجيل الخروج
  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      resolve();
    });
  },

  // الحصول على المستخدم الحالي
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // التحقق من حالة المصادقة
  isAuthenticated: (): boolean => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // التحقق من صحة كلمة المرور
  validatePassword: (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber;
  },

  // استعادة كلمة المرور
  forgotPassword: async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User) => u.email === email);
        
        if (!user) {
          throw new Error('Email not found');
        }
        
        // في تطبيق حقيقي، هنا نرسل رسالة إعادة تعيين إلى البريد الإلكتروني
        console.log('Password reset link would be sent to:', email);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

//   //// src/services/authService.ts
// import axios from 'axios';

// const API_URL = 'https://your-api.com/api/auth'; // استعن بـ BASE URL للـ API الخاص بك

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export const authService = {
//   // تسجيل مستخدم جديد
//   register: async (userData: { name: string; email: string; password: string }): Promise<User> => {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data.user; // افترض أن الـ API يرجع بيانات المستخدم بدون كلمة المرور
//   },

//   // تسجيل الدخول
//   login: async (email: string, password: string): Promise<User> => {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data.user;
//   },

//   // تسجيل الخروج
//   logout: async (): Promise<void> => {
//     await axios.post(`${API_URL}/logout`);
//   },

//   // الحصول على المستخدم الحالي (من خلال التوكن)
//   getCurrentUser: async (): Promise<User | null> => {
//     try {
//       const response = await axios.get(`${API_URL}/me`);
//       return response.data.user;
//     } catch (error) {
//       return null;
//     }
//   },
// };