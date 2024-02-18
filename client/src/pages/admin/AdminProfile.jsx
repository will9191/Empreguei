import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
        <img crossOrigin="null" src={currentUser.picture}/>
      Nome: {currentUser.firstName}
      Email: {currentUser.email}
      
    </div>
  );
};

export default AdminProfile;
