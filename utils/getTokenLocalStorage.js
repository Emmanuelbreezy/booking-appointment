
export default  function verifyAuth(){
    const _token = localStorage.getItem('tokenID');
    const _userId = localStorage.getItem('uID');
    const checkAuth = _token && _userId ? true : false;

  return [_token,_userId,checkAuth];
 }