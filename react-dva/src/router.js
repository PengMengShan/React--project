import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';
import App from './routes/app';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import PostsListPage from './routes/PostsListPage/PostsListPage';
import PostPage from "./routes/PostPage/PostPage";
import PostEditor from './routes/PostEditor/PostEditor';
import UserPage from './routes/UserPage/UserPage';

function RouterConfig({history, app}) {
    function requireAuth(nextState, replace, callback) {
        app._store.dispatch({
            type: 'app/enterAuth',
            payload: {},
            onComplete: callback
        });
    }

    function requirePostPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'post_detail/initializePostDetail',
            payload: {post_id: nextState.params.post_id},
            onComplete: callback
        });
    }


    function requireEditorPrepared(nextState, replace, callback) {
        const post_id = nextState.params.post_id;
        if (post_id) {
            app._store.dispatch({
                type: 'editor/initializeEditor',
                payload: {post_id},
                onComplete: callback
            });
        } else {
            app._store.dispatch({
                type: 'editor/initializeCreator',
                payload: {},
                onComplete: callback
            });
        }
    }

    function requireProfilePrepared(nextState, replace, callback) {
        const user_id = nextState.params.user_id;
        if (user_id) {
            app._store.dispatch({
                type: 'profile/initializeProfile',
                payload: {user_id},
                onComplete: callback
            });
        } else {
            replace('/posts');
            callback();
        }
    }

    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/" breadcrumbName="首页" icon="home" component={App} onEnter={requireAuth}>
                <IndexRedirect to="posts"/>
                <Route path="posts"
                       breadcrumbName="说说"
                       icon="file-text"
                       component={PostsListPage}/>
                <Route path="posts/:post_id"
                       breadcrumbName="内容"
                       icon="file-text"
                       onEnter={requirePostPrepared}
                       component={PostPage}/>
                <Route path="editor"
                       breadcrumbName="创建说说"
                       icon="plus-square-o"
                       component={PostEditor}
                       onEnter={requireEditorPrepared}/>
                <Route path="editor/:post_id"
                       breadcrumbName="编辑内容"
                       icon="edit"
                       component={PostEditor}
                       onEnter={requireEditorPrepared}/>
                <Route path="user/:user_id"
                       breadcrumbName="用户资料"
                       icon="solution"
                       onEnter={requireProfilePrepared}
                       component={UserPage}/>
            </Route>
            <Route path="*" breadcrumbName="Not Found" component={props => <h1>抱歉，没有找到</h1>}/>
        </Router>
    );
}

export default RouterConfig;
