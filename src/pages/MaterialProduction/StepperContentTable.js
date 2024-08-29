import { StyledLink } from "@/components/ReturnLink"
import { BlockPaper } from "@/components/StyledPaper/BlockPaper"
import BlockTableBodyCell from "@/components/Table/StyledTableBodyCell/BlockTableBodyCell"
import BlockTableHeadCell from "@/components/Table/StyledTableHeadCell/BlockTableHeadCell"
import supabase from "@/config"
import { fontFamily } from "@/utils/commonUtils";
import storageUtils from "@/utils/storageUtils"
import { Box, Button, Checkbox, Stack, Table, TableBody, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CheckedBoxIcon, UnCheckedBoxIcon } from "@/components/Input/CheckBoxIcon"
import { useDispatch } from "react-redux"
import { generateMaterial, setMaterialAchievements, setMaterialOrder } from "@/action/MaterialProductionAction"

export default function StepperContentTable({ handleBack, handleNext }) {
  const [achievements, setAchievements] = useState([])
  const id = storageUtils.getUser().user_id
  const [selected, setSelected] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const fetchData = async () => {
    const newAchievements = []
    const conferencePaper = await supabase.from('user').select('conference_paper (*),user_conference_paper(participation_type)').eq('user_id', id)
    const journalPaper = await supabase.from('user').select('journal_paper (*),user_journal_paper(participation_type)').eq('user_id', id)
    const monograph = await supabase.from('user').select('monograph (*),user_monograph(participation_type)').eq('user_id', id)
    const award = await supabase.from('user').select('award (*),user_award(participation_type)').eq('user_id', id)
    const patent = await supabase.from('user').select('patent (*),user_patent(participation_type)').eq('user_id', id)
    const softwareCopyright = await supabase.from('user').select('software_copyright (*), user_software_copyright(participation_type)').eq('user_id', id)

    if (conferencePaper.data && conferencePaper.data.length > 0) {
      conferencePaper.data[0].conference_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '会议论文', 'role': conferencePaper.data[0].user_conference_paper[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (journalPaper.data && journalPaper.data.length > 0) {
      journalPaper.data[0].journal_paper.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '期刊论文', 'role': journalPaper.data[0].user_journal_paper[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (monograph.data && monograph.data.length > 0) {
      monograph.data[0].monograph.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专著', 'role': monograph.data[0].user_monograph[index].participation_type, 'finishTime': item.publication_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (award.data && award.data.length > 0) {
      award.data[0].award.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '获奖', 'role': award.data[0].user_award[index].participation_type, 'finishTime': item.presentation_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (patent.data && patent.data.length > 0) {
      patent.data[0].patent.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '专利', 'role': patent.data[0].user_patent[index].participation_type, 'finishTime': item.authorization_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    if (softwareCopyright.data && softwareCopyright.data.length > 0) {
      softwareCopyright.data[0].software_copyright.forEach((item, index) => {
        const achievement = { 'id': item.id, 'name': item.title, 'type': '软著', 'role': softwareCopyright.data[0].user_software_copyright[index].participation_type, 'finishTime': item.registration_date, 'index': index }
        newAchievements.push(achievement)
      })
    }
    setAchievements(newAchievements)
    const newSelected = []
    newAchievements && newAchievements.forEach(() => {
      newSelected.push(false)
    })
    setSelected(newSelected)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    fetchData()
  }, [])
  const handleChangeChecked = (pos, value) => {
    let flag = true
    setSelected(selected.map((item, index) => {
      if (pos === index) {
        if (!value) flag = false;
        return value
      }
      else {
        if (!item) flag = false
        return item
      }
    }))
    setSelectedAll(flag)
  }
  const handleChangeAllChecked = () => {
    setSelected(selected.map(() => { return !selectedAll }))
    setSelectedAll(!selectedAll)
  }
  return (
    <>
      <BlockPaper>
        <Box sx={{ overflowX: 'auto', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#f6f7fb'
              }}>
                <BlockTableHeadCell sx={{
                  padding: '0px 0px 0px 16px'
                }}>
                  <Checkbox checked={selectedAll} onChange={handleChangeAllChecked} icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />}></Checkbox>
                </BlockTableHeadCell>
                <BlockTableHeadCell>
                  名称
                </BlockTableHeadCell>
                <BlockTableHeadCell>
                  类型
                </BlockTableHeadCell>
                <BlockTableHeadCell>
                  获取时间
                </BlockTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {achievements &&
                achievements.map((achievement, index) => {
                  return (
                    <TableRow key={index} sx={{
                      backgroundColor: '#fff'
                    }}>
                      <BlockTableBodyCell>
                        <Checkbox checked={selected[index] || false} onChange={() => handleChangeChecked(index, !selected[index])} icon={<UnCheckedBoxIcon />} checkedIcon={<CheckedBoxIcon />}></Checkbox>
                      </BlockTableBodyCell>
                      <BlockTableBodyCell>
                        <Stack>
                          <StyledLink underline="hover">
                            {achievement.name}
                          </StyledLink>
                          <Typography sx={{
                            color: '#667085',
                            fontWeight: 400,
                            fontFamily: fontFamily,
                            fontSize: '0.8rem',
                            userSelect: 'none'
                          }}>{achievement.role}</Typography>
                        </Stack>
                      </BlockTableBodyCell>
                      <BlockTableBodyCell>
                        {achievement.type}
                      </BlockTableBodyCell>
                      <BlockTableBodyCell>
                        {achievement.finishTime}
                      </BlockTableBodyCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Box>
      </BlockPaper>
      <Box sx={{ mb: 2, mt: '24px' }}>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              const newAchievements = []
              achievements.forEach((item, index) => {
                if (selected[index]) {
                  newAchievements.push(item)
                }
              })
              dispatch(setMaterialAchievements(newAchievements))
              handleNext()
            }}
            sx={{
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
            }}
          >
            Continue
          </Button>
          <Button
            onClick={() => {
              dispatch(setMaterialAchievements([]))
              dispatch(setMaterialOrder([]))
              handleBack()
            }}
            sx={{
              ml: '16px',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
            }}
          >
            Back
          </Button>
        </div>
      </Box>
    </>

  )
}