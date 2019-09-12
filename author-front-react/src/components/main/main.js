import React, {useEffect} from 'react';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  InputAdornment,
  makeStyles,
  useTheme
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';
import Publication from "../common/publication";
import Pagination from "../common/pagination";
import Loading from "../common/loading";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerToolbar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '90%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
    }
  },
}));

function MainComponent(props) {
  const { container, authors, publications, getAuthors, getPublications, lastEvaluated, loading } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    title: '',
    first: false,
    last: false,
    paginationStack: []
  });
  const [queryParams, setQueryParams] = React.useState({
    author: null,
    order: 'DESC',
    limit: 10,
    title: null,
    lastEvaluated: null
  });


  useEffect(() => {
    getAuthors();
    console.log('mount it!');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPublications(queryParams);
    console.log('list publications!');
    // eslint-disable-next-line
  }, [queryParams]);

  useEffect(() => {
    if (loading === false) {
      const pagination = [...values.paginationStack];
      let isLast = false;
      if (lastEvaluated && publications.length === 10) {
        pagination.push(lastEvaluated);
      } else {
        isLast = true;
      }
      setValues({
        ...values,
        paginationStack: pagination,
        first: !queryParams.lastEvaluated,
        last: isLast
      });
      console.log('listed publications!');
    }
    // eslint-disable-next-line
  }, [loading, publications, lastEvaluated]);


  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const handleChange = name => event => {
    if (name === 'title') {
      setValues({ ...values, title: event.target.value });
    } else {
      resetStack();
      setQueryParams({
        ...queryParams,
        order: event.target.value,
        lastEvaluated: null
      })
    }
  };


  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      resetStack();
      setQueryParams({
        ...queryParams,
        title: values.title && values.title.length ? values.title : null,
        lastEvaluated: null
      })
    }
  }

  function goBack() {
    const pagination = [...values.paginationStack];
    pagination.pop();
    setValues({
      ...values,
      paginationStack: pagination
    });
    setQueryParams({
      ...queryParams,
      lastEvaluated: pagination[pagination.length - 1]
    })
  }

  function goForward() {
    const pagination = [...values.paginationStack];
    const next = pagination[pagination.length - 1];
    setQueryParams({
      ...queryParams,
      lastEvaluated: next && JSON.stringify(next)
    })
  }

  function resetStack() {
    setValues({
      ...values,
      paginationStack: []
    });
  }

  function selectAuthor(author) {
    setValues({
      ...values,
      title: '',
      paginationStack: []
    });
    setQueryParams({
      ...queryParams,
      author,
      title: null,
      order: 'DESC',
      lastEvaluated: null
    });

  }

  const drawer = (
    <div>
      <Toolbar className={classes.drawerToolbar}>
        <Typography variant="h6" noWrap>
          Authors
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button key="All">
          <ListItemText primary="All" onClick={() => selectAuthor(null)} />
        </ListItem>
        {authors.map((author) => (
          <ListItem button key={author.id}>
            <ListItemText primary={author.fullname} onClick={() => selectAuthor(author.id)} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <PersonIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Authors demo
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="authors list">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant={'h4'}>
          Publications
        </Typography>
        <form noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <TextField
              id="title"
              placeholder="Search by title..."
              value={values.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                      <SearchIcon />
                  </InputAdornment>
                )
              }}
              helperText="Press enter to search"
              onChange={handleChange('title')}
              onKeyDown={handleKeyPress}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="order"
              select
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <CalendarIcon />
                  </InputAdornment>
                )
              }}
              value={queryParams.order}
              onChange={handleChange('order')}
              margin="normal"
            >
              <MenuItem value="DESC">Latest first</MenuItem>
              <MenuItem value="ASC">Oldest first</MenuItem>
            </TextField>
          </FormControl>
        </form>
        {
          loading ?
            <Loading/> :
            <List>
              {
                publications.map((publication) =>
                  <Publication key={publication.id} publication={publication} author={publication.author}/>
                )
              }
            </List>
        }
        <Pagination theme={theme}
                    last={values.last}
                    first={values.first}
                    goBack={goBack}
                    goForward={goForward}
        />
      </main>
    </div>
  );
}

export default MainComponent;
