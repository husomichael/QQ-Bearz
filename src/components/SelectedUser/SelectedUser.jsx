import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function SelectedUser(){

  const dispatch = useDispatch();
  const params = useParams();
  // const selectedUser = useSelector((store) => store.selectedUser);
  const [useraccess, setUserAccess] = useState('');

  useEffect(() => {
    fetchSelectedUser();
  }, []);

  function fetchSelectedUser(){
    dispatch({
      type: 'FETCH_SELECTED_USER',
      payload: params.id
    })
  };

  return(
    <div>

    </div>
  )
};

export default SelectedUser;