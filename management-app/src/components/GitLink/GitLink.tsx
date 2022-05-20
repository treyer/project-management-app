import React from 'react';
import { Link } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled('div')({
  color: '#ffffff',
  backgroundColor: '#026aa7',
  padding: 8,
});

type TGitLinkProps = {
  linkSrc: string;
  text: string;
};

function GitLink({ linkSrc, text }: TGitLinkProps) {
  return (
    <Item>
      <Link
        href={linkSrc}
        target="_blank"
        rel="noreferrer"
        style={{ color: '#ffffff' }}
      >
        {text}
      </Link>
    </Item>
  );
}

export default GitLink;
