import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

const useStyles = makeStyles((theme: any) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '3em'
	},
	logo: {
		height: '7em'
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
	const [value, setValue] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChange = (e: any, value: number) => {
		setValue(value);
	}

	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
		setOpen(true);
	}

	const handleClose = (e: any) => {
		setAnchorEl(null);
		setOpen(false);
	}

	const handleMenuItemClick = (e: any, i: number) => {
		setAnchorEl(null);
		setOpen(false);
		setSelectedIndex(i);
	}

	const menuOptions = [
		{
			name: 'Services',
			link: '/services'
		},
		{
			name: 'Custom Software Development',
			link: '/customsoftware'
		},
		{
			name: 'Mobile App Development',
			link: '/mobileapps'
		},
		{
			name: 'Website Development',
			link: '/websites'
		}
	]

	useEffect(() => {
		switch (window.location.pathname) {
			case "/":
				if (value !== 0) {
					setValue(0);
				}
				break;
			case "/services":
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(0);
				}
				break;
			case "/customsoftware":
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(1);
				}
				break;
			case "/mobileapps":
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(2);
				}
				break;
			case "/websites":
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(3);
				}
				break;
			case "/revolution":
				if (value !== 2) {
					setValue(2);
				}
				break;
			case "/about":
				if (value !== 3) {
					setValue(3);
				}
				break;
			case "/contactus":
				if (value !== 4) {
					setValue(4);
				}
				break;
			case "/estimate":
				if (value !== 5) {
					setValue(5);
				}
				break;
			default:
				break;
		}
	}, [value])

	return (
		<Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary">
					<Toolbar disableGutters={true}>
						<Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
							<img src={logo} alt="company logo" className={classes.logo} />
						</Button>
						<Tabs
							value={value}
							className={classes.tabContainer}
							onChange={handleChange} indicatorColor="primary">
							<Tab
								className={classes.tab}
								label="Home"
								component={Link} to="/" />
							<Tab
								aria-owns={anchorEl ? "simple-menu" : undefined}
								aria-haspopup={anchorEl ? "true" : undefined}
								onMouseOver={(e: any) => handleClick(e)}
								className={classes.tab}
								label="Services"
								component={Link} to="/services" />
							<Tab
								className={classes.tab}
								label="The Revolution"
								component={Link} to="/revolution" />
							<Tab
								className={classes.tab}
								label="About Us"
								component={Link} to="/about" />
							<Tab
								className={classes.tab}
								label="Contact Us"
								component={Link} to="/contactus" />
						</Tabs>
						<Button variant="contained" color="secondary"
							className={classes.button}>
							Free Estimate
						</Button>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							classes={{ paper: classes.menu }}
							MenuListProps={{ onMouseLeave: handleClose }}
							elevation={0}>
							{menuOptions.map((option, index) => (
								<MenuItem
									key={option.name}
									onClick={(e: any) => { handleMenuItemClick(e, index); setValue(1); handleClose(e) }}
									selected={index === selectedIndex && value === 1}
									component={Link} to={option.link}
									classes={{ root: classes.menuItem }}>
									{option.name}
								</MenuItem>
							))}
						</Menu>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</Fragment>
	)
}

export default Header

