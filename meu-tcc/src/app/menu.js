'use client'

import PageLayout from './pageLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  DesktopOutlined,
  SnippetsOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation'


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
        getItem('Projetos', '2'),
        getItem('Fases', '3'),
        getItem('Atividades', '4'),
    ]),
    getItem('Cronograma', '5', <AppstoreOutlined />),
    getItem('Perfil', '6', <UserOutlined />),
  ];

export default function MenuLateral() { 
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const handleItemClick = (route) => {
        router.push(route);
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
                if (key === '1') {
                    handleItemClick('/overview'); // Rota para o Overview
                } else if (key === '2') {
                    handleItemClick('/projects'); // Rota para as Projetos
                } else if (key === '3') {
                    handleItemClick('/stages'); // Rota para as Fases
                } else if (key === '4') {
                    handleItemClick('/activities'); // Rota para as Atividades
                }
            }}
        />
        </div>
    </>
    );
};