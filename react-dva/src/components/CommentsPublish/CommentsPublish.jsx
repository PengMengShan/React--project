import React, {PropTypes} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import styles from './CommentsPublish.css';

function CommentsPublish({
    loading,
    form:{
        getFieldDecorator,
        validateFieldsAndScroll,
        resetFields
    },
    commit
}) {

    const formProps = {
        onSubmit: handlePublish,
        className: styles.form
    };
    const buttonProps = {
        loading,
        type: 'primary',
        size: 'large',
        icon: 'plus-square-o',
        className: styles.button,
        htmlType: 'submit'
    };

    function handlePublish(e) {
        e.preventDefault();
        validateFieldsAndScroll((error, {commentInput}) => {
            if (!error) {
                resetFields();
                commit({commentInput});
            }
        });
    }

    return (
        <Form {...formProps}>
            <Form.Item>
                {
                    getFieldDecorator('commentInput', {
                        rules: [
                            {
                                required: true,
                                message: '请输入您的评论...'
                            }
                        ]
                    })(<Input type="textarea" placeholder="添加评论..." rows={3}/>)
                }
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={4} offset={20}>
                        <Button {...buttonProps}>提交</Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}

CommentsPublish.propTypes = {
    form: PropTypes.object.isRequired,
    commit: PropTypes.func.isRequired
};

export default Form.create({})(CommentsPublish);