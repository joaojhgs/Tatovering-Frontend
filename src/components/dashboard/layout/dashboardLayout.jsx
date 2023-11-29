import React, { useContext, useState } from 'react';

import {
    ClockCircleOutlined,
    HighlightOutlined,
    HomeOutlined,
    ProfileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/rawLogo.png';
import { UserContext } from '../../../pages/dashboardPage';
import Usuario from '../../../utils/usuario';

export default function DashboardLayout({ children }) {
    const { token } = theme.useToken();

    const navigate = useNavigate();

    const user = useContext(UserContext);
    console.log('user', user);
    const isTatuador = !!user?.tatuador_id;

    const colorBase = '#131313';

    const tatuadorMenus = [
        {
            key: 'dashboard',
            icon: <HomeOutlined />,
            title: 'Dashboard',
            path: '',
        },
        {
            key: 'schedule',
            icon: <ClockCircleOutlined />,
            title: 'Agendamentos',
            path: 'schedule',
        },
        {
            key: 'tattoos',
            icon: <HighlightOutlined />,
            title: 'Tatuagens',
            path: 'tattoos',
        },
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            title: 'Perfil',
            path: 'profile',
        },
    ];

    const userMenus = [
        {
            key: 'dashboard',
            icon: <HomeOutlined />,
            title: 'Dashboard',
            path: '',
        },
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            title: 'Perfil',
            path: 'profile',
        },
    ];

    const currentMenu = isTatuador ? tatuadorMenus : userMenus;

    const [collapsed, setCollapsed] = useState(false);
    const [currentKey, setCurrentKey] = useState('dashboard');

    const renderSideBar = () => (
        <div
            style={{
                width: collapsed ? 48 : 240,
                height: '100%',
                background: colorBase,
                flexShrink: 0,
                transition: 'width .3s ease',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
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
                    className="hidden text-2xl font-bold italic sm:inline-block"
                >
                    Tatoovering
                </span>
            </div>
            <div className="flex w-full grow flex-col gap-2 px-4 text-gray-200">
                {currentMenu.map((opt) => (
                    <Link
                        to={`/dashboard/${opt.path}`}
                        onClick={() => setCurrentKey(opt.key)}
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
            {/* collapse button */}
            {/* <div className="bg-sla mt-auto h-[48px] w-full text-center text-white">
                {'>'}
            </div> */}
        </div>
    );

    const renderTopBar = () => (
        <div
            style={{
                height: 48,
                width: '100%',
                background: colorBase,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
            }}
        >
            <UserOutlined className="ml-auto text-white" />
            <span className="ml-2 capitalize text-white">{user?.nome}</span>
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
                width: '100vw',
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
                <div style={{ background: token.colorPrimaryBg, flexGrow: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
