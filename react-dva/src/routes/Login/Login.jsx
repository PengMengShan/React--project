import React from 'react';
import styles from './Login.css';
import {Link} from 'dva/router';
import {connect} from 'dva';
import LoginLayout from '../../components/LoginLayout/LoginLayout';
import {Form, Icon, Input, Button, Checkbox} from 'antd';


function Login({
    loading,
    dispatch,
    form:{
        getFieldDecorator,
        validateFields
    }
}) {
    function commit(data) {
        const {username, password} = data;
        dispatch({type: 'app/auth', payload: {username, password}});
    }


    function handleSubmit(e) {
        e.preventDefault();
        validateFields((error, values) => {
            if (!error) {
                commit(values);
            }
        });
    }

    return (
        <LoginLayout>
            <div className={styles.container}>
                <div className={styles.logo}>

                    <span>企业内部说说</span>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的用户名'
                                    }
                                ]
                            })(<Input addonBefore={<Icon type="user"/>} placeholder="用户名"/>)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的密码'
                                    }
                                ]
                            })(<Input addonBefore={<Icon type="lock"/>} type="password" placeholder="密码"/>)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Checkbox disabled>记住我</Checkbox>)
                        }
                        <span className={styles.toOther }>还没有账号? <Link to="/register"><b>现在注册</b></Link></span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.button}
                            loading={loading}
                        >
                           登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </LoginLayout>
    );
}

export default connect((state, ownProps) => {
    return {
        loading: state.loading.models.app,
    };
})(Form.create({})(Login));
