import React, {PropTypes} from 'react';
import styles from './UserInfo.less';
import {Tooltip, Button} from 'antd';

const UserInfo = ({
    account,
    handleClickLogOut
}) => {
    const {ability, username} = account;
    const tooltipProps = {
        placement: 'bottom',
        title: ability === 'super' ? '超级用户' : '普通用户',
    };

    return (
        <div className={styles.user}>
            <Tooltip {...tooltipProps}>
                <span><a>你     好，</a>   <em className={styles.username}>用户 : {username} </em>
            </span>
            </Tooltip>
            <Button icon="logout" type="primary" onClick={handleClickLogOut}>注销</Button>
        </div>
    );
};

UserInfo.propTypes = {
    account: PropTypes.object.isRequired,
    handleClickLogOut: PropTypes.func.isRequired
};

export default UserInfo;