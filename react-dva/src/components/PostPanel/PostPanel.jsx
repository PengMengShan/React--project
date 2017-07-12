import React, {PropTypes} from 'react';
import {Button, Popconfirm, Switch} from 'antd';
import {Link} from 'dva/router';
import styles from './PostPanel.css';


function PostPanel({
    isSuper,
    isSelf,
    editPostId,
    onDelete,
    onChangeVisibility,
    visible
}) {

    function handleConfirm() {
        onDelete({toDeletePostId: editPostId});
    }

    function handleChange(checked) {
        onChangeVisibility(checked, {toSetVisiblePostId: editPostId, toSetVisibleValue: !visible});
    }

    return (<div className={styles.panel}>
        {
            isSuper
                ? <Switch checked={visible}
                          checkedChildren="visible"
                          unCheckedChildren="unvisible"
                          onChange={handleChange}
                          className={styles.switch}/>
                : null
        }
        {
            isSelf
                ? <div>
                    <Link to={`/editor/${editPostId}`}>
                        <Button size="small" type="ghost" icon="edit">
                          编辑
                        </Button>
                    </Link>
                    <Popconfirm
                        title="你确定要删除这个帖子吗？"
                        onText="确定"
                        cancelText="取消"
                        onConfirm={handleConfirm}
                    >
                        <Button size="small" type="ghost" icon="delete">
                            删除
                        </Button>
                    </Popconfirm>
                </div>
                : null
        }
    </div>);
}

PostPanel.propTypes = {
    isSuper: PropTypes.bool.isRequired,
    isSelf: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    editPostId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeVisibility: PropTypes.func.isRequired

};

export default PostPanel;