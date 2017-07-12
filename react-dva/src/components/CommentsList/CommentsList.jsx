import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import {Table, Icon, Alert} from 'antd';
import Publish from '../CommentsPublish/CommentsPublish';
import styles from './CommentsList.css';
import moment from 'moment';
import CommentPanel from '../CommentPanel/CommentPanel';
const {Column} = Table;

function CommentsList({
    loading,
    commentsList,
    loadingPatch,
    onDelete,
    onPatch,
    onCreate,
    onChangeCommentVisibility,
    isSuper,
    currentAccountUserId
}) {
    const columnProps = {
        title: 'Comments',
        key: 'descendants',
        render: (text, record) => {
            const isSelf = currentAccountUserId === record.author.user_id;

            function handleDelete() {
                onDelete({comment_id: record.comment_id});
            }

            function handlePatch({editorContent, closeEditor}) {
                onPatch({
                    editorContent,
                    comment_id: record.comment_id,
                    closeEditor
                });
            }

            function handleChangeVisibility(checked) {
                onChangeCommentVisibility({visible: !record.visible, comment_id: record.comment_id});
            }

            return (
                <div>
                    <div className={styles.content}>
                        {
                            record.visible
                                ? record.content
                                : <div>
                                    <Alert type="warning"
                                           message={"这个注释被超级管理员隐藏了..." +
                                           " 只有作者和超级管理员才能看到它."
                                           } showIcon/>
                                    {
                                        isSelf || isSuper
                                            ? record.content
                                            : null
                                    }
                                </div>
                        }
                    </div>
                    <p className={styles.meta}>
                        来自用户<Link
                        to={`/user/${record.author.user_id}`}><em className={styles.toUser}>{record.author.username}</em></Link>, {moment(record.created_at).fromNow()}
                    </p>
                    <CommentPanel
                        isSelf={isSelf}
                        isSuper={isSuper}
                        visible={record.visible}
                        commit={handlePatch}
                        initialValue={record.content}
                        onDelete={handleDelete}
                        onChangeVisibility={handleChangeVisibility}
                        patchLoading={loadingPatch}
                    />
                </div>
            );
        }
    };

    return (
        <div>
            <Table
                loading={loading}
                rowKey="comment_id"
                size="small"
                showHeader={false}
                dataSource={commentsList}
                title={() => <h2><Icon type="message" className={styles.icon}/>评论({commentsList.length})</h2>}
            >
                <Column {...columnProps}/>
            </Table>
            <Publish
                loading={loading}
                commit={onCreate}
            />
        </div>
    );
}

CommentsList.propTypes = {
    commentsList: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPatch: PropTypes.func.isRequired,
    onChangeCommentVisibility: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    isSuper: PropTypes.bool.isRequired,
    currentAccountUserId: PropTypes.string.isRequired

};

export default CommentsList;