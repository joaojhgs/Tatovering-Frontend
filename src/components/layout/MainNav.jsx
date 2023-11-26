import React from 'react';

import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

export default function MainNav() {
    const NavItems = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Tatuagens',
            href: '/pesquisa-tatuagens',
        },
    ];

    return (
        <div className="flex gap-6 md:gap-10">
            <Link to="/">
                <div className="hidden items-center space-x-2 md:flex">
                    <img
                        src="https://i.imgur.com/hzyA9mR.png"
                        alt="logo"
                        width={44}
                    />
                    <span
                        style={{ color: '#fff' }}
                        className="hidden font-bold sm:inline-block"
                    >
                        Tatoovering
                    </span>
                </div>
            </Link>
            {NavItems?.map(
                (item, index) =>
                    item.href && (
                        <Link
                            key={index}
                            to={item.href}
                            className="flex items-center font-sans font-bold text-slate-600 hover:text-slate-900 dark:text-slate-100"
                        >
                            {item.title}
                        </Link>
                    ),
            )}
            <Dropdown
                menu={{
                    items: NavItems?.map((item) => ({
                        key: item.href,
                        label: <Link to={item.href}>{item.title}</Link>,
                    })),
                }}
            >
                <div className="btn md:hidden">
                    <span className="font-bold">Menu</span>
                </div>
            </Dropdown>
        </div>
    );
}
