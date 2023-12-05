import React, { useContext, useState } from 'react';

import {
    ClockCircleOutlined,
    CloseOutlined,
    HighlightOutlined,
    HomeOutlined,
    MenuOutlined,
    ProfileOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Grid, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/rawLogo.png';
import { UserContext } from '../../../pages/dashboardPage';
import Usuario from '../../../utils/usuario';

const { useBreakpoint } = Grid;

export default function DashboardLayout({ children }) {
    const { token } = theme.useToken();

    const screens = useBreakpoint();

    const navigate = useNavigate();

    const user = useContext(UserContext);
    console.log('user', user);
    const isTatuador = !!user?.tatuador_id;
    const hasEstudios = !!user?.estudio_id;

    const colorBase = '#131313';

    const menus = [
        {
            key: 'dashboard',
            icon: <HomeOutlined />,
            title: 'Dashboard',
            path: '',
            active: true,
        },
        {
            key: 'schedule',
            icon: <ClockCircleOutlined />,
            title: 'Agendamentos',
            path: 'schedule',
            active: isTatuador,
        },
        {
            key: 'tattoos',
            icon: <HighlightOutlined />,
            title: 'Tatuagens',
            path: 'tattoos',
            active: isTatuador,
        },
        {
            key: 'studio',
            icon: <ShopOutlined />,
            title: 'Estúdio',
            path: 'studio',
            active: isTatuador && hasEstudios,
        },
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            title: 'Perfil',
            path: 'profile',
            active: true,
        },
    ];

    const [currentKey, setCurrentKey] = useState('dashboard');
    const [open, setIsOpen] = useState(false);

    const renderSideBar = () => (
        <div
            style={{
                width: screens.xs ? (open ? '100%' : 0) : 240,
                height: '100%',
                overflow: 'hidden',
                background: colorBase,
                flexShrink: 0,
                transition: 'width .3s ease',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10,
                position: screens.xs ? 'fixed' : undefined,
            }}
        >
            {screens.xs && (
                <div
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                    }}
                >
                    <Button
                        style={{ color: '#fff' }}
                        icon={<CloseOutlined />}
                        type="link"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
            )}
            <div
                style={{
                    width: '100%',
                    // height: 48,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 48,
                    marginBottom: 48,
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    width={90}
                    style={{ transform: 'translateY(-2px)' }}
                />
                <span
                    style={{ color: '#fff' }}
                    className="text-2xl font-bold italic"
                >
                    Tatoovering
                </span>
            </div>
            <div className="flex w-full grow flex-col gap-2 px-4 text-gray-200">
                {menus
                    .filter((opt) => opt.active)
                    .map((opt) => (
                        <Link
                            to={`/dashboard/${opt.path}`}
                            onClick={() => setCurrentKey(opt.key)}
                            key={opt.key}
                        >
                            <div
                                className={`flex h-10 w-full items-center gap-4 rounded p-6 text-base hover:bg-[#fff1]`}
                                style={{
                                    backgroundColor:
                                        currentKey === opt.key
                                            ? token.colorPrimary
                                            : undefined,
                                    transition: 'background-color .3s ease',
                                }}
                            >
                                {opt.icon}
                                <span>{opt.title}</span>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );

    const renderTopBar = () => (
        <div
            style={{
                height: 48,
                flexShrink: 0,
                width: '100%',
                background: colorBase,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                color: '#fff',
            }}
        >
            {screens.xs && (
                <Button
                    style={{ color: '#fff' }}
                    icon={<MenuOutlined />}
                    type="link"
                    onClick={() => setIsOpen(true)}
                />
            )}
            <UserOutlined className="ml-auto" />
            <span className="ml-2 capitalize">{user?.nome}</span>
            <Button
                type="primary"
                ghost
                className="ml-4"
                onClick={() => {
                    Usuario.doLogout();
                    navigate('/');
                }}
            >
                Sair
            </Button>
        </div>
    );

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
            }}
        >
            {renderSideBar()}
            <div
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {renderTopBar()}
                <div
                    style={{
                        background: token.colorPrimaryBg,
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
