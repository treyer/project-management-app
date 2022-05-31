import React from 'react';
import { Link } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled('div')({
  padding: 8,
  fontSize: 14,
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
        sx={{
          color: 'primary.contrastText',
        }}
      >
        {text}
      </Link>
    </Item>
  );
}

export default GitLink;
