import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@heroui/react';
import { toast } from 'react-toastify';
import Label from '@/components/Label';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const navigate = useNavigate(); // 🔹 Hook de React Router
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access);
        toast.success('Inicio de sesión exitoso');
        navigate('/index'); // 🔹 Redirige al Dashboard
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Error en el inicio de sesión');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          <Button type="submit" className="w-full">Iniciar Sesión</Button>
        </form>
      </div>
    </section>
  );
}
