import {
    Pagination,
    PaginationItem
  } from "@mui/material";
  
  function defaultColorFunc(item) {
    if (item.selected && item.type === 'page') {
      return '#F4F5F7';
    } else if (item.type === 'previous' || item.type === 'next') {
      if (item.disabled) {
        return '#DFE4E8';
      } else {
        return '#113D95';
      }
    } else {
      return '#596A7C';
    }
  }
  
  function defaultBgColorFunc(item) {
    if (item.selected && item.type === 'page') {
      return '#113D95';
    }
    return 'transparent';
  }
  
  export function GlobalPagination(props) {
  
    const { sx, id, page, count, handlePageChange, colorFunc = defaultColorFunc, bgColorFunc = defaultBgColorFunc } = props;
  
    return (
      <Pagination
        sx={sx}
        id={id}
        count={count}
        shape='rounded'
        onChange={handlePageChange}
        page={page}
        variant='text'
        renderItem={item => {
          return (
            <PaginationItem
              {...item}
              disableRipple
              id={`${id}-${item.page}`}
              selected={false}
              sx={{
                margin: "0 0.6px",
                backgroundColor: bgColorFunc(item),
                color: colorFunc(item),
                fontWeight: item.type !== 'page' ? 'bold' : 'regular',
                '&.Mui-disabled': {
                  opacity: 1,
                },
                '&:hover': {
                  color: '#596A7C',
                },
              }}
            />
          );
        }
        }
      />
    );
  }
  