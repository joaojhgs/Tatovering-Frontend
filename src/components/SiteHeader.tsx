'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from 'antd/lib';
import { jwtDecode } from 'jwt-decode';

import { useRequest } from '@/hooks/useRequest';
import UsuarioController from '@/structures/controllers/UsuariosController';
import Usuario from '@/utils/usuario';

import Icons from './Icons';
import LocaleSwitcher from './LocaleSwitcher';
import { MainNav } from './MainNav';
import ThemeToggle from './ThemeToggle';

export function SiteHeader() {
  const loggedUser = Usuario.getUsuario();
  const router = useRouter();

  const [getUser] = useRequest(UsuarioController.getUserById);

  useEffect(() => {
    console.log('AQUI');
    console.log(loggedUser);
    if (loggedUser) {
      getUser({ id: loggedUser.sub }).then((user) => {
        console.log('USER:', user);
        if (user) {
          router.refresh();
        } else {
          router.push('cadastro-usuario');
        }
      });
    }
  }, [router]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-[black]">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href="https://github.com/hongfaqiu/nextjs13-with-antd-tailwindcss"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              <Icons.Github className="h-5 w-5" />
            </Link>
            <LocaleSwitcher />
            <ThemeToggle /> */}
            {loggedUser ? (
              <Button
                type="primary"
                ghost
                className="mx-2"
                onClick={() => {
                  Usuario.doLogout();
                  router.refresh();
                }}
              >
                Sair
              </Button>
            ) : (
              <>
                <Link href="/auth/">
                  <Button type="primary" ghost className="mx-2">
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button type="primary" ghost className="mx-2">
                    Registrar
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
