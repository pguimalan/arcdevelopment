import React, { Fragment, useEffect, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactElement;
}

interface IRoute {
	name: string;
	link: string;
	activeIndex: number;
	selectedIndex?: number;
	ariaOwns?: string;
	ariaPopup?: 'true';
	mouseOver?: any;
}

const useStyles = makeStyles((theme: any) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '3em',
		[theme.breakpoints.down("md")]: {
			marginBottom: '2em'
		},
		[theme.breakpoints.down("xs")]: {
			marginBottom: '1.25em'
		}
	},
	logo: {
		height: '8em',
		[theme.breakpoints.down("md")]: {
			height: '7em'
		},
		[theme.breakpoints.down("xs")]: {
			height: '5.5em'
		}
	},
	logoContainer: {
		padding: 0,
		'&:hover': {
			backgroundColor: 'transparent'
		},
	},
	tabContainer: {
		marginLeft: 'auto'
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px'
	},
	button: {
		...theme.typography.estimate,
		borderRadius: '50px',
		marginLeft: '50px',
		marginRight: '25px',
		height: '45px'
	},
	menu: {
		backgroundColor: theme.palette.common.blue,
		color: 'white',
		borderRadius: '0px'
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		'&:hover': {
			opacity: 1
		}
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent'
		},
	},
	drawerIcon: {
		height: '50px',
		width: '50px',
	},
	drawer: {
		backgroundColor: theme.palette.common.blue
	},
	drawerItem: {
		...theme.typography.tab,
		color: 'white',
		opacity: 0.7
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.orange
	},
	drawerItemSelected: {
		'&.MuiListItemText-root': {
			opacity: 1
		},		
	},
	appBar: {
		zIndex: theme.zIndex.modal + 1
	}
}));

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const Header = () => {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = window && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	const [openDrawer, setOpenDrawer] = useState(false);
	const [value, setValue] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChange = (e: any, newValue: number) => {
		setValue(newValue);
	}

	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
		setOpenMenu(true);
	}

	const handleClose = (e: any) => {
		setAnchorEl(null);
		setOpenMenu(false);
	}

	const handleMenuItemClick = (e: any, i: number) => {
		setAnchorEl(null);
		setOpenMenu(false);
		setSelectedIndex(i);
	}

	const menuOptions: IRoute[] = useMemo(() => [
		{
			name: 'Services',
			link: '/services',
			activeIndex: 1,
			selectedIndex: 0
		},
		{
			name: 'Custom Software Development',
			link: '/customsoftware',
			activeIndex: 1,
			selectedIndex: 1
		},
		{
			name: 'Mobile App Development',
			link: '/mobileapps',
			activeIndex: 1,
			selectedIndex: 2
		},
		{
			name: 'Website Development',
			link: '/websites',
			activeIndex: 1,
			selectedIndex: 3
		}
	], []);

	const routes: IRoute[] = useMemo(() => [
		{
			name: 'Home',
			link: '/',
			activeIndex: 0
		},
		{
			name: 'Services',
			link: '/services',
			activeIndex: 1,
			ariaOwns: anchorEl ? 'simple-menu' : undefined,
			ariaPopup: anchorEl ? 'true' : undefined,
			mouseOver: handleClick,
		},
		{
			name: 'The Revolution',
			link: '/revolution',
			activeIndex: 2
		},
		{
			name: 'About Us',
			link: '/about',
			activeIndex: 3
		},
		{
			name: 'Contact Us',
			link: '/contactus',
			activeIndex: 4
		}
	], [anchorEl]);

	useEffect(() => {
		[...menuOptions, ...routes].forEach((route: IRoute) => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (value !== route.activeIndex) {
						setValue(route.activeIndex);

						if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
							setSelectedIndex(route.selectedIndex);
						}
					}
					break;
				default: break;
			}
		})

	}, [value, menuOptions, selectedIndex, routes]);

	const drawer = (
		<Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}>
				<div className={classes.toolbarMargin} />
				<List
					disablePadding>
					{routes.map((route) => (
						<ListItem
							onClick={() => { setOpenDrawer(false); setValue(route.activeIndex); }}
							classes={{selected: classes.drawerItemSelected}}
							selected={value === route.activeIndex}
							divider
							button
							component={Link}
							to={route.link} key={`${route}${route.activeIndex}`}>
							<ListItemText
								className={classes.drawerItem}
								disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}

					<ListItem
						onClick={() => { setOpenDrawer(false); setValue(5); }}
						classes={{root: classes.drawerItemSelected, selected: classes.drawerItemSelected}}
						selected={value === 5}
						divider
						button
						className={classes.drawerItemEstimate}
						component={Link}
						to="/estimate">
						<ListItemText
							className={classes.drawerItem}
							disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple>
				<MenuIcon
					className={classes.drawerIcon} />
			</IconButton>
		</Fragment>
	);

	const tabs = (
		<Fragment>
			<Tabs
				value={value}
				className={classes.tabContainer}
				onChange={handleChange} indicatorColor="primary">
				{routes.map((route, index) => (
					<Tab
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
						aria-owns={route.ariaOwns}
						aria-haspopup={route.ariaPopup}
						onMouseOver={route.mouseOver}
						key={`${route}${index}`} />
				))}
			</Tabs>
			<Button variant="contained" color="secondary"
				className={classes.button}>
				Free Estimate
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				classes={{ paper: classes.menu }}
				MenuListProps={{ onMouseLeave: handleClose }}
				elevation={0}
				keepMounted
				style={{zIndex: 1302}}>
				{menuOptions.map((option, index) => (
					<MenuItem
						key={`${option}${index}`}
						onClick={(e: any) => { handleMenuItemClick(e, index); setValue(1); handleClose(e) }}
						selected={index === selectedIndex && value === 1}
						component={Link} to={option.link}
						classes={{ root: classes.menuItem }}>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</Fragment>
	);

	return (
		<Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary" className={classes.appBar}>
					<Toolbar disableGutters={true}>
						<Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
							<img src={logo} alt="company logo" className={classes.logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</Fragment>
	)
}

export default Header

