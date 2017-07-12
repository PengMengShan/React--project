import React, {PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon, BackTop, Affix} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.less';
import UserInfo from './UserInfo/UserInfo';
const {Header, Content, Footer} = Layout;

const MainLayout = ({
    routes,
    params,
    account,
    children,
    handleClickLogOut
}) => {
    return (
        <Layout className={styles.layoutContainer}>
            <Affix offsetTop={0}>
                <Header className={styles.header}>
                    <div className={styles.mainContainer}>

                        <UserInfo account={account} handleClickLogOut={handleClickLogOut}/>
                        <Menu mode="horizontal" defaultSelectedKeys={['1']} className={styles.menu}>
                            <Menu.Item key="1">
                                <Link to="/posts">
                                    <Icon type="file-text" className={styles.icon}/><a className={styles.icon}>内容</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`/user/${account.user_id}`}>
                                    <Icon type="user" className={styles.icon}/><a className={styles.icon}>用户</a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
            </Affix>
            <Content className={styles.content}>
                <div className={styles.mainContainer}>
                    <div className={styles.mainContent}>
                        <Breadcrumb
                            routes={routes}
                            params={params}
                            itemRender={(route, params, routes, paths) => {
                                const last = routes.indexOf(route) === routes.length - 1;
                                return last
                                    ? <span>
                                        <Icon type={route.icon} className={styles.icon}/>{route.breadcrumbName}</span>
                                    : <Link to={paths.join('/')}>
                                        <Icon type={route.icon} className={styles.icon}/>{route.breadcrumbName}
                                    </Link>
                            }}
                            className={styles.breadcrumb}/>
                        {children}
                    </div>
                </div>
            </Content>
            <Footer className={styles.footer}>
              <b>彭蒙善出品</b>
            </Footer>
            <BackTop className={styles.backTop}/>
        </Layout>
    )
};

MainLayout.propTypes = {};

export default MainLayout;
