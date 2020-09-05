export const gridWidth = 300;//window.innerWidth / 2;
export const gridHeight = 300;//window.innerHeight / 2 - 20;

export const cellWidth = 15;
export const cellHeight = 15;

export const gridCount = gridWidth/cellWidth;

export const headerHeight = 30;
export const headerPadding = 10;

export const cellTypes = {
    UNSELECTED: 'pf_cell_unselected',
    ORIGIN: 'pf_cell_origin',
    TARGET: 'pf_cell_target',
    PATH: 'pf_cell_path',
    ROAD: 'pf_cell_road',
    WALL: 'pf_cell_wall'
};

export const cellWeight = {
    NORMAL: 5,
    PATH: 1,
};
