import React from 'react';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Teste() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <Button type="primary" onClick={() => navigate('/teste')}>
                    Click
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}
