import { makeStyles, fade } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
const drawerWidth = 0;

export default makeStyles((theme) => ({
	appBar: {
		boxShadow: 'none',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	title: {
		flexGrow: 1,
		alignItems: 'center',
		display: 'flex',
		textDecoration: 'none',
		fontFamily: `"Changa", sans-serif`,
	},
	image: {
		marginRight: '10px',
	},

	grow: {
		flexGrow: 1,
	},
	avatar: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '250px',
	},
	pageLinks: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		listStyle: 'none',
	},
	pageLink: {
		marginLeft: '20px',
		textDecoration: 'none',
		fontWeight: 'bold',
		transition: theme.transitions.create(['transform'], {
			duration: "1"
		}, {easing: 'easeOut'}),
		'&:hover': {
      opacity: 1,
			transform: 'translateY(-200%)',
      color: "#ed6c02"
		},
	},
}));
