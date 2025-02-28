import React, { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import Label from '@/components/Label';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
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
    console.log('Submitting form...');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access);
        toast.success('Inicio de sesión exitoso');
      } else {
        const data = await response.json();
        console.log('Error data:', data);
        toast.error(`Error en el inicio de sesión: ${data.error || 'Credenciales incorrectas'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error en el inicio de sesión');
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Iniciar Sesión</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
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
          <Button type="submit">Iniciar Sesión</Button>
        </form>
      </section>
    </DefaultLayout>
  );
}
