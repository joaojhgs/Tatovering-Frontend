import React from 'react';

import { Card, Image, theme } from 'antd';

export default function PageLayout({
    avatar,
    title,
    subtitle,
    extra,
    children,
}) {
    const { token } = theme.useToken();

    return (
        <div style={{ width: '100%' }}>
            <Card bodyStyle={{ height: 118 }}>
                <div
                    className="flex"
                    style={{ alignItems: avatar ? 'center' : undefined }}
                >
                    {avatar && (
                        <div
                            style={{
                                borderRadius: '50%',
                                background: '#ccc',
                                height: 56,
                                width: 56,
                                flexShrink: 0,
                                overflow: 'hidden',
                                marginRight: 12,
                            }}
                        >
                            <Image width={56} height={56} src={avatar} />
                        </div>
                    )}
                    <span className="font-bold text-xl">{title}</span>
                    <span className="opacity-60 text-base ml-3">
                        {subtitle}
                    </span>
                    <div className="ml-auto">{extra}</div>
                </div>
            </Card>
            <div style={{ width: '100%', padding: 24 }}>{children}</div>
        </div>
    );
}
