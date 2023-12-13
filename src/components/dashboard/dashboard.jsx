import React from 'react';

import { Button, Card, Col, Row } from 'antd';

import PageLayout from './layout/pageLayout';

export default function Dashboard() {
    return (
        <PageLayout
            title="Dashboard"
            subtitle="A análise completa do seu negócio"
            extra={<Button type="primary">Extra</Button>}
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card>Dashboard</Card>
                </Col>
                <Col span={12}>
                    <Card>Dashboard</Card>
                </Col>
                <Col span={12}>
                    <Card>Dashboard</Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
