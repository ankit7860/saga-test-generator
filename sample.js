// export default function* () {
//   yield put(actions.dispatchAction('params'))
//   var x= 5 ;
//   console.log('hii');
// }

// export const abc3 = function* root() {
//   yield take(actions.dispatchAction('params'))
//   var x= 5 ;
//   console.log('hii');
// }

// const abc4 = function* root() {
//   yield take(actions.dispatchAction('params'))
//   var x= 5 ;
//   console.log('hii');
// }

function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}