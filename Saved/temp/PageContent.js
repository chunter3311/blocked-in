// import React from 'react';
// import { Route, withRouter } from 'react-router-dom';
// import styles from '../styles/global.module.css';
// import { useDispatch, useSelector, connect } from 'react-redux';
// import Packs from './Packs';
// import Main from './Main';
// // import Notebooks from './Notebooks';
// // import Notes from './Notes';
// // import About from './About';

// function LoggedInPageContent({ match }) {
//     // const user = useSelector(state => state.entities.users[state.session.user_id]);
//     return (
//         <div className={styles.full_width}>
//             {/* <h1>Main Content</h1> */}
//             {/* {user ? user.username : ""} */}
//             <Route path={match.url + "my-puzzles"} exact component={Packs} />
//             <Route path={match.url} exact component={Main} />
//             {/* <Route path={match.url + "notebooks"} exact component={Notebooks} />
//             <Route path={match.url + "notebooks/:notebookId"} exact component={Notes} />
//             <Route path={match.url + "about"} exact component={About} />
//             <Route path={match.url + "trash"} exact component={Notes} /> */}
//         </div>
//     );
// }
// export default withRouter(LoggedInPageContent);