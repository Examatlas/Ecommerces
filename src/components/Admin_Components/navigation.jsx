import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewIcon from '@mui/icons-material/GridView';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


import { ImBlog } from "react-icons/im";
import { IoNewspaperOutline } from "react-icons/io5";


const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'admin/dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
  
    {
      kind: 'divider',
    },
  


 // for category section 
 {
  segment: 'Master',
  title: 'Master',
  icon: < DashboardIcon />,
  children: [
    {
      segment: 'Subject',
      title: 'Subject',
      icon: <DescriptionIcon />,
    },
    {
      segment:'MasterCategory',
      title: 'Master Category',
      icon: <DescriptionIcon />,
      children:[
        {
          segment : 'Category',
          title : 'Category',
          icon : <DescriptionIcon/>
        },
        {
          segment : 'Sub-Category',
          title : 'Sub Category',
          icon: <DescriptionIcon/>
        }
      ]
    }
  ],
},




  
  // content section
  {
      segment: 'admin',
      title: 'Contents',
      icon: <GridViewIcon/>,
      children: [
       
        {
          segment: 'blog',
          title: 'Blog',
          icon: <ImBlog />,
        },
      
      ]
  },




 // for category section 
 {
  segment: 'admin',
  title: 'ECommerce',
  icon: < DashboardIcon />,
  children: [
    // {
    //   segment: 'EBooks',
    //   title: 'EBooks',
    //   icon: <DescriptionIcon />,
    // },
    {
      segment: 'book',
      title: 'Books',
      icon: <DescriptionIcon />,
    },
  
  ],
},

  
 
  ];

  export default NAVIGATION