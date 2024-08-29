import { Stack, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import MenuGroup from "./MenuGroup";
export default function Menu(){
    const menus = [
        {
            id: 'users',
            title: '成员',
            type: 'group',
            svg: <PeopleAltOutlinedIcon sx={{width:'24px',height:'24px'}}/>,
            children:[
                {
                    id: 'users/students',
                    title: '学生',
                    type: 'item'
                },
                {
                    id: 'users/teachers',
                    title: '教师',
                    type: 'item'
                }
            ]
        },
        {
            id: 'achievements',
            title: '成果',
            type: 'group',
            svg: <EmojiEventsOutlinedIcon sx={{width:'24px',height:'24px'}}/>,
            children: [
                {
                    id: 'achievements/conference-papers',
                    title: '会议论文',
                    type: 'item',
                },
                {
                    id: 'achievements/journal-papers',
                    title: '期刊论文',
                    type: 'item',
                },
                {
                    id: 'achievements/software-copyrights',
                    title: '软件著作权',
                    type: 'item',
                },
                {
                    id: 'achievements/patents',
                    title: '专利',
                    type: 'item',
                },
                {
                    id: 'achievements/monographs',
                    title: '专著',
                    type: 'item',
                },
                {
                    id: 'achievements/awards',
                    title: '获奖',
                    type: 'item',
                }
            ]
        },
        {
            id: 'material-production',
            title: '材料制作',
            type: 'group',
            svg: <DesignServicesOutlinedIcon sx={{width:'24px',height:'24px'}}/>,
            children: [
                {
                    id: 'material-production/history',
                    title: '制作历史',
                    type:'item'
                },
                {
                    id: 'material-production/new',
                    title: '新建材料',
                    type:'item'
                }
            ]
        },
        {
            id: 'projects',
            title: '项目',
            type: 'empty-group',
            svg: <LibraryBooksOutlinedIcon sx={{width:'24px',height:'24px'}}/>
        },
        {
            id: 'scientific-research-problems',
            title: '科研问题',
            type: 'group',
            svg: <TipsAndUpdatesOutlinedIcon sx={{width:'24px',height:'24px'}}/>
        }
    ];
    return (
        <Stack component={'ul'} sx={{
            padding:'0 16px',
            gap:'8px'
        }}>
            {menus.map((menu)=>{
              switch(menu.type){
                case 'group':
                  return <MenuGroup key={menu.id} menu={menu}></MenuGroup>;
                case 'empty-group':
                    return <MenuGroup key={menu.id} menu={menu}></MenuGroup>;
                default :
                  return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                      Menu Items Error
                    </Typography>
                  );
              }
            })}
        </Stack>
    )
}

