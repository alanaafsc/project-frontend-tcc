'use client'

import {
    AppstoreOutlined,
    DesktopOutlined,
    SnippetsOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Overview', '1', <DesktopOutlined />),
    getItem('Projetos', 'sub2', <SnippetsOutlined />, [
        getItem('Atividades', '4'),
    ]),
    getItem('Cronograma', '5', <AppstoreOutlined />),
    getItem('Perfil', '6', <UserOutlined />),
    getItem('Sair', '7', <LogoutOutlined />),
];

export default function MenuLateral() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const handleItemClick = (key) => {
        if (key === '7') {
            handleLogout();
        } else {
            handleRouteClick(key);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userLoggedIn');
        router.push('/');
    };

    const handleRouteClick = (key) => {
        if (key === '1') {
            router.push('/overview');
        } else if (key === '4') {
            router.push('/activities');
        } else if (key === '5') {
            router.push('/cronograma');
        } else if (key === '6') {
            router.push('/perfil');
        }
    };

    return (
        <>
            <div
                style={{
                    width: 256,
                }}
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={({ key }) => {
                        handleItemClick(key);
                    }}
                />
            </div>
        </>
    );
};