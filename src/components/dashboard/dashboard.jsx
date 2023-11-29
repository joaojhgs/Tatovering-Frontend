import React from 'react';

import { Button, Card } from 'antd';

import PageLayout from './layout/pageLayout';

export default function Dashboard() {
    return (
        <PageLayout
            title="Dashboard"
            subtitle="A análise completa do seu negócio"
            extra={<Button type="primary">Extra</Button>}
        >
            <Card>Dashboard</Card>
        </PageLayout>
    );
}
