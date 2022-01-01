import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NearMeIcon from '@mui/icons-material/NearMe';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Switch } from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    SearchIconWrapper,
    Search,
    StyledAppBar,
    StyledIconButton,
    StyledInputBase,
    StyledLink,
    StyledTab,
    StyledIconButtonAvatar,
} from '../../static/styled/HeaderStyled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

export default function Header({ theme, themeToggler }) {
    const { pathname } = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [value, setValue] = React.useState('/');

    React.useEffect(() => {
        setValue(pathname);
    }, [pathname]);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleChange = (event) => {
        themeToggler();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={() => dispatch(logout())}>Đăng xuất</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="fixed">
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div">
                        MUI
                    </Typography>
                    <Search sx={{ display: { sm: 'none', md: 'block' } }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Tìm kiếm" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            visibility: { xs: 'hidden', sm: 'visible' },
                        }}
                    >
                        <Tabs
                            value={value}
                            indicatorColor={theme === 'dark' ? 'primary' : 'secondary'}
                            textColor="inherit"
                            onChange={handleChangeTab}
                            aria-label="icon tabs example"
                        >
                            <StyledTab value="/" icon={<HomeIcon />} aria-label="phone" />
                            <StyledTab value="/message" icon={<NearMeIcon />} aria-label="favorite" />
                            <StyledTab value="/discover" icon={<FavoriteIcon />} aria-label="person" />
                            <StyledTab value="/notify" icon={<ExploreIcon />} aria-label="person" />
                        </Tabs>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            color="inherit"
                        >
                            <StyledLink to={`/profile/${auth.user._id}`}>
                                <StyledIconButtonAvatar>
                                    <AccountCircle />
                                    <span style={{ fontSize: '1rem', padding: '0 10px 0 4px' }}>
                                        {auth.user.fullname.split(' ').reverse()[0].toUpperCase()}
                                    </span>
                                </StyledIconButtonAvatar>
                            </StyledLink>
                        </IconButton>
                        <IconButton style={{ padding: 0 }} size="large" aria-label="show 4 new mails" color="inherit">
                            <StyledIconButton>
                                <Badge badgeContent={4} color="error">
                                    <ChatIcon />
                                </Badge>
                            </StyledIconButton>
                        </IconButton>
                        <IconButton
                            style={{ padding: 0 }}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <StyledIconButton>
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </StyledIconButton>
                        </IconButton>
                        <IconButton
                            style={{ padding: 0 }}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                        >
                            <StyledIconButton>
                                <ArrowDropDownIcon />
                            </StyledIconButton>
                        </IconButton>
                        <IconButton
                            size="medium"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Switch
                                checked={theme === 'dark' ? true : false}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
