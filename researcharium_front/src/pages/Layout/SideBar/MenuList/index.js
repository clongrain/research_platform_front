import { Box, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import MenuGroup from './MenuGroup'
const pages = [{
    id: 'achievements',
    title: '成果',
    type: 'group',
    icon: <EmojiEventsOutlinedIcon/>,
    children: [
        {
        // id: 'authentication',
        // title: 'Authentication',
        // type: 'collapse',
        // icon: icons.IconKey,
            id: 'conference-paper',
            title: '会议论文',
            type: 'item',
        },
        // children: [
        //   {
        //     id: 'login3',
        //     title: 'Login',
        //     type: 'item',
        //     url: '/pages/login/login3',
        //     target: true
        //   },
        //   {
        //     id: 'register3',
        //     title: 'Register',
        //     type: 'item',
        //     url: '/pages/register/register3',
        //     target: true
        //   }
        // ]
        // {
        //     id: 'authentication',
        //     title: '权限',
        //     type: 'collapse',
        //     children: [
        //         {
        //             id: 'login3',
        //             title: 'Login',
        //             type: 'item',
        //             url: '/pages/login/login3',
        //             target: true
        //         },
        //         {
        //             id: 'register3',
        //             title: 'Register',
        //             type: 'item',
        //             url: '/pages/register/register3',
        //             target: true
        //         }
        //     ]
        // },
        {
            id: 'journal-paper',
            title: '期刊论文',
            type: 'item',
        },
        {
            id: 'software-copyright',
            title: '软件著作权',
            type: 'item',
        },
        {
            id: 'patent',
            title: '专利',
            type: 'item',
        },
        {
            id: 'monograph',
            title: '专著',
            type: 'item',
        },
        {
            id: 'award',
            title: '获奖',
            type: 'item',
        }
    ]
},
{
    id: 'users',
    title: '成员',
    type: 'group',
    icon: <PeopleAltOutlinedIcon/>,
    children:[
        {
            id: 'student',
            title: '学生',
            type: 'item'
        },
        {
            id: 'teacher',
            title: '教师',
            type: 'item'
        }
    ]
},
{
    id: 'project',
    title: '项目',
    type: 'group',
    icon: <SourceOutlinedIcon/>
},
{
    id: 'scientific-research-problem',
    title: '科研问题',
    type: 'group',
    icon: <PsychologyAltOutlinedIcon/>
}
];

const MenuList = ()=>{

    const menu =  pages.map((menuGroup)=>{
        switch(menuGroup.type){
            case 'group':
                return <MenuGroup key={menuGroup.id} menuGroup={menuGroup}></MenuGroup>;
            default :
            return (
                <Typography key={menuGroup.id} variant="h6" color="error" align="center">
                  Menu Items Error
                </Typography>
              );
        }
    })
    return (
        <Box>{menu}</Box>
    )
}

export default MenuList