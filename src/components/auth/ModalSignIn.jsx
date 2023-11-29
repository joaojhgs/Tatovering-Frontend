import React from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal } from 'antd';

import useRequest from '../../hooks/useRequest';
import UsuarioController from '../../structures/controllers/UsuariosController';

export default function ModalSignIn({ onSignIn, onCancel, open }) {
    const [signIn, loading, hasError] = useRequest(UsuarioController.signIn);

    const onFinish = (values) => {
        signIn(values).then(onSignIn).catch(onCancel);
    };

    return (
        <Modal
            open={open}
            title="Login"
            closable={false}
            footer={null}
            destroyOnClose
        >
            <Form
                name="normal_login"
                className="login-form mt-8 space-y-6"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <input type="hidden" name="remember" value="true" />
                <div className="relative">
                    <label className="text-sm font-bold tracking-wide">
                        Email
                    </label>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            { type: 'email' },
                        ]}
                    >
                        <Input
                            type="email"
                            className="w-full border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="email@gmail.com"
                        />
                    </Form.Item>
                </div>
                <div className="mt-8 content-center">
                    <label className="text-sm font-bold tracking-wide">
                        Senha
                    </label>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            className="w-full content-center border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none"
                            placeholder="Password"
                        />
                    </Form.Item>
                </div>
                {hasError && (
                    <Alert
                        type="error"
                        showIcon
                        message="Ocorreu um problema, por favor tente novamente"
                    />
                )}

                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
                        className="focus:shadow-outline flex w-full cursor-pointer justify-center rounded-full p-4
                                font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none"
                    >
                        Entrar
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            if (!loading) {
                                onCancel();
                            }
                        }}
                        size="large"
                        className="focus:shadow-outline text-gray-900-100 flex w-full cursor-pointer justify-center rounded-full
                                p-4  font-semibold tracking-wide shadow-lg transition duration-300 ease-in focus:outline-none"
                    >
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
