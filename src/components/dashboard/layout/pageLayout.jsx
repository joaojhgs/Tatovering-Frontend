import React from 'react';

import { Card } from 'antd';

export default function PageLayout({ title, subtitle, extra, children }) {
    return (
        <div style={{ width: '100%' }}>
            <Card style={{ height: 118 }}>
                <div className="flex">
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
