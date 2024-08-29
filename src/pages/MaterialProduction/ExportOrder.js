import { generateMaterial } from "@/action/MaterialProductionAction";
import { fontFamily } from "@/utils/commonUtils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ExportOrder({ handleBack, handleNext }) {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const { achievements, materialType } = useSelector(state => state.MaterialProduction)
  useEffect(() => {
    const uniqueItems = [...new Set(achievements.map(item => item.type))]
    setItems(uniqueItems)
  }, [])
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <Droppable droppableId="list" key={'list'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                return (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        key={item}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '10px 16px',
                          margin: '0 0 8px 0',
                          backgroundColor: 'rgb(56 58 156)',
                          fontFamily: fontFamily,
                          borderRadius: '12px',
                          maxWidth: '300px',
                          color: '#fff',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item}
                      </Box>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(generateMaterial(items, achievements, materialType))
            handleNext()
          }}
          sx={{
            textTransform: 'none',
            borderRadius: '10px',
            padding: '8px 20px',
          }}
        >
          Finish
        </Button>
        <Button
          onClick={handleBack}
          sx={{
            ml: '16px',
            textTransform: 'none',
            borderRadius: '10px',
            padding: '8px 20px',
          }}
        >
          Back
        </Button>
      </Box>
    </DragDropContext>
  )
}