import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { searchProduct, updateIsSearch } from '../../redux/actions/productAction';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 10,
    width: '400px',
    borderRadius: '40px',
    color: 'white',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.85, 0.85, 0.85, 0),
        // vertical padding + font size from searchIcon
        marginLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '320px',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const SearchComponent = ({ title, isBack, isSearchOder, setSearch }) => {
    const { auth, payments, products } = useSelector((state) => state);
    const dispatch = useDispatch();
    const admin = auth.user.role === 'admin';
    const typingTimeoutRef = React.useRef(null);

    const handleSearchProduct = (e) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(async () => {
            if (!e.target.value) {
                dispatch(updateIsSearch(false));
            } else {
                dispatch(updateIsSearch(true));
            }
            dispatch(searchProduct(products.params + e.target.value));
        }, 120);
    };

    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-500 shadow-md w-full h-[4rem] flex items-center fixed z-10">
            {isBack ? (
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <IconButton onClick={() => navigate(-1)} aria-label="delete" size="large">
                            <ArrowBackIcon style={{ color: 'white' }} />
                        </IconButton>
                        <span className="text-2xl text-slate-100 ml-2">{title}</span>
                    </div>
                    {isSearchOder && (
                        <Search className="shadow-lg mr-[20rem]">
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Nhập để tìm kiếm"
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    )}
                </div>
            ) : (
                <>
                    {' '}
                    <Search className="shadow-lg">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={handleSearchProduct}
                            placeholder="Tìm kiếm sản phẩm"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {!admin && (
                        <Link to="/cart" className="ml-2">
                            <IconButton aria-label="cart">
                                <StyledBadge
                                    badgeContent={auth.cart.length === 0 ? '0' : auth.cart.length}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon style={{ color: 'white' }} fontSize="large" />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    )}
                    <Link to="/history" className="ml-2">
                        <IconButton aria-label="cart">
                            <StyledBadge
                                badgeContent={payments.payment.length === 0 ? '0' : payments.payment.length}
                                color="secondary"
                            >
                                <AccountBalanceWalletIcon style={{ color: 'white' }} fontSize="large" />
                            </StyledBadge>
                        </IconButton>
                    </Link>
                </>
            )}
        </div>
    );
};

export default SearchComponent;
