import {ResizableColumnsPanelType, ResizableRowsPanelType} from './types';

export const AllColumnsArgs: ResizableColumnsPanelType = {
  left: <div style={{height: '100%', color: '#fff'}}>Left Panel</div>,
  middle: <div style={{background: '#FCD116', height: '100%'}}>Middle Panel</div>,
  right: <div style={{background: '#CE1126', height: '100%'}}>Right Panel</div>,
  defaultSizes: [350, 350, 800],
  onDragEnd: sizes => {
    console.log('Sizes:', sizes);
  },
};

export const WithoutLeftColumnArgs: ResizableColumnsPanelType = {
  middle: <div style={{background: '#FCD116', height: '100%'}}>Middle Panel</div>,
  right: <div style={{background: '#CE1126', height: '100%'}}>Right Panel</div>,
  defaultSizes: [700, 800],
};

export const ClosableLeftColumnArgs: ResizableColumnsPanelType = {
  left: <div style={{height: '100%', color: '#fff', padding: 15}}>Left Panel</div>,
  middle: <div style={{background: '#FCD116', height: '100%', padding: 15}}>Middle Panel</div>,
  right: <div style={{background: '#CE1126', height: '100%', padding: 15}}>Right Panel</div>,
  defaultSizes: [500, 400, 600],
  leftClosable: true,
  leftPaneTooltipTitle: 'Close Left Panel',
};

export const AllRowsArgs: ResizableRowsPanelType = {
  top: <div style={{background: '#0057B7', height: '100%', color: '#fff'}}>Top Panel</div>,
  bottom: <div style={{background: '#FFDD00', height: '100%'}}>Bottom Panel</div>,
  defaultSizes: [400, 200],
  onDragEnd: sizes => {
    console.log('Vertical sizes:', sizes);
  },
};

export const WithoutBottomRowArgs: ResizableRowsPanelType = {
  top: <div style={{background: '#0057B7', height: '100%', color: '#fff'}}>Top Panel</div>,
  defaultSizes: [600],
};
