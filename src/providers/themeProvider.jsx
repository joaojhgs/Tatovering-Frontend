import React from 'react';

import { ConfigProvider, theme } from 'antd';

export function ThemeProvider({ children, locale }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#3202d2',
                    colorInfo: '#3202d2',
                },
                algorithm: theme.defaultAlgorithm,
            }}
        >
            <div className="dark" style={{ colorScheme: 'dark' }}>
                {children}
            </div>
        </ConfigProvider>
    );
}
