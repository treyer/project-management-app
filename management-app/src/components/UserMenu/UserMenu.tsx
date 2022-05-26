import React, { useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { experimentalStyled as styled } from '@mui/material/styles';
import MenuModal from '../MenuModal/MenuModal';
import BackLayer from '../BackLayer/BackLayer';
import { MenuModalType } from '../../types';

const Icon = styled(AccountCircleRoundedIcon)({
  position: 'relative',
  marginTop: '6px',
  cursor: 'pointer',
  '&:hover': {
    color: '#cccccc',
  },
});

function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Icon
        fontSize="large"
        onClick={handleIconClick}
        sx={{ color: 'primary.contrastText' }}
      />
      <MenuModal
        display={isModalOpen}
        close={closeModal}
        type={MenuModalType.User}
      />
      <BackLayer display={isModalOpen} close={closeModal} />
    </>
  );
}

export default UserMenu;
