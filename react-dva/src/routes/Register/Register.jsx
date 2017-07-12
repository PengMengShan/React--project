import React from 'react';
import styles from './Register.css';
import {Link} from 'dva/router';
import LoginLayout from '../../components/LoginLayout/LoginLayout';
import {connect} from 'dva';
import {Form, Input, Button, Icon} from 'antd';


function Register({form, dispatch}) {
    let passwordDirty = false;
    const getFieldDecorator = form.getFieldDecorator;

    function handleSubmit(e) {
        e.preventDefault();
        form.validateFieldsAndScroll((error, {username, email, password}) => {
            if (!error) {
                dispatch({
                    type: 'app/register',
                    payload: {username, email, password}
                });
            }
        });
    }

    function handlePasswordBlue(e) {
        const value = e.target.value;
        passwordDirty = passwordDirty || !!value;
    }


    function checkPassword(rule, value, callback) {
        if (value && value !== form.getFieldValue('password')) {
            callback('密码不一致');
        } else {
            callback();
        }
    }

    function checkConfirm(rule, value, callback) {
        if (value && passwordDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 17}
    };

    const tailFormItemLayout = {
        wrapperCol: {
            span: 17,
            offset: 6,
        }
    };

    return (
        <LoginLayout>
            <div className={styles.container}>
                <div className={styles.logo}>欢迎注册</div>
                <Form horizontal onSubmit={handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的用户名'
                                    }
                                ],
                            })(<Input addonBefore={<Icon type="user"/>}/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '输入不是有效的电子邮件',
                                    },
                                    {
                                        required: true,
                                        message: '请输入你的电子邮箱',
                                    }
                                ],
                            })(<Input addonBefore={<Icon type="mail"/>}/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的密码',
                                    },
                                    {
                                        validator: checkConfirm,
                                    }
                                ],
                            })(<Input type="password" onBlur={handlePasswordBlue} addonBefore={<Icon type="lock"/>}/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认你的密码!',
                                }, {
                                    validator: checkPassword,
                                }],
                            })(<Input type="password" addonBefore={<Icon type="lock"/>}/>)
                        }
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">注册</Button>
                        <span className={styles.toOther}>有账户？<Link to="/login"><b>直接登入</b></Link></span>
                    </Form.Item>
                </Form>
            </div>
        </LoginLayout>
    );
}

export default connect(() => ({}))(Form.create()(Register));
