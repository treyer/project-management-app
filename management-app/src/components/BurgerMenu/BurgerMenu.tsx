import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { experimentalStyled as styled } from '@mui/material/styles';
import MenuModal from '../MenuModal/MenuModal';
import BackLayer from '../BackLayer/BackLayer';
import { MenuModalType } from '../../types';

const Icon = styled(MenuIcon)({
  position: 'relative',
  color: '#ffffff',
  cursor: 'pointer',
  '&:hover': {
    color: '#cccccc',
  },
});

function BurgerMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Icon fontSize="large" onClick={handleIconClick} />
      <MenuModal
        display={isModalOpen}
        close={closeModal}
        type={MenuModalType.Menu}
      />
      <BackLayer display={isModalOpen} close={closeModal} />
    </>
  );
}

export default BurgerMenu;
