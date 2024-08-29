import { Box, Typography } from "@mui/material";
import { ReactComponent as Achievement } from '@/assets/Achievement.svg'
import { ReactComponent as Member } from '@/assets/Member.svg';
import { ReactComponent as Project } from '@/assets/Project.svg';
import { ReactComponent as Idea} from '@/assets/Idea.svg'
import MenuGroup from "./MenuGroup";
export default function Menu(){
    const menus = [
        {
            id: 'user',
            title: '成员',
            type: 'group',
            svg: <Member/>,
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
            id: 'achievement',
            title: '成果',
            type: 'group',
            svg: <Achievement/>,
            children: [
                {
                    id: 'conference-paper',
                    title: '会议论文',
                    type: 'item',
                },
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
            id: 'project',
            title: '项目',
            type: 'group',
            svg: <Project/>
        },
        {
            id: 'scientific-research-problem',
            title: '科研问题',
            type: 'group',
            svg: <Idea/>
        }
    ];
    return (
        <Box>
            {menus.map((menu)=>{
              switch(menu.type){
                case 'group':
                  return <MenuGroup key={menu.id} menu={menu}></MenuGroup>;
                default :
                  return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                      Menu Items Error
                    </Typography>
                  );
              }
            })}
        </Box>
    )
}

