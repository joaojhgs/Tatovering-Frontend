import React from 'react';

import { theme } from 'antd';

export default function Footer() {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                width: '100%',
                height: 100,
                background: '#131313',
                display: 'flex',
            }}
        >
            <span
                style={{
                    textAlign: 'center',
                    width: '100%',
                    marginTop: 'auto',
                    marginBottom: 24,
                }}
            >
                Todos os direitos reservados © <b>Tatovering</b> 2023
            </span>
        </div>
    );
}
