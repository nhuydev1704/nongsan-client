import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { alpha, styled as styledMui } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Search = styledMui('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.up('xs')]: {
        marginLeft: '10px',
    },
}));

export const SearchIconWrapper = styledMui('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styledMui(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const StyledTab = styled(Tab)`
    border-radius: 8px;
    margin: 0 6px;
    &:hover {
        opacity: 0.8;
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

export const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

export const StyledAppBar = styled(AppBar)`
    background: ${({ theme }) => theme.backgroundHeader} !important;
`;

export const StyledIconButton = styled.div`
    padding: 9px 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

export const StyledIconButtonAvatar = styled.div`
    padding: 8px 8px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
